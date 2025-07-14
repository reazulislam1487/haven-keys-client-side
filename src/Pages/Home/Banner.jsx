import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="hero bg-blue-50 lg:mt-10 min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem] lg:min-h-[32rem] px-4 ">
      <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 max-w-7xl mx-auto">
        <div className="flex-1 hidden md:flex flex-col space-y-6 sm:space-y-8 items-center lg:items-start">
          <motion.img
            src="https://i.ibb.co/0RjtNc6N/613569c08c96ecf954710544fb7692f5c36023458c7e8480300a6202586fa339-rimg-w1200-h675-dc2a341a-gmir-v-174.jpg"
            animate={{ y: [150, 100, 150] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="max-w-xs sm:max-w-sm border-blue-600 border-l-8 border-b-8 rounded-t-4xl rounded-br-4xl shadow-2xl"
            alt="Marathon image 1"
          />
          <motion.img
            src="https://i.ibb.co/j9y3KD60/marathon-runner-crosses-finish-line-closeup-view-foot-running-shoe-achievement-perseverance-sunny-da.jpg"
            animate={{ x: [150, 100, 150] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="max-w-xs sm:max-w-sm border-blue-600 border-l-8 border-b-8 rounded-t-4xl rounded-br-4xl shadow-2xl"
            alt="Marathon image 2"
          />
        </div>
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, transition: { duration: 2 } }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900"
          >
            Run with{" "}
            <motion.span
              animate={{
                color: [
                  "#2563EB", // blue-600
                  "#1E40AF", // blue-800
                  "#3B82F6", // blue-500
                  "#60A5FA", // blue-400
                  "#1E3A8A", // blue-900
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              heart
            </motion.span>
            , finish with pride
          </motion.h1>

          <p className="text-base sm:text-lg md:text-xl text-blue-800 leading-relaxed max-w-lg mx-auto lg:mx-0">
            The marathon is a celebration of perseverance, strength, and the
            unyielding spirit to go the distance — every step forward is a
            victory.
          </p>

          <Link to="/marathons">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition px-6 py-3 cursor-pointer rounded-lg"
            >
              Find Marathons
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
