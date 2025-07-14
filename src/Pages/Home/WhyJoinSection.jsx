import React from "react";
import { motion } from "framer-motion";

const WhyJoinSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const cards = [
    {
      icon: "https://i.ibb.co/zhBTGC5y/runner-standing-track-marking-high-quality-photo-361878986.jpg",
      title: "Track Events",
      description:
        "Stay updated with upcoming marathons and register directly from our platform.",
    },
    {
      icon: "https://i.ibb.co/6dprnGZ/start-word-written-athletics-track-athlete-woman-runner-sunset-challenge-change-planning-health-goal.jpg",
      title: "Connect with Runners",
      description:
        "Share experiences, training tips, and motivation with a like-minded community.",
    },
    {
      icon: "https://i.ibb.co/ksH7GwWT/run-marathon-race.jpg",
      title: "Earn Achievements",
      description:
        "Track your progress, unlock digital badges, and celebrate milestones along the way.",
    },
  ];

  return (
    <section className="text-gray-800 px-4 py-20 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className=" text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          Why Join <span className="text-blue-600">Marathons Zone?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Whether you're a beginner or a seasoned marathoner, our platform is
          built to support your entire running journey.
        </motion.p>

        <div className="grid gap-10 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              custom={index}
              variants={cardVariants}
              viewport={{ once: true }}
              className="group relative backdrop-blur-sm bg-white/80 border border-blue-100 shadow-lg hover:shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
            >
              {/* Decorative background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent opacity-20 z-0"></div>

              <div className="relative z-10 p-6">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-40 object-cover rounded-2xl mb-5 shadow-md group-hover:brightness-110 transition duration-300"
                />
                <h3 className="text-xl font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
