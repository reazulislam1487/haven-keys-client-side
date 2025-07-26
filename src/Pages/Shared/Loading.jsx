import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const colors = ["#3B82F6", "#0EA5E9", "#FACC15"]; // Primary Blue, Sky Blue, Accent Yellow

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F1F5F9]">
      <div className="flex space-x-4 mb-4">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            className="w-6 h-6 rounded-full shadow-xl"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}90`, // soft glow
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <motion.p
        className="text-[#1E293B] text-lg font-semibold"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;
