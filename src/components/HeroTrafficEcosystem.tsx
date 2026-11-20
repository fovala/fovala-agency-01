import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Lock, Sparkles, Star } from 'lucide-react';

interface HeroTrafficEcosystemProps {
  scrollProgress?: number;
}

type PlatformKey =
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'google'
  | 'youtube'
  | 'linkedin'
  | 'x';

interface PlatformNodeConfig {
  id: PlatformKey;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
  floatAmpX: number;
  floatAmpY: number;
  floatSpeed: number;
  floatPhase: number;
  accent: 'lavender' | 'blue' | 'violet';
  mobileVisible: boolean;
}

interface VisitorSlot {
  platformIdx: number;
  phase: number;
  speed: number;
  scale: number;
}

interface ArrivalPulse {
  active: boolean;
  x: number;
  y: number;
  progress: number;
  color: string;
}

interface DustMote {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  speed: number;
  phase: number;
  driftX: number;
  driftY: number;
}

const VIEW_W = 560;
const VIEW_H = 520;

// Laptop geometry in 560x520 stage coordinates (lower-center focal point)
// Screen lid: left 12% (67.2), top 41% (213.2), width 76% (425.6), height 45% (234)
const LAPTOP_X = 67.2;
const LAPTOP_Y = 213.2;
const LAPTOP_W = 425.6;
const LAPTOP_H = 234;
const ENTRY_Y = 215;

// Social & search platforms arranged strictly across the TOP canopy above the laptop
const PLATFORMS: PlatformNodeConfig[] = [
  {
    id: 'instagram',
    x: 62,
    y: 124,
    targetX: 118,
    targetY: ENTRY_Y,
    c1x: 78,
    c1y: 168,
    c2x: 114,
    c2y: 184,
    floatAmpX: 3.6,
    floatAmpY: 4.8,
    floatSpeed: 0.72,
    floatPhase: 0.2,
    accent: 'lavender',
    mobileVisible: true,
  },
  {
    id: 'facebook',
    x: 130,
    y: 68,
    targetX: 172,
    targetY: ENTRY_Y,
    c1x: 138,
    c1y: 126,
    c2x: 168,
    c2y: 162,
    floatAmpX: 4.0,
    floatAmpY: 4.4,
    floatSpeed: 0.65,
    floatPhase: 1.1,
    accent: 'violet',
    mobileVisible: true,
  },
  {
    id: 'tiktok',
    x: 206,
    y: 42,
    targetX: 226,
    targetY: ENTRY_Y,
    c1x: 206,
    c1y: 108,
    c2x: 228,
    c2y: 152,
    floatAmpX: 3.5,
    floatAmpY: 4.6,
    floatSpeed: 0.76,
    floatPhase: 2.0,
    accent: 'blue',
    mobileVisible: true,
  },
  {
    id: 'google',
    x: 280,
    y: 34,
    targetX: 280,
    targetY: ENTRY_Y,
    c1x: 266,
    c1y: 98,
    c2x: 294,
    c2y: 148,
    floatAmpX: 3.8,
    floatAmpY: 4.2,
    floatSpeed: 0.68,
    floatPhase: 2.9,
    accent: 'lavender',
    mobileVisible: true,
  },
  {
    id: 'youtube',
    x: 354,
    y: 42,
    targetX: 334,
    targetY: ENTRY_Y,
    c1x: 354,
    c1y: 108,
    c2x: 332,
    c2y: 152,
    floatAmpX: 3.5,
    floatAmpY: 4.6,
    floatSpeed: 0.71,
    floatPhase: 3.7,
    accent: 'violet',
    mobileVisible: true,
  },
  {
    id: 'linkedin',
    x: 430,
    y: 68,
    targetX: 388,
    targetY: ENTRY_Y,
    c1x: 422,
    c1y: 126,
    c2x: 392,
    c2y: 162,
    floatAmpX: 4.0,
    floatAmpY: 4.4,
    floatSpeed: 0.67,
    floatPhase: 4.5,
    accent: 'blue',
    mobileVisible: false,
  },
  {
    id: 'x',
    x: 498,
    y: 124,
    targetX: 442,
    targetY: ENTRY_Y,
    c1x: 482,
    c1y: 168,
    c2x: 446,
    c2y: 184,
    floatAmpX: 3.6,
    floatAmpY: 4.8,
    floatSpeed: 0.74,
    floatPhase: 5.3,
    accent: 'lavender',
    mobileVisible: false,
  },
];

const ACCENT_HEX: Record<PlatformNodeConfig['accent'], string> = {
  lavender: '#B9A6FF',
  blue: '#568DEB',
  violet: '#7554D9',
};

