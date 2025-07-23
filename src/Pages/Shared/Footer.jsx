import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-sm text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 flex items-center justify-center ">
              <img src="/logo.png" className="rounded-full" alt="" />
            </div>
            <span className="text-2xl font-bold">Havenkeys</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Havenkeys helps you find your perfect home with trusted listings,
            expert agents, and smooth transactions.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="#" className="hover:text-white transition">
                Property Listings
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Agent Support
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Home Valuation
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Legal Assistance
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/about-us" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/properties" className="hover:text-white transition">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="#" className="hover:text-white transition">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white transition">
                Cookies Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Havenkeys. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
