import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface InquiryRecord {
  id: string;
  referenceCode: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  projectDetails: string;
  submittedAt: string;
}

const DATA_DIR = path.resolve(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function ensureDataStore(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readInquiries(): InquiryRecord[] {
  ensureDataStore();
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeInquiries(records: InquiryRecord[]): void {
  ensureDataStore();
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_PROJECT_TYPES = new Set([
  'Business Website Design',
  'E-commerce Website Design',
  'Landing Page Design',
  'WordPress Solutions',
  'Shopify Store Solutions',
  'Website Redesign',
  'Custom Digital Experience',
]);

async function startServer(): Promise<void> {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'fovala-agency-api' });
  });

  app.post('/api/inquiries', (req: Request, res: Response) => {
    const body = req.body as Record<string, unknown> | undefined;
    if (!body || typeof body !== 'object') {
      res.status(400).json({ error: 'Invalid request payload.' });
      return;
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
    const projectDetails = typeof body.projectDetails === 'string' ? body.projectDetails.trim() : '';

    const fieldErrors: Record<string, string> = {};

    if (name.length < 2) {
      fieldErrors.name = 'Please enter your full name (at least 2 characters).';
    } else if (name.length > 120) {
      fieldErrors.name = 'Name must be under 120 characters.';
    }

    if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = 'Please provide a valid email address.';
    }

    if (company.length > 120) {
      fieldErrors.company = 'Company name must be under 120 characters.';
    }

    if (!ALLOWED_PROJECT_TYPES.has(projectType)) {
      fieldErrors.projectType = 'Please select a valid project type.';
    }

    if (projectDetails.length < 15) {
      fieldErrors.projectDetails = 'Please share at least 15 characters about your project goals and timeline.';
    } else if (projectDetails.length > 3000) {
      fieldErrors.projectDetails = 'Project details must be under 3,000 characters.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        error: 'Please review the highlighted fields before submitting.',
        fieldErrors,
      });
      return;
    }

    try {
      const records = readInquiries();
      const id = `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const referenceCode = `FOV-${String(records.length + 101).padStart(4, '0')}`;
      const submittedAt = new Date().toISOString();

      const record: InquiryRecord = {
        id,
        referenceCode,
        name,
        email,
        company,
        projectType,
        projectDetails,
        submittedAt,
      };

      records.push(record);
      writeInquiries(records);

      res.status(201).json({
        id: record.id,
        referenceCode: record.referenceCode,
        submittedAt: record.submittedAt,
        message: 'Your inquiry has been received and logged by our team.',
      });
    } catch (err) {
      console.error('Failed to persist inquiry:', err);
      res.status(500).json({
        error: 'Unable to save your inquiry at this moment. Please try again shortly.',
      });
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Fovala server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
