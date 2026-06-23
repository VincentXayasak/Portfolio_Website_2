import { useEffect, useState } from 'react';
import './ContactFormModal.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjknnvw';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactFormModal({ color, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        return;
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-modal" role="presentation">
      <button
        type="button"
        className="contact-modal__backdrop"
        onClick={onClose}
        aria-label="Close contact form"
      />
      <div
        className="contact-modal__panel"
        style={{ '--sticky-color': color }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          className="contact-modal__close"
          onClick={onClose}
          aria-label="Close contact form"
        >
          ×
        </button>

        <h2 id="contact-modal-title" className="contact-modal__title">
          Contact
        </h2>

        {status === 'success' ? (
          <p className="contact-modal__status contact-modal__status--success">
            Thanks for reaching out! I&apos;ll get back to you soon.
          </p>
        ) : (
          <form className="contact-modal__form" onSubmit={handleSubmit}>
            <label className="contact-modal__field">
              <span className="contact-modal__label">Your Name:</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </label>

            <label className="contact-modal__field">
              <span className="contact-modal__label">Your Email:</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </label>

            <label className="contact-modal__field">
              <span className="contact-modal__label">Subject:</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </label>

            <label className="contact-modal__field contact-modal__field--message">
              <span className="contact-modal__label">Message:</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </label>

            {status === 'error' && (
              <p className="contact-modal__status contact-modal__status--error">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="contact-modal__submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
