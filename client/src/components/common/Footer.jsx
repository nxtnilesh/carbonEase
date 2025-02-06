import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-lg font-semibold">About CarbonEase</h2>
          <p className="text-sm text-gray-300 mt-3">
            A transparent platform for trading carbon credits and supporting renewable energy.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-green-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/calculator" className="hover:text-green-400 transition">
                Carbon Calculator
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-green-400 transition">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h2 className="text-lg font-semibold">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:support@carbonease.com" className="hover:text-green-400 transition">
                support@carbonease.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>+91 8938-2567-890</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>123 Green Street, Eco City</span>
            </li>
          </ul>
        </div>

        {/* Column 4 - Social Media */}
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex mt-3 space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center text-gray-300 text-sm border-t border-green-800 pt-6">
        © 2024 CarbonEase. All rights reserved.
      </div>
    </footer>
  );
}
