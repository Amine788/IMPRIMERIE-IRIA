
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Button from '../components/Button';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaComments } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const { translate } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const googleMapsLink1 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110550.39964813586!2d-9.7322227!3d29.697417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb479f80a0452e5%3A0x4a96c3829202720!2sTiznit!5e0!3m2!1sen!2sma!4v1714574400000!5m2!1sen!2sma";
  const googleMapsLink2 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69107.03157201738!2d-9.5214648!3d30.3414878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3c7a360a466d7%3A0xa490012090f67bee!2sImprimerie%20aria!5e0!3m2!1sen!2sma!4v1714574400000!5m2!1sen!2sma";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    console.log('Form submitted:', formData);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccessMessage('Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
    }
    
    setLoading(false);
  };

  // Inputs are strictly white
  const commonInputClasses = "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-aria-accent focus:border-aria-accent text-gray-800 bg-white transition-all duration-200";

  return (
    <div className="py-12 px-4 bg-white rounded-2xl shadow-xl animate-fade-in-down border border-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">{translate('contact.title')}</h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10 font-open-sans leading-relaxed">
        Nous sommes là pour répondre à toutes vos questions et vous aider dans vos projets d'impression. N'hésitez pas à nous contacter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form - White Background */}
        <div className="bg-white p-8 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
            <FaComments className="text-aria-accent" /> Envoyez-nous un message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Nom complet</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={commonInputClasses} required placeholder="Votre nom" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={commonInputClasses} required placeholder="votre@email.com" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-1">Sujet</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={commonInputClasses} required placeholder="Sujet de votre message" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">Votre message</label>
              <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} className={`${commonInputClasses} resize-y`} required placeholder="Comment pouvons-nous vous aider ?"></textarea>
            </div>
            {successMessage && <p className="text-green-600 text-center font-semibold bg-green-50 p-3 rounded-lg">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center font-semibold bg-red-50 p-3 rounded-lg">{errorMessage}</p>}
            <Button type="submit" className="w-full py-4 text-lg" loading={loading}>Envoyer le message</Button>
          </form>
        </div>

        {/* Contact Information - White Background */}
        <div className="p-8 bg-white rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100 h-fit">
          <h2 className="text-3xl font-extrabold text-aria-primary mb-6 flex items-center gap-3">
            <FaMapMarkerAlt className="text-aria-accent" /> Nos Coordonnées
          </h2>
          <div className="space-y-6 text-gray-800 text-lg font-open-sans">
            <div className="flex items-start group">
              <FaMapMarkerAlt className="text-aria-accent text-2xl mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href={googleMapsLink1} target="_blank" rel="noopener noreferrer" className="hover:text-aria-accent transition-colors duration-200">
                Tiznit, Maroc
              </a>
            </div>
            <div className="flex items-start group">
              <FaMapMarkerAlt className="text-aria-accent text-2xl mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href={googleMapsLink2} target="_blank" rel="noopener noreferrer" className="hover:text-aria-accent transition-colors duration-200">
                Agadir, Maroc
              </a>
            </div>
            <div className="flex items-center group">
              <FaPhone className="text-aria-accent text-2xl mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>+212 5XX XXXXXX</span>
            </div>
            <div className="flex items-center group">
              <FaEnvelope className="text-aria-accent text-2xl mr-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>contact@imprimeriearia.ma</span>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-xl font-extrabold text-aria-primary mb-4">Heures d'ouverture</h3>
              <p className="text-base flex justify-between py-1 border-b border-gray-50"><span>Lundi - Vendredi:</span> <span className="font-bold">9h00 - 18h00</span></p>
              <p className="text-base flex justify-between py-1 border-b border-gray-50"><span>Samedi:</span> <span className="font-bold">9h00 - 13h00</span></p>
              <p className="text-base flex justify-between py-1"><span>Dimanche:</span> <span className="font-bold text-red-500">Fermé</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Où nous trouver</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 px-6 py-4 bg-white border-b border-gray-100">Tiznit</h3>
            <iframe
              src={googleMapsLink1}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location 1"
              aria-label="Localisation de Imprimerie Aria à Tiznit"
            ></iframe>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 px-6 py-4 bg-white border-b border-gray-100">Agadir</h3>
            <iframe
              src={googleMapsLink2}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location 2"
              aria-label="Localisation de Imprimerie Aria à Agadir"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
