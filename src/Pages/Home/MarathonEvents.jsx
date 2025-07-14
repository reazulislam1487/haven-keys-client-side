import React from "react";
import {
  FaRunning,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const marathonEvents = [
  {
    id: 1,
    name: "Dhaka Mega Marathon",
    date: "July 15, 2025",
    location: "Dhaka, Bangladesh",
    distance: "25K",
    registrationDeadline: "June 30, 2025",
  },
  {
    id: 2,
    name: "Cox's Bazar Beach Run",
    date: "August 5, 2025",
    location: "Cox's Bazar, Bangladesh",
    distance: "10K",
    registrationDeadline: "July 20, 2025",
  },
  {
    id: 3,
    name: "Sylhet Hill Challenge",
    date: "September 10, 2025",
    location: "Sylhet, Bangladesh",
    distance: "3K",
    registrationDeadline: "August 25, 2025",
  },
  {
    id: 4,
    name: "Barisal River Dash",
    date: "October 1, 2025",
    location: "Barisal, Bangladesh",
    distance: "10K",
    registrationDeadline: "September 10, 2025",
  },
  {
    id: 5,
    name: "Rajshahi Heritage Sprint",
    date: "October 25, 2025",
    location: "Rajshahi, Bangladesh",
    distance: "25K",
    registrationDeadline: "October 5, 2025",
  },
  {
    id: 6,
    name: "Khulna Urban 3K",
    date: "November 12, 2025",
    location: "Khulna, Bangladesh",
    distance: "3K",
    registrationDeadline: "October 30, 2025",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const MarathonEvents = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 text-gray-800">
      {/* Section Title */}
      <div className="flex items-center justify-center mb-14 gap-4">
        <FaRunning className="text-blue-600 hidden md:block text-4xl animate-bounce" />
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800"
        >
          Upcoming <span className="text-blue-600">Marathon Events</span>
        </motion.h2>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {marathonEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="group relative p-6 rounded-3xl border border-transparent bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={cardVariants}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-200/40 via-blue-100/30 to-white opacity-10 z-0"></div>

            <div className="relative z-10 space-y-3">
              <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-900 transition">
                {event.name}
              </h3>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaCalendarAlt className="text-blue-500" />
                <span className="font-medium">{event.date}</span>
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-blue-500" />
                {event.location}
              </p>

              <p className="text-sm">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Distance: {event.distance}
                </span>
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaClock className="text-blue-400" />
                Register by:{" "}
                <span className="font-medium">
                  {event.registrationDeadline}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MarathonEvents;
