import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import usePageTitle from "../../hooks/usePageTitle";

const ContactUs = () => {
  usePageTitle("Contact Us");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <div className="absolute -top-24 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-40 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M0,256L48,234.7C96,213,192,171,288,144C384,117,480,107,576,128C672,149,768,203,864,229.3C960,256,1056,256,1152,224C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0,192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 text-center mb-8">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              {
                icon: <FaMapMarkerAlt className="text-orange-500 text-3xl" />,
                label: "Address",
                value: "123 HavenKeys St., RunCity",
              },
              {
                icon: <FaPhoneAlt className="text-orange-500 text-3xl" />,
                label: "Phone",
                value: "+1 (234) 567-8901",
              },
              {
                icon: <FaEnvelope className="text-orange-500 text-3xl" />,
                label: "Email",
                value: "support@havenkeys.com",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.2 }}
                className="bg-white border border-gray-300 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4 space-x-4">
                  {item.icon}
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {item.label}
                  </h3>
                </div>
                <p className="text-gray-700">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className=" space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                // handle form submission
              }}
            >
              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
