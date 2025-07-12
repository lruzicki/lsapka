"use client"

import { useState } from "react"
import FireCaptcha from "./fire-captcha"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    recipient: 'komenda'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if RODO checkbox is checked
    const rodoCheckbox = document.getElementById('rodo') as HTMLInputElement;
    if (!rodoCheckbox?.checked) {
      alert('Musisz wyrazić zgodę na przetwarzanie danych osobowych.');
      return;
    }
    
    if (!captchaCompleted) {
      setShowCaptcha(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', recipient: 'komenda' });
      setCaptchaCompleted(false);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaComplete = (success: boolean) => {
    setCaptchaCompleted(success);
    setShowCaptcha(false);
  };

  return (
    <section id="kontakt" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Kontakt</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Masz pytania? Skontaktuj się z nami! Chętnie odpowiemy na wszystkie pytania.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Napisz do nas</h3>

            <div className="mb-6">
              <div className="flex rounded-md overflow-hidden border border-gray-300">
                <button
                  className={`px-4 py-2 flex-1 ${formData.recipient === "komenda" ? "bg-[rgb(var(--primary))] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={(e) => { e.preventDefault(); setFormData({ ...formData, recipient: "komenda" }); }}
                >
                  Komenda Kręgu
                </button>
                <button
                  className={`px-4 py-2 flex-1 ${formData.recipient === "kr" ? "bg-[rgb(var(--primary))] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={(e) => { e.preventDefault(); setFormData({ ...formData, recipient: "kr" }); }}
                >
                  Komisja Rewizyjna
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {formData.recipient === "komenda"
                  ? "Wiadomość zostanie wysłana do Komendy Kręgu"
                  : "Wiadomość zostanie wysłana do Komisji Rewizyjnej"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Imię i nazwisko
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="Jan Kowalski"
                  maxLength={100}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.name.length}/100 znaków
                </p>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="jan@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Temat
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="Temat wiadomości"
                  maxLength={200}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.subject.length}/200 znaków
                </p>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent"
                  placeholder="Treść wiadomości..."
                  maxLength={2000}
                  required
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/2000 znaków
                </p>
              </div>
              <div className="flex items-start">
                <input type="checkbox" id="rodo" className="mt-1 mr-2" required />
                <label htmlFor="rodo" className="text-sm text-gray-700">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z{" "}
                  <a 
                    href="/rodo-ls-przetwarzanie-danych-osobowych.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[rgb(var(--primary))] hover:underline"
                  >
                    polityką RODO
                  </a>
                </label>
              </div>
              
              {/* Captcha status indicator */}
              {captchaCompleted && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Weryfikacja anty-spamowa zakończona
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-6 py-3 rounded-md transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij!'}
              </button>
            </form>

            {submitStatus === 'success' && (
              <p className="text-green-600">Wiadomość została wysłana!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600">Wystąpił błąd podczas wysyłania wiadomości.</p>
            )}
          </div>

          {/* Captcha Modal */}
          {showCaptcha && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Weryfikacja anty-spamowa</h3>
                    <button
                      onClick={() => setShowCaptcha(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <FireCaptcha onComplete={handleCaptchaComplete} />
                </div>
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Dane kontaktowe</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email</h4>
                  <p className="text-gray-600">komenda@lesnaszkolka.org</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Telefon</h4>
                  <p className="text-gray-600">Nie posiadamy numeru telefonu</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Adres</h4>
                  <p className="text-gray-600">ul. Stryjska 24, 81-506 Gdynia</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-bold text-lg mb-4">Znajdź nas</h4>
                <div className="flex space-x-6">
                  <a
                    href="https://www.facebook.com/lesnaszkolka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-16 w-16 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/lesnaszkolka/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-16 w-16 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=lIESC0wmstQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-16 w-16 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center hover:bg-[rgb(var(--primary))] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
