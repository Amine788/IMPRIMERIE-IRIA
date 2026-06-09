
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { FaCogs, FaTools } from 'react-icons/fa'; // Added FaTools icon

interface Machine {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const mockMachines: Machine[] = [
  {
    id: '1',
    name: 'Presse Offset Heidelberg Speedmaster',
    description: 'Une machine d\'impression offset de pointe, idéale pour les grands volumes et une qualité d\'image supérieure sur une large gamme de papiers.',
    imageUrl: 'https://images.unsplash.com/photo-1596541249767-f70353c7a9b0?auto=format&fit=crop&q=80&w=1080&h=720', // Original is good, keeping
  },
  {
    id: '2',
    name: 'Imprimante Numérique Xerox Iridesse Production Press',
    description: 'Offre une flexibilité inégalée pour les petites et moyennes séries, avec des capacités d\'impression métalliques et de vernis sélectif.',
    imageUrl: 'https://images.unsplash.com/photo-1558230554-b5f4c4a6a57e?auto=format&fit=crop&q=80&w=1080&h=720', // Updated: Modern digital press
  },
  {
    id: '3',
    name: 'Traceur Grand Format HP DesignJet Z9⁺',
    description: 'Parfait pour les affiches, bâches et signalétiques. Assure des couleurs vives et une durabilité extérieure exceptionnelle.',
    imageUrl: 'https://images.unsplash.com/photo-1617478496425-4b1e5a5f7f2b?auto=format&fit=crop&q=80&w=1080&h=720', // Updated: Large format printer at work
  },
  {
    id: '4',
    name: 'Machine de Finition MBO K80 Combi-Folding',
    description: 'Pour des pliages précis et complexes de dépliants et brochures, garantissant une finition impeccable.',
    imageUrl: 'https://images.unsplash.com/photo-1577717903275-c990176840d2?auto=format&fit=crop&q=80&w=1080&h=720', // Original is good, keeping
  },
];

const MachinesPage: React.FC = () => {
  const { translate } = useAppContext();
  return (
    <div className="py-12 px-4 bg-aria-white rounded-2xl shadow-xl animate-fade-in-down"> {/* More rounded, stronger shadow, more padding */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3"> {/* Stronger font, icon */}
        <FaCogs className="text-aria-accent text-5xl" /> {translate('machines.title')}
      </h1>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10 font-open-sans leading-relaxed">
        Découvrez la technologie de pointe qui alimente notre imprimerie, garantissant une qualité et une efficacité exceptionnelles pour tous vos projets.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"> {/* Increased gap, max-width */}
        {mockMachines.map((machine, index) => (
          <div key={machine.id} className="bg-aria-background-secondary rounded-xl shadow-premium hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1 group"> {/* More rounded, stronger shadow, lift effect */}
            <img src={machine.imageUrl} alt={machine.name} className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-300" /> {/* Larger image, zoom on hover */}
            <div className="p-6 flex-grow"> {/* More padding */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-aria-accent transition-colors duration-200">{machine.name}</h2> {/* Larger text, hover color */}
              <p className="text-gray-700 text-base font-open-sans leading-relaxed">{machine.description}</p> {/* Larger text, more spacing */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachinesPage;