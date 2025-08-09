import { FaChild, FaCity, FaTree } from "react-icons/fa";
import { motion } from "framer-motion";

const colors = {
  primary: "#2F855A", // Forest Green
  accent: "#F6C26B", // Golden Sun
  textPrimary: "#2D3748",
  textSecondary: "#718096",
  background: "#F9F9F6",
};

const cardVariants = {
  hover: {
    scale: 1.05,
    boxShadow: `0 8px 20px ${colors.accent}AA`,
    transition: { duration: 0.3 },
  },
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const DiscoverNeighborhood = () => {
  const neighborhoods = [
    {
      title: "Family-Friendly",
      desc: "Nearby parks, schools, and safe surroundings perfect for families.",
      icon: FaChild,
      iconColor: colors.primary,
    },
    {
      title: "Urban Vibes",
      desc: "Lively areas with cafes, gyms, and coworking spaces.",
      icon: FaCity,
      iconColor: colors.accent,
    },
    {
      title: "Nature Retreats",
      desc: "Peaceful and green neighborhoods with scenic beauty.",
      icon: FaTree,
      iconColor: colors.primary,
    },
  ];

  return (
    <section
      className="py-16 px-4 "
      style={{ backgroundColor: colors.background }}
    >
      <h2
        className="text-4xl font-bold text-center mb-12"
        style={{ color: colors.textPrimary }}
      >
        Discover the Neighborhood
      </h2>

      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
        {neighborhoods.map(({ title, desc, icon: Icon, iconColor }, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-8 shadow-md cursor-pointer flex flex-col items-center text-center"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: i * 0.15 }}
          >
            <Icon
              className="mb-6"
              size={48}
              style={{ color: iconColor }}
              aria-hidden="true"
            />
            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: colors.textPrimary }}
            >
              {title}
            </h3>
            <p
              className="text-gray-600"
              style={{ color: colors.textSecondary }}
            >
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverNeighborhood;
