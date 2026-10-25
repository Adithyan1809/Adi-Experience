import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Send, Mail, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/personal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Coffee in Bangalore',
    message: '',
  });

  const email = personalInfo.links.email || 'contact@adithyanp.me';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyNoteText = () => {
    const fullText = `Hi Adi,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})\nTopic: ${formData.topic}`;
    navigator.clipboard.writeText(fullText);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2500);
  };

  const openMailto = () => {
    const subject = encodeURIComponent(`[Adi Experience] ${formData.topic} — from ${formData.name}`);
    const body = encodeURIComponent(`Hi Adi,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
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
      topic: 'Coffee in Bangalore',
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
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25 }}
            className="relative max-w-xl w-full bg-charcoal border border-editorial rounded-sm p-6 sm:p-10 shadow-2xl space-y-6"
          >
            {/* Close Button */}
            <button
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
                Drop a note below. Clicking &ldquo;Send Note&rdquo; opens your default mail app with a draft ready to send. Or copy my email directly.
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
                  <h4 className="font-serif text-2xl text-ivory">Opening Your Email App</h4>
                  <p className="text-xs text-stone font-sans max-w-sm mx-auto mt-1 leading-relaxed">
                    A pre-filled draft should appear in your mail app. If your browser blocked it or you prefer sending manually, use the options below:
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
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-obsidian border border-editorial rounded-sm text-sm text-ivory focus:border-terracotta focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-[11px] font-mono text-stone uppercase tracking-wider block mb-1.5">
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
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
                    <option value="Coffee in Bangalore">Coffee in Bangalore</option>
                    <option value="Tech or Project Idea">Tech or project idea</option>
                    <option value="Music Recommendation">Music recommendation</option>
                    <option value="Just Saying Hi">Just saying hi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-[11px] font-mono text-stone uppercase tracking-wider block mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Tell me what you're working on, your favorite coffee spot, or an absurd thought from today..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-obsidian border border-editorial rounded-sm text-sm text-ivory focus:border-terracotta focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-stone">
                    Prepares draft to {email}
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-terracotta text-ivory hover:bg-terracotta-hover transition-colors text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ivory"
                  >
                    <span>Send Note</span>
                    <Send className="w-3.5 h-3.5" />
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
