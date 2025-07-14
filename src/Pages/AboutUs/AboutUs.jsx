import { motion } from "framer-motion";
import { FaBullseye, FaLink, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      {/* Decorative SVG wave */}
      <div className="absolute -top-24 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-40 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M0,256L48,234.7C96,213,192,171,288,144C384,117,480,107,576,128C672,149,768,203,864,229.3C960,256,1056,256,1152,224C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          About HavenKeys
        </h2>
        <p className="text-lg md:text-xl text-gray-900 max-w-3xl mx-auto leading-relaxed mb-12">
          <strong className="text-gray-900">EstateVista</strong> is your trusted real estate
          platform that simplifies property buying, selling, and renting. We connect
          homeowners, buyers, and renters with the best opportunities, backed by
          an intuitive, secure, and user-friendly experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaBullseye className="text-orange-500 text-4xl mb-4" />,
              title: "Our Mission",
              text: "Empowering our users to make confident real estate decisions with transparency and ease.",
            },
            {
              icon: <FaLink className="text-orange-500 text-4xl mb-4" />,
              title: "Why Choose EstateVista?",
              text: "A comprehensive, secure platform with verified listings and real-time updates.",
            },
            {
              icon: <FaRocket className="text-orange-500 text-4xl mb-4" />,
              title: "What We Offer",
              text: "Easy property search, advanced filters, expert support, and smooth transaction process.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              {card.icon}
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
