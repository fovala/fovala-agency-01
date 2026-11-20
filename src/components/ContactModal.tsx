import React, { useEffect, useState } from 'react';
import { X, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandIcon } from './BrandLogo';

interface ContactModalProps {
  open: boolean;
  initialProjectType?: string;
  initialNote?: string;
  onClose: () => void;
}

const PROJECT_TYPES = [
  'Business Website Design',
  'E-commerce Website Design',
  'Landing Page Design',
  'WordPress Solutions',
  'Shopify Store Solutions',
  'Website Redesign',
  'Custom Digital Experience',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubmissionReceipt {
  referenceCode: string;
  submittedAt: string;
  message: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  open,
  initialProjectType = 'Business Website Design',
  initialNote = '',
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType);
  const [projectDetails, setProjectDetails] = useState(initialNote);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  useEffect(() => {
    if (open) {
      if (PROJECT_TYPES.includes(initialProjectType)) {
        setProjectType(initialProjectType);
      }
      if (initialNote && !projectDetails) {
        setProjectDetails(initialNote);
      }
    }
  }, [open, initialProjectType, initialNote, projectDetails]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const validateClient = (): boolean => {
    const errors: Record<string, string> = {};
    if (name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!PROJECT_TYPES.includes(projectType)) {
      errors.projectType = 'Please select a project type.';
    }
    if (projectDetails.trim().length < 15) {
      errors.projectDetails = 'Please share at least 15 characters about your goals and timeline.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateClient()) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          projectType,
          projectDetails: projectDetails.trim(),
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        fieldErrors?: Record<string, string>;
        referenceCode?: string;
        submittedAt?: string;
        message?: string;
      };

      if (!response.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setServerError(data.error || 'Submission failed. Please check your details and try again.');
        return;
      }

      setReceipt({
        referenceCode: data.referenceCode || 'FOV-LOGGED',
        submittedAt: data.submittedAt || new Date().toISOString(),
        message: data.message || 'Your inquiry has been saved.',
      });
      setName('');
      setEmail('');
      setCompany('');
      setProjectDetails('');
      setFieldErrors({});
    } catch {
      setServerError(
        'Could not reach the Fovala inquiry server. Please verify your connection and try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setReceipt(null);
    setServerError(null);
    setFieldErrors({});
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Start a Project with Fovala"
          className="fixed inset-0 z-50 bg-[#0D0E1B]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-3xl bg-[#131528] border border-white/15 text-white overflow-hidden shadow-[0_32px_90px_rgba(4,6,18,0.8)] my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <BrandIcon sizeClass="w-7 h-7" variant="hero" />
                <span className="h-4 w-[1px] bg-white/15" aria-hidden="true" />
                <span className="text-xs text-[#B8B9C5]">Project Inquiry</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close inquiry modal"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#B8B9C5] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {receipt ? (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-[#7554D9]/25 border border-[#B9A6FF]/40 flex items-center justify-center text-[#B9A6FF]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
                    Inquiry Received.
                  </h3>
                  <p className="text-sm text-[#B8B9C5] leading-relaxed">
                    {receipt.message} Our creative directors will review your brief and respond promptly.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#0D0E1B] border border-white/10 p-4 flex items-center justify-between text-xs">
                  <span className="text-[#B8B9C5]">Reference Code</span>
                  <span className="font-mono tabular-nums font-semibold text-[#9EB8FF]">
                    {receipt.referenceCode}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-xs text-[#B8B9C5] hover:text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-[#7554D9] hover:bg-[#568DEB] px-5 py-2.5 text-xs font-medium text-white transition-colors"
                  >
                    Return to Website
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-4">
                <div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
                    Let&apos;s Create Something{' '}
                    <span className="text-gradient-lavender">Exceptional.</span>
                  </h3>
                  <p className="mt-1 text-xs text-[#B8B9C5]">
                    Tell us about your brand, platform preferences, and launch objectives.
                  </p>
                </div>

                {serverError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-400/35 px-4 py-3 text-xs text-red-200"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-300" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label htmlFor="inq-name" className="block text-xs font-medium text-[#F3F1F8] mb-1.5">
                      Name <span className="text-[#B9A6FF]">*</span>
                    </label>
                    <input
                      id="inq-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: '' }));
                      }}
                      placeholder="Your full name"
                      className="w-full rounded-xl bg-[#0D0E1B] border border-white/15 focus:border-[#9EB8FF] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-[11px] text-red-300">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="inq-email" className="block text-xs font-medium text-[#F3F1F8] mb-1.5">
                      Email <span className="text-[#B9A6FF]">*</span>
                    </label>
                    <input
                      id="inq-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: '' }));
                      }}
                      placeholder="you@company.com"
                      className="w-full rounded-xl bg-[#0D0E1B] border border-white/15 focus:border-[#9EB8FF] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-[11px] text-red-300">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inq-company" className="block text-xs font-medium text-[#F3F1F8] mb-1.5">
                      Company <span className="text-[#B8B9C5]/60">(optional)</span>
                    </label>
                    <input
                      id="inq-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Brand or organization"
                      className="w-full rounded-xl bg-[#0D0E1B] border border-white/15 focus:border-[#9EB8FF] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="inq-type" className="block text-xs font-medium text-[#F3F1F8] mb-1.5">
                      Project Type <span className="text-[#B9A6FF]">*</span>
                    </label>
                    <select
                      id="inq-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full rounded-xl bg-[#0D0E1B] border border-white/15 focus:border-[#9EB8FF] px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#101116] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="inq-details" className="block text-xs font-medium text-[#F3F1F8] mb-1.5">
                    Project Details <span className="text-[#B9A6FF]">*</span>
                  </label>
                  <textarea
                    id="inq-details"
                    rows={4}
                    value={projectDetails}
                    onChange={(e) => {
                      setProjectDetails(e.target.value);
                      if (fieldErrors.projectDetails) {
                        setFieldErrors((p) => ({ ...p, projectDetails: '' }));
                      }
                    }}
                    placeholder="Share your goals, preferred platform (Shopify, Webflow, WordPress, Framer, etc.), and target timeline..."
                    className="w-full rounded-xl bg-[#0D0E1B] border border-white/15 focus:border-[#9EB8FF] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors resize-none"
                  />
                  {fieldErrors.projectDetails && (
                    <p className="mt-1 text-[11px] text-red-300">{fieldErrors.projectDetails}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs text-[#B8B9C5] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#CFC5FF] via-[#B9A6FF] to-[#8FB3FF] hover:from-white hover:to-[#B9A6FF] disabled:opacity-60 text-[#080910] font-medium text-xs sm:text-sm px-6 py-3 transition-all whitespace-nowrap"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
