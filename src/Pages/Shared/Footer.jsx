import React from "react";
import { FaRunning } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-blue-100 backdrop-blur-md text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaRunning className="text-blue-600 text-4xl animate-pulse" />

            <span className="text-2xl font-bold text-blue-700">
              Marathon Zone
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Empowering runners worldwide with tools, tips, and performance
            tracking for a better marathon experience.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                Event Planning
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                Training Guides
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                Runner Profiles
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                Tracking Tools
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-4">
            Useful Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="about-us" className="hover:text-blue-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/marathons" className="hover:text-blue-500 transition">
                Marathons
              </Link>
            </li>
            <li>
              <Link to="contact-us" className="hover:text-blue-500 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-blue-500 transition">
                Cookies Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-100 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Marathon Zone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