const CLEANING_SERVICES = [
  {
    title: 'Deep Home Clean',
    meta: 'From $149',
    image: '/assets/showcase/cleaning-hero.jpg',
  },
  {
    title: 'Kitchen Sanitizing',
    meta: 'From $89',
    image: '/assets/showcase/cleaning-kitchen.jpg',
  },
  {
    title: 'Office Care Plan',
    meta: 'Weekly',
    image: '/assets/showcase/cleaning-hero.jpg',
  },
];

function cubicPoint(
  t: number,
  p0x: number,
  p0y: number,
  c1x: number,
  c1y: number,
  c2x: number,
  c2y: number,
  p1x: number,
  p1y: number,
): { x: number; y: number } {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * p0x + 3 * uu * t * c1x + 3 * u * tt * c2x + ttt * p1x,
    y: uuu * p0y + 3 * uu * t * c1y + 3 * u * tt * c2y + ttt * p1y,
  };
}

function renderPlatformGlyph(id: PlatformKey) {
  switch (id) {
    case 'instagram':
      return (
        <g stroke="#E9E7FA" strokeWidth="1.65" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="-8" y="-8" width="16" height="16" rx="4.5" />
          <circle cx="0" cy="0" r="3.8" />
          <circle cx="4.4" cy="-4.4" r="0.9" fill="#B9A6FF" stroke="none" />
        </g>
      );
    case 'facebook':
      return (
        <path
          d="M2.5 -8H0.4C-2.1 -8 -3.5 -6.5 -3.5 -4V-1.6H-5.8V1.4H-3.5V8.6H-0.2V1.4H2.4L2.9 -1.6H-0.2V-3.7C-0.2 -4.5 0.3 -5.1 1.2 -5.1H2.7V-8H2.5Z"
          fill="#E9E7FA"
        />
      );
    case 'tiktok':
      return (
        <path
          d="M2.1 -8.4V2.6C2.1 5.1 0.1 7.1 -2.4 7.1C-4.8 7.1 -6.8 5.1 -6.8 2.6C-6.8 0.2 -4.8 -1.8 -2.4 -1.8C-1.8 -1.8 -1.3 -1.7 -0.8 -1.5V1.2C-1.2 1 -1.8 0.9 -2.3 0.9C-3.3 0.9 -4.2 1.7 -4.2 2.7C-4.2 3.7 -3.3 4.5 -2.3 4.5C-1.2 4.5 -0.4 3.7 -0.4 2.7V-8.4H2.1ZM2.1 -8.4C2.5 -5.8 4.4 -3.9 6.8 -3.6V-1C4.9 -1.1 3.3 -1.9 2.1 -3.1"
          fill="#E9E7FA"
        />
      );
    case 'youtube':
      return (
        <g>
          <rect
            x="-9"
            y="-6.2"
            width="18"
            height="12.4"
            rx="3.6"
            fill="none"
            stroke="#E9E7FA"
            strokeWidth="1.55"
          />
          <path d="M-2 -2.9L3.9 0L-2 2.9V-2.9Z" fill="#B9A6FF" />
        </g>
      );
    case 'linkedin':
      return (
        <g fill="#E9E7FA">
          <circle cx="-5.3" cy="-5.1" r="1.45" />
          <rect x="-6.6" y="-2.1" width="2.6" height="8.9" rx="0.7" />
          <path d="M-1.4 -2.1H1.1V-0.9C1.6 -1.7 2.7 -2.3 4 -2.3C6.1 -2.3 7.3 -0.9 7.3 1.6V6.8H4.7V2.1C4.7 0.8 4.1 0.1 3 0.1C1.8 0.1 1.2 0.8 1.2 2.1V6.8H-1.4V-2.1Z" />
        </g>
      );
    case 'google':
      return (
        <path
          d="M7.4 -1.1H0.2V1.7H4.4C4 3.7 2.3 4.9 0.1 4.9C-2.7 4.9 -4.9 2.7 -4.9 0C-4.9 -2.7 -2.7 -4.9 0.1 -4.9C1.5 -4.9 2.8 -4.4 3.7 -3.5L5.8 -5.6C4.3 -6.9 2.3 -7.8 0.1 -7.8C-4.2 -7.8 -7.8 -4.2 -7.8 0C-7.8 4.2 -4.2 7.8 0.1 7.8C4.5 7.8 7.7 4.6 7.7 0.2C7.7 -0.3 7.6 -0.7 7.4 -1.1Z"
          fill="#E9E7FA"
        />
      );
    case 'x':
      return (
        <path
          d="M-6.4 -6.8H-2.5L0.5 -2.4L4.2 -6.8H6.3L1.4 -1.2L6.8 6.8H2.9L-0.5 1.9L-4.7 6.8H-6.8L-1.4 0.7L-6.4 -6.8ZM-3.7 -5.3L3.2 5.3H4.4L-2.5 -5.3H-3.7Z"
          fill="#E9E7FA"
        />
      );
  }
}

