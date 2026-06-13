
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa'; // Icon for date

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 astuces pour des flyers qui attirent l\'attention',
    excerpt: 'Découvrez comment créer des flyers percutants qui captivent votre audience et maximisent l\'impact de votre communication.',
    imageUrl: '/assets/blog_flyers.png',
    date: '15/05/2024',
  },
  {
    id: '2',
    title: 'L\'importance d\'une carte de visite professionnelle',
    excerpt: 'Une carte de visite bien conçue est un outil essentiel pour laisser une impression durable. Apprenez pourquoi elle est si cruciale.',
    imageUrl: '/assets/blog_cards.png',
    date: '01/05/2024',
  },
  {
    id: '3',
    title: 'Le packaging : plus qu\'une simple boîte, une expérience',
    excerpt: 'Explorez comment un packaging innovant peut transformer l\'expérience client et renforcer l\'identité de votre marque.',
    imageUrl: '/assets/Boîte Carton Personnalisée.png',
    date: '20/04/2024',
  },
  {
    id: '4',
    title: 'Bien choisir le papier pour vos impressions grand format',
    excerpt: 'Le choix du papier est crucial pour la qualité de vos affiches et bâches. Suivez nos conseils pour faire le bon choix.',
    imageUrl: '/assets/Roll-up Publicitaire.png',
    date: '10/04/2024',
  },
];

const BlogPage: React.FC = () => {
  const { translate } = useAppContext();

  return (
    <div className="py-12 px-4 bg-aria-white rounded-2xl shadow-xl animate-fade-in-down"> {/* More rounded, stronger shadow, more padding */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">{translate('blog.title')}</h1> {/* Stronger font */}
      <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-10 font-open-sans leading-relaxed">
        Découvrez les dernières tendances, conseils et astuces du monde de l'impression professionnelle sur notre blog.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"> {/* Increased gap, max-width */}
        {mockBlogPosts.map((post, index) => (
          <div key={post.id} className="bg-aria-background-secondary rounded-xl shadow-premium hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group"> {/* More rounded, stronger shadow, lift effect */}
            <div className="w-full aspect-video bg-gray-50 flex items-center justify-center overflow-hidden relative">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-6">
 {/* More padding */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-aria-accent transition-colors duration-200">{post.title}</h2> {/* Larger text, hover color */}
              <p className="text-gray-600 text-sm mb-4 font-open-sans flex items-center">
                <FaCalendarAlt className="mr-2 text-aria-accent" /> Publié le: <span className="font-medium ml-1">{post.date}</span>
              </p>
              <p className="text-gray-700 text-base mb-5 font-open-sans leading-relaxed">{post.excerpt}</p> {/* Larger text, more spacing */}
              <Link to={`/blog/${post.id}`} className="text-aria-accent hover:text-aria-primary font-semibold text-lg transition-colors duration-200"> {/* Larger text */}
                Lire la suite &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {mockBlogPosts.length === 0 && (
        <p className="text-center text-gray-600 text-xl mt-12 animate-fade-in-up delay-300 font-open-sans">
          Aucun article de blog pour le moment. Revenez bientôt !
        </p>
      )}
    </div>
  );
};

export default BlogPage;