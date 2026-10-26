import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Mail, ExternalLink, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialMessage?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'Just saying hello',
  initialMessage = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: initialTopic,
    message: initialMessage,
  });

  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const email = personalInfo.links.email || 'contact@adithyanp.me';

  // Synchronize initial form state when opened with a prompt starter
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        topic: initialTopic || 'Just saying hello',
        message: initialMessage || '',
      });
      setSubmitted(false);
    }
  }, [isOpen, initialTopic, initialMessage]);

  // Manage focus restoration and escape key dismissal
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        messageInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    }
  }, [isOpen, onClose]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Graceful fallback when clipboard permission is denied
    }
  };

  const copyNoteText = async () => {
    const senderName = formData.name.trim() || 'A Visitor';
    const emailInfo = formData.email.trim() ? ` (${formData.email.trim()})` : '';
    const fullText = `Hi Adi,\n\n${formData.message}\n\nFrom: ${senderName}${emailInfo}\nTopic: ${formData.topic}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2500);
    } catch {
      // Graceful fallback
    }
  };

  const openMailto = () => {
    const senderName = formData.name.trim() || 'A Visitor';
    const emailInfo = formData.email.trim() ? ` (${formData.email.trim()})` : '';
    const subject = encodeURIComponent(`[Adi Experience] ${formData.topic} — from ${senderName}`);
    const body = encodeURIComponent(`Hi Adi,\n\n${formData.message}\n\nFrom: ${senderName}${emailInfo}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      return;
    }
    setSubmitted(true);
    openMailto();
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      topic: 'Just saying hello',
      message: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-charcoal border border-editorial rounded-sm p-6 sm:p-10 shadow-2xl space-y-6"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="absolute top-5 right-5 p-2 text-stone hover:text-ivory transition-colors focus:outline-none focus:ring-1 focus:ring-terracotta"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-terracotta uppercase tracking-wider mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span>Get in touch</span>
              </div>
              <h3 id="contact-modal-title" className="font-serif text-3xl text-ivory font-light">
                Say Hello
              </h3>
              <p className="text-xs sm:text-sm text-stone mt-1.5 font-sans leading-relaxed">
                Drop a quick note below. Clicking &ldquo;Open Mail Client&rdquo; prepares a draft in your email application ready to send to <span className="text-ivory font-mono">{email}</span>. Or copy my email directly.
              </p>
            </div>

            {/* One-click Copy Email Row */}
            <div className="p-4 bg-obsidian border border-editorial rounded-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-ivory/90 truncate">
                  {email}
                </span>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-charcoal border border-editorial hover:border-terracotta text-ivory rounded-sm transition-colors shrink-0 focus:outline-none focus:ring-1 focus:ring-terracotta"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Form or Post-Submit Guide */}
            {submitted ? (
              <div className="p-6 text-center bg-obsidian/70 border border-editorial rounded-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-terracotta/20 border border-terracotta/30 flex items-center justify-center mx-auto text-terracotta">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-ivory">Preparing Your Email App</h4>
                  <p className="text-xs text-stone font-sans max-w-sm mx-auto mt-1 leading-relaxed">
                    A pre-filled draft should open in your email application. If your browser blocked it or you prefer sending manually, use the options below:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={openMailto}
                    className="w-full sm:w-auto px-4 py-2.5 bg-ivory text-obsidian text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-ivory-muted transition-colors"
                  >
                    Launch Mail Client Again
                  </button>
                  <button
                    type="button"
                    onClick={copyNoteText}
                    className="w-full sm:w-auto px-4 py-2.5 border border-editorial text-ivory text-xs font-mono uppercase tracking-wider rounded-sm hover:border-terracotta transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedNote ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Message Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone" />
                        <span>Copy Message Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="text-xs font-mono text-stone hover:text-ivory transition-colors underline"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-[11px] font-mono text-stone uppercase tracking-wider block mb-1.5">
                      Your Name <span className="text-stone/60 lowercase">(optional)</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-obsidian border border-editorial rounded-sm text-sm text-ivory focus:border-terracotta focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-[11px] font-mono text-stone uppercase tracking-wider block mb-1.5">
                      Your Email <span className="text-stone/60 lowercase">(optional)</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-obsidian border border-editorial rounded-sm text-sm text-ivory focus:border-terracotta focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="text-[11px] font-mono text-stone uppercase tracking-wider block mb-1.5">
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-obsidian border border-editorial rounded-sm text-sm text-ivory focus:border-terracotta focus:outline-none transition-colors"
                  >
                    <option value="Just saying hello">Just saying hello</option>
                    <option value="Music Recommendation">Recommend a song</option>
                    <option value="Project Discussion">Talk about a project</option>
                    <option value="Bangalore Recommendation">Bangalore café or spot</option>
                    <option value="Something I'm building">Something I'm building</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-[11px] font-mono text-stone uppercase tracking-wider block mb-1.5">
                    Your Message <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    ref={messageInputRef}
                    rows={4}
                    required
                    placeholder="Tell me what you're working on, a good book or music recommendation, or just say hello..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-obsidian border border-editorial rounded-sm text-sm text-ivory focus:border-terracotta focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone">
                    Opens draft to {email}
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-terracotta text-ivory hover:bg-terracotta-hover transition-colors text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ivory"
                  >
                    <span>Open Mail Client</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