export const HeroTrafficEcosystem: React.FC<HeroTrafficEcosystemProps> = ({
  scrollProgress = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltLayerRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<SVGGElement>(null);
  const parallaxMidRef = useRef<SVGGElement>(null);
  const laptopFloatRef = useRef<HTMLDivElement>(null);
  const laptopAuraRef = useRef<SVGRectElement>(null);

  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const basePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const glowPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const entryDotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const visitorRefs = useRef<(SVGGElement | null)[]>([]);
  const dustRefs = useRef<(SVGCircleElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const waveRefs = useRef<(SVGRectElement | null)[]>([]);

  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const [hoveredPlatform, setHoveredPlatform] = useState<PlatformKey | null>(null);
  const hoveredRef = useRef<PlatformKey | null>(null);
  hoveredRef.current = hoveredPlatform;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const visiblePlatforms = useMemo(
    () => (isMobile ? PLATFORMS.filter((p) => p.mobileVisible) : PLATFORMS),
    [isMobile],
  );

  const visitors = useMemo<VisitorSlot[]>(() => {
    const list: VisitorSlot[] = [];
    const perStream = isMobile ? 2 : 3;
    visiblePlatforms.forEach((_, pIdx) => {
      for (let j = 0; j < perStream; j++) {
        list.push({
          platformIdx: pIdx,
          phase: (j / perStream + ((pIdx * 0.19) % 1)) % 1,
          speed: 0.175 + ((pIdx + j) % 3) * 0.02,
          scale: 0.88 + ((pIdx + j) % 2) * 0.12,
        });
      }
    });
    return list;
  }, [visiblePlatforms, isMobile]);

  const dustMotes = useMemo<DustMote[]>(() => {
    const count = isMobile ? 10 : 18;
    return Array.from({ length: count }, (_, i) => ({
      x: 34 + ((i * 79) % (VIEW_W - 68)),
      y: 22 + ((i * 53) % 190), // Ambient particles focused in upper sky traffic zone
      r: 0.85 + (i % 3) * 0.4,
      baseOpacity: 0.14 + (i % 4) * 0.06,
      speed: 0.35 + (i % 5) * 0.1,
      phase: i * 0.9,
      driftX: 5 + (i % 4) * 2.2,
      driftY: 4 + (i % 3) * 2.5,
    }));
  }, [isMobile]);

  const arrivalPulsesRef = useRef<ArrivalPulse[]>(
    Array.from({ length: 8 }, () => ({
      active: false,
      x: VIEW_W / 2,
      y: ENTRY_Y,
      progress: 0,
      color: '#B9A6FF',
    })),
  );
  const siteWavesRef = useRef<{ active: boolean; progress: number }[]>(
    Array.from({ length: 3 }, () => ({ active: false, progress: 0 })),
  );
  const prevVisitorProgressRef = useRef<number[]>([]);

  useEffect(() => {
    prevVisitorProgressRef.current = visitors.map((v) => v.phase);
  }, [visitors]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pointer = { tx: 0, ty: 0, cx: 0, cy: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.tx = Math.max(-1.1, Math.min(1.1, nx));
      pointer.ty = Math.max(-1.1, Math.min(1.1, ny));
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let isVisible = true;
    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.04 },
    );
    if (containerRef.current) io.observe(containerRef.current);

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let nextPulseIdx = 0;
    let nextWaveIdx = 0;
    let siteEnergy = 0;

    const triggerArrival = (x: number, y: number, color: string) => {
      const pool = arrivalPulsesRef.current;
      pool[nextPulseIdx] = { active: true, x, y, progress: 0, color };
      nextPulseIdx = (nextPulseIdx + 1) % pool.length;

      siteEnergy = Math.min(1, siteEnergy + 0.32);

      const waves = siteWavesRef.current;
      if (!waves[nextWaveIdx].active || waves[nextWaveIdx].progress > 0.55) {
        waves[nextWaveIdx] = { active: true, progress: 0 };
        nextWaveIdx = (nextWaveIdx + 1) % waves.length;
      }
    };

    const renderFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!isVisible && elapsed > 0.1) {
        rafId = requestAnimationFrame(renderFrame);
        return;
      }

      if (!prefersReducedMotion) {
        elapsed += dt;
      }

      const damp = 1 - Math.exp(-5.2 * dt);
      pointer.cx += (pointer.tx - pointer.cx) * damp;
      pointer.cy += (pointer.ty - pointer.cy) * damp;

      const sp = scrollRef.current;
      const activeHover = hoveredRef.current;

      if (tiltLayerRef.current && !prefersReducedMotion) {
        const rx = pointer.cy * -4.2 + sp * 3.5;
        const ry = pointer.cx * 4.8;
        tiltLayerRef.current.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      }

      if (parallaxBgRef.current) {
        parallaxBgRef.current.setAttribute(
          'transform',
          `translate(${(-pointer.cx * 7).toFixed(2)} ${(-pointer.cy * 6).toFixed(2)})`,
        );
      }
      if (parallaxMidRef.current) {
        parallaxMidRef.current.setAttribute(
          'transform',
          `translate(${(pointer.cx * 3).toFixed(2)} ${(pointer.cy * 3).toFixed(2)})`,
        );
      }

      const laptopFloatY = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.85) * 3.0 - sp * 8;
      if (laptopFloatRef.current) {
        laptopFloatRef.current.style.transform = `translate3d(${(pointer.cx * 4).toFixed(1)}px, ${(laptopFloatY + pointer.cy * 3.5).toFixed(1)}px, 0)`;
      }

      siteEnergy = Math.max(0, siteEnergy - dt * 0.72);
      if (laptopAuraRef.current) {
        const op = 0.24 + siteEnergy * 0.35 + Math.sin(elapsed * 1.4) * 0.05;
        laptopAuraRef.current.setAttribute('opacity', op.toFixed(3));
      }

      const nodeOffsets: {
        sx: number;
        sy: number;
        tx: number;
        ty: number;
        c1x: number;
        c1y: number;
        c2x: number;
        c2y: number;
      }[] = [];

      for (let i = 0; i < visiblePlatforms.length; i++) {
        const p = visiblePlatforms[i];
        const fx = prefersReducedMotion
          ? 0
          : Math.sin(elapsed * p.floatSpeed + p.floatPhase) * p.floatAmpX;
        const fy = prefersReducedMotion
          ? 0
          : Math.cos(elapsed * (p.floatSpeed * 0.85) + p.floatPhase) * p.floatAmpY;

        const sx = p.x + fx;
        const sy = p.y + fy;
        const tx = p.targetX + pointer.cx * 2.5;
        const ty = p.targetY + laptopFloatY + pointer.cy * 2.5;
        const c1x = p.c1x + fx * 0.55;
        const c1y = p.c1y + fy * 0.55;
        const c2x = p.c2x;
        const c2y = p.c2y + laptopFloatY * 0.5;

        nodeOffsets.push({ sx, sy, tx, ty, c1x, c1y, c2x, c2y });

        const nodeEl = nodeRefs.current[i];
        if (nodeEl) {
          nodeEl.setAttribute('transform', `translate(${sx.toFixed(2)} ${sy.toFixed(2)})`);
        }

        const d = `M ${sx.toFixed(2)} ${sy.toFixed(2)} C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${tx.toFixed(2)} ${ty.toFixed(2)}`;
        const basePath = basePathRefs.current[i];
        const glowPath = glowPathRefs.current[i];
        const isHot = activeHover === p.id;

        if (basePath) {
          basePath.setAttribute('d', d);
          basePath.setAttribute('stroke-opacity', isHot ? '0.45' : '0.2');
        }
        if (glowPath) {
          glowPath.setAttribute('d', d);
          glowPath.setAttribute('stroke-dashoffset', (-elapsed * (isHot ? 64 : 38)).toFixed(2));
          glowPath.setAttribute('stroke-opacity', isHot ? '0.92' : '0.56');
        }

        const entryDot = entryDotRefs.current[i];
        if (entryDot) {
          entryDot.setAttribute('cx', tx.toFixed(2));
          entryDot.setAttribute('cy', ty.toFixed(2));
        }
      }

      for (let i = 0; i < visitors.length; i++) {
        const v = visitors[i];
        const el = visitorRefs.current[i];
        const geom = nodeOffsets[v.platformIdx];
        if (!el || !geom) continue;

        const prevP = prevVisitorProgressRef.current[i] ?? v.phase;
        const progress = prefersReducedMotion ? v.phase : (v.phase + elapsed * v.speed) % 1;

        if (!prefersReducedMotion && progress < prevP) {
          const pCfg = visiblePlatforms[v.platformIdx];
          triggerArrival(geom.tx, geom.ty, ACCENT_HEX[pCfg.accent]);
        }
        prevVisitorProgressRef.current[i] = progress;

        const eased = progress * (0.84 + 0.16 * progress);
        const pt = cubicPoint(
          eased,
          geom.sx,
          geom.sy,
          geom.c1x,
          geom.c1y,
          geom.c2x,
          geom.c2y,
          geom.tx,
          geom.ty,
        );

        let opacity = 1;
        let sc = v.scale;
        if (progress < 0.14) {
          const k = progress / 0.14;
          opacity = k;
          sc *= 0.62 + 0.38 * k;
        } else if (progress > 0.84) {
          const k = (1 - progress) / 0.16;
          opacity = Math.max(0, k);
          sc *= 0.72 + 0.28 * k;
        }

        const pCfg = visiblePlatforms[v.platformIdx];
        if (activeHover && activeHover !== pCfg.id) {
          opacity *= 0.42;
        } else if (activeHover === pCfg.id) {
          sc *= 1.15;
        }

        el.setAttribute(
          'transform',
          `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) scale(${sc.toFixed(3)})`,
        );
        el.setAttribute('opacity', opacity.toFixed(3));
      }

      const pulses = arrivalPulsesRef.current;
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        const el = pulseRefs.current[i];
        if (!el) continue;

        if (!pulse.active || prefersReducedMotion) {
          el.setAttribute('opacity', '0');
          continue;
        }
        pulse.progress += dt * 1.45;
        if (pulse.progress >= 1) {
          pulse.active = false;
          el.setAttribute('opacity', '0');
          continue;
        }
        const r = 2 + pulse.progress * 14;
        const op = (1 - pulse.progress) * 0.8;
        el.setAttribute('cx', pulse.x.toFixed(1));
        el.setAttribute('cy', (pulse.y + laptopFloatY).toFixed(1));
        el.setAttribute('r', r.toFixed(2));
        el.setAttribute('stroke', pulse.color);
        el.setAttribute('opacity', op.toFixed(3));
      }

      const waves = siteWavesRef.current;
      for (let i = 0; i < waves.length; i++) {
        const w = waves[i];
        const el = waveRefs.current[i];
        if (!el) continue;

        if (!w.active || prefersReducedMotion) {
          el.setAttribute('opacity', '0');
          continue;
        }
        w.progress += dt * 0.62;
        if (w.progress >= 1) {
          w.active = false;
          el.setAttribute('opacity', '0');
          continue;
        }
        const expand = w.progress * 26;
        const op = (1 - w.progress) * (1 - w.progress) * 0.34;
        el.setAttribute('x', (LAPTOP_X - expand).toFixed(1));
        el.setAttribute('y', (LAPTOP_Y + laptopFloatY - expand).toFixed(1));
        el.setAttribute('width', (LAPTOP_W + expand * 2).toFixed(1));
        el.setAttribute('height', (LAPTOP_H + expand * 2).toFixed(1));
        el.setAttribute('rx', (16 + expand * 0.4).toFixed(1));
        el.setAttribute('opacity', op.toFixed(3));
      }

      for (let i = 0; i < dustMotes.length; i++) {
        const d = dustMotes[i];
        const el = dustRefs.current[i];
        if (!el) continue;
        if (!prefersReducedMotion) {
          const dx = Math.sin(elapsed * d.speed + d.phase) * d.driftX;
          const dy = Math.cos(elapsed * d.speed * 0.8 + d.phase) * d.driftY;
          const op = d.baseOpacity * (0.65 + 0.35 * Math.sin(elapsed * 1.1 + d.phase));
          el.setAttribute('cx', (d.x + dx).toFixed(1));
          el.setAttribute('cy', (d.y + dy).toFixed(1));
          el.setAttribute('opacity', op.toFixed(3));
        }
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      io.disconnect();
    };
  }, [visiblePlatforms, visitors, dustMotes]);

  const handleNodePulse = (idx: number) => {
    const p = visiblePlatforms[idx];
    if (!p) return;
    const pool = arrivalPulsesRef.current;
    const slot = pool.findIndex((item) => !item.active);
    pool[slot >= 0 ? slot : 0] = {
      active: true,
      x: p.targetX,
      y: p.targetY,
      progress: 0,
      color: ACCENT_HEX[p.accent],
    };
    const waves = siteWavesRef.current;
    const wSlot = waves.findIndex((w) => !w.active);
    waves[wSlot >= 0 ? wSlot : 0] = { active: true, progress: 0 };
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive showcase of a cleaning service website inside a laptop receiving visitor traffic from social media platforms above"
      className="relative w-full h-[360px] sm:h-[440px] lg:h-[520px] select-none flex items-center justify-center"
    >
      <div
        ref={tiltLayerRef}
        className="relative w-full max-w-[540px] aspect-[560/520] transition-transform duration-150 ease-out will-change-transform"
      >
        {/* 1. Background Glow & Aura Layer (Behind Laptop) */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="ecoLaptopGlow" cx="50%" cy="62%" r="50%">
              <stop offset="0%" stopColor="#7554D9" stopOpacity="0.44" />
              <stop offset="50%" stopColor="#568DEB" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0D0E1B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ecoTopCanopyGlow" cx="50%" cy="18%" r="48%">
              <stop offset="0%" stopColor="#568DEB" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#7554D9" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0D0E1B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g ref={parallaxBgRef}>
            <ellipse cx={VIEW_W / 2} cy="316" rx="250" ry="160" fill="url(#ecoLaptopGlow)" />
            <ellipse cx={VIEW_W / 2} cy="110" rx="240" ry="105" fill="url(#ecoTopCanopyGlow)" />
            {dustMotes.map((d, idx) => (
              <circle
                key={idx}
                ref={(el) => {
                  dustRefs.current[idx] = el;
                }}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill={idx % 2 === 0 ? '#B9A6FF' : '#9EB8FF'}
                opacity={d.baseOpacity}
              />
            ))}
          </g>

          {/* Expanding growth waves around laptop screen */}
          {siteWavesRef.current.map((_, idx) => (
            <rect
              key={`wave-${idx}`}
              ref={(el) => {
                waveRefs.current[idx] = el;
              }}
              x={LAPTOP_X}
              y={LAPTOP_Y}
              width={LAPTOP_W}
              height={LAPTOP_H}
              rx="16"
              fill="none"
              stroke="#B9A6FF"
              strokeWidth="1.2"
              opacity="0"
            />
          ))}

          {/* Soft outer aura around laptop */}
          <rect
            ref={laptopAuraRef}
            x={LAPTOP_X - 5}
            y={LAPTOP_Y - 5}
            width={LAPTOP_W + 10}
            height={LAPTOP_H + 10}
            rx="16"
            fill="none"
            stroke="#7554D9"
            strokeWidth="1.4"
            opacity="0.26"
          />
        </svg>

        {/* 2. Center-Lower Focal Laptop Mockup Showing Real Cleaning Service Website */}
        <div
          ref={laptopFloatRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
        >
          {/* Laptop Lid / Screen Assembly */}
          <div
            style={{
              left: '12%',
              top: '41%',
              width: '76%',
              height: '45%',
            }}
            className="absolute rounded-t-[14px] sm:rounded-t-[16px] rounded-b-[4px] bg-gradient-to-b from-[#272B4E] via-[#171A34] to-[#111328] p-[5px] sm:p-[7px] pb-[7px] sm:pb-[9px] border border-[#B9A6FF]/35 shadow-[0_24px_55px_-12px_rgba(13,14,27,0.9),0_0_32px_-8px_rgba(117,84,217,0.4)] flex flex-col"
          >
            {/* Precision Webcam Notch */}
            <div className="flex justify-center mb-[3px] sm:mb-[4px] shrink-0">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#568DEB]/70 ring-1 ring-white/15" />
            </div>

            {/* Real Cleaning Service Website Screen */}
            <div className="relative flex-1 min-h-0 w-full rounded-[8px] sm:rounded-[10px] overflow-hidden bg-[#F7F7FC] text-[#0D0E1B] border border-white/15 flex flex-col shadow-inner">
              {/* Browser URL & Website Header Bar */}
              <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/95 border-b border-[#0D0E1B]/8 flex items-center justify-between gap-1.5 shrink-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="flex items-center gap-0.5 sm:gap-1 shrink-0" aria-hidden="true">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#7554D9]/65" />
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#568DEB]/65" />
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#B9A6FF]/85" />
                  </div>
                  <div className="flex items-center gap-1 rounded bg-[#EFEFF8] px-1.5 py-0.5 min-w-0">
                    <Lock className="w-2 h-2 text-[#568DEB] shrink-0" />
                    <span className="text-[6.5px] sm:text-[8px] font-medium text-[#373B57] truncate">
                      purespaceclean.com
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                  <span className="hidden sm:inline text-[7.5px] font-medium text-[#4B4E63]">
                    Services
                  </span>
                  <span className="hidden sm:inline text-[7.5px] font-medium text-[#4B4E63]">
                    Pricing
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-[#7554D9] to-[#568DEB] px-1.5 sm:px-2 py-0.5 text-[6.5px] sm:text-[7.5px] font-semibold text-white whitespace-nowrap">
                    Book Clean
                  </span>
                </div>
              </div>

              {/* Cleaning Website Split Hero */}
              <div className="px-2 sm:px-3 pt-1.5 sm:pt-2.5 pb-1.5 grid grid-cols-12 gap-1.5 sm:gap-2.5 items-center flex-1 min-h-0">
                <div className="col-span-7 flex flex-col justify-center min-w-0">
                  <div className="inline-flex items-center gap-1 text-[6px] sm:text-[7px] font-semibold uppercase tracking-[0.1em] text-[#568DEB]">
                    <Sparkles className="w-2 h-2 shrink-0" />
                    <span className="truncate">PureSpace Cleaning</span>
                  </div>
                  <h2 className="mt-0.5 font-sans-ui font-bold text-[10px] sm:text-[13.5px] leading-[1.08] tracking-tight text-[#0D0E1B]">
                    Spotless Homes,
                    <br />
                    Booked in 60s
                  </h2>
                  <p className="hidden sm:block mt-1 text-[7.5px] leading-snug text-[#4B4E63] line-clamp-2">
                    Eco-certified residential &amp; office deep cleaning crews.
                  </p>
                  <div className="mt-1 sm:mt-1.5 flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-[#0D0E1B] text-white px-2 py-0.5 text-[6.5px] sm:text-[7.5px] font-semibold">
                      Instant Quote
                      <ArrowRight className="w-2 h-2" />
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[6px] sm:text-[7px] font-semibold text-[#373B57]">
                      <Star className="w-2 h-2 fill-[#568DEB] text-[#568DEB]" />
                      4.9 · 680+ Homes
                    </span>
                  </div>
                </div>

                {/* Real Cleaning Service Photo */}
                <div className="col-span-5 h-full max-h-[76px] sm:max-h-[104px] rounded-md sm:rounded-lg overflow-hidden border border-[#0D0E1B]/10 shadow-sm relative bg-[#E7E9F6]">
                  <img
                    src="/assets/showcase/cleaning-hero.jpg"
                    alt="PureSpace spotless residential cleaning showcase"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 right-1 rounded bg-[#0D0E1B]/75 backdrop-blur-xs px-1 py-0.5 flex items-center gap-1 text-[5.5px] sm:text-[6.5px] text-white">
                    <Check className="w-2 h-2 text-[#9EB8FF] shrink-0" />
                    <span className="truncate">100% Eco-Safe</span>
                  </div>
                </div>
              </div>

              {/* Lower Cleaning Service Packages Strip */}
              <div className="px-2 sm:px-3 pb-1.5 sm:pb-2 shrink-0">
                <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
                  {CLEANING_SERVICES.map((svc) => (
                    <div
                      key={svc.title}
                      className="rounded sm:rounded-md bg-white border border-[#0D0E1B]/8 p-1 flex items-center gap-1 shadow-[0_1px_4px_rgba(13,14,27,0.05)] min-w-0"
                    >
                      <img
                        src={svc.image}
                        alt={svc.title}
                        referrerPolicy="no-referrer"
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] object-cover shrink-0 bg-[#E7E9F6]"
                      />
                      <div className="min-w-0">
                        <p className="text-[5.5px] sm:text-[6.8px] font-semibold text-[#0D0E1B] truncate leading-tight">
                          {svc.title}
                        </p>
                        <p className="text-[5px] sm:text-[6.2px] font-medium text-[#568DEB] truncate">
                          {svc.meta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Metallic Base / Keyboard Deck */}
          <div
            style={{
              left: '5%',
              top: '86%',
              width: '90%',
              height: '4.6%',
            }}
            className="absolute rounded-b-[12px] rounded-t-[2px] bg-gradient-to-b from-[#333863] via-[#1C2040] to-[#0E1022] border-t border-[#B9A6FF]/40 border-x border-b border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.85)] flex justify-center"
          >
            {/* Thumb indent notch */}
            <div className="w-[16%] h-[42%] rounded-b-md bg-[#111328] border-x border-b border-white/10" />
          </div>

          {/* Ground Contact Glow Under Laptop */}
          <div
            style={{
              left: '14%',
              top: '91.5%',
              width: '72%',
              height: '4%',
            }}
            className="absolute rounded-full bg-gradient-to-r from-transparent via-[#7554D9]/35 to-transparent blur-md"
          />
        </div>

        {/* 3. Foreground SVG Layer: Top-Only Social Platforms, Curved Traffic Streams & Human Silhouettes */}
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ecoTopStreamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9EB8FF" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#B9A6FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#568DEB" stopOpacity="0.95" />
            </linearGradient>

            <radialGradient id="ecoTopNodeFill" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#252A58" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#121429" stopOpacity="0.96" />
            </radialGradient>

            <filter id="ecoStreamBlur" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="ecoHumanGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2.1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g ref={parallaxMidRef}>
            {/* Curved Traffic Streams from TOP social icons into TOP of Laptop */}
            {visiblePlatforms.map((p, idx) => (
              <g key={`stream-${p.id}`}>
                <path
                  ref={(el) => {
                    basePathRefs.current[idx] = el;
                  }}
                  d={`M ${p.x} ${p.y} C ${p.c1x} ${p.c1y}, ${p.c2x} ${p.c2y}, ${p.targetX} ${p.targetY}`}
                  fill="none"
                  stroke="#9EB8FF"
                  strokeWidth="1.15"
                  strokeOpacity="0.2"
                  strokeLinecap="round"
                />
                <path
                  ref={(el) => {
                    glowPathRefs.current[idx] = el;
                  }}
                  d={`M ${p.x} ${p.y} C ${p.c1x} ${p.c1y}, ${p.c2x} ${p.c2y}, ${p.targetX} ${p.targetY}`}
                  fill="none"
                  stroke="url(#ecoTopStreamGrad)"
                  strokeWidth={hoveredPlatform === p.id ? '2.1' : '1.45'}
                  strokeDasharray="14 24"
                  strokeLinecap="round"
                  strokeOpacity="0.56"
                  filter="url(#ecoStreamBlur)"
                />
              </g>
            ))}

            {/* Animated Minimal Human / User Silhouettes Traveling Down Into the Laptop Website */}
            {visitors.map((_, idx) => (
              <g
                key={`visitor-${idx}`}
                ref={(el) => {
                  visitorRefs.current[idx] = el;
                }}
                filter="url(#ecoHumanGlow)"
              >
                <circle cx="0" cy="0" r="6.2" fill="#9EB8FF" fillOpacity="0.24" />
                <circle cx="0" cy="-2.6" r="2.0" fill="#F3F1F8" />
                <path
                  d="M -3.8 4.3 C -3.8 1.6, -2.0 0.45, 0 0.45 C 2.0 0.45, 3.8 1.6, 3.8 4.3 Z"
                  fill="#B9A6FF"
                />
              </g>
            ))}

            {/* Entry Nodes & Arrival Sparks Along Top Edge of Laptop */}
            {visiblePlatforms.map((p, idx) => (
              <circle
                key={`entry-${p.id}`}
                ref={(el) => {
                  entryDotRefs.current[idx] = el;
                }}
                cx={p.targetX}
                cy={p.targetY}
                r="2.3"
                fill="#B9A6FF"
                fillOpacity="0.78"
              />
            ))}

            {arrivalPulsesRef.current.map((_, idx) => (
              <circle
                key={`pulse-${idx}`}
                ref={(el) => {
                  pulseRefs.current[idx] = el;
                }}
                cx={VIEW_W / 2}
                cy={ENTRY_Y}
                r="4"
                fill="none"
                stroke="#B9A6FF"
                strokeWidth="1.4"
                opacity="0"
              />
            ))}

            {/* Upper Canopy Social Media & Online Traffic Source Icons */}
            {visiblePlatforms.map((p, idx) => {
              const isHot = hoveredPlatform === p.id;
              const ringColor = ACCENT_HEX[p.accent];
              return (
                <g
                  key={p.id}
                  ref={(el) => {
                    nodeRefs.current[idx] = el;
                  }}
                  transform={`translate(${p.x} ${p.y})`}
                  onMouseEnter={() => setHoveredPlatform(p.id)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  onClick={() => handleNodePulse(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r={isHot ? 28 : 24}
                    fill={ringColor}
                    fillOpacity={isHot ? 0.24 : 0.11}
                    style={{ transition: 'all 220ms ease' }}
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="21"
                    fill="url(#ecoTopNodeFill)"
                    stroke={ringColor}
                    strokeWidth={isHot ? '1.6' : '1.05'}
                    strokeOpacity={isHot ? '0.94' : '0.48'}
                    style={{ transition: 'all 220ms ease' }}
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="17.8"
                    fill="none"
                    stroke="#F3F1F8"
                    strokeWidth="0.6"
                    strokeOpacity={isHot ? '0.28' : '0.1'}
                  />
                  <g
                    transform={isHot ? 'scale(1.08)' : 'scale(1)'}
                    style={{ transition: 'transform 220ms ease' }}
                  >
                    {renderPlatformGlyph(p.id)}
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};
