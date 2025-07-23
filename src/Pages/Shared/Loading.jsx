import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const colors = ["#2F855A", "#F6C26B", "#2F855A"]; // Forest Green, Golden Sun, Forest Green

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex space-x-4">
        {colors.map((color, i) => (
          <motion.div
            key={i}
            className="w-5 h-5 rounded-full shadow-lg"
            style={{ backgroundColor: color }}
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
    </div>
  );
};

export default Loading;
