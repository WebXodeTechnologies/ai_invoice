import { Link } from "react-router-dom";

import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoLinkedin,
} from "react-icons/io";
import { FileText } from "lucide-react";

const FooterLink = ({ href, to, children }) => {
  const className =
    "text-gray-500 hover:text-gray-900 transition-colors duration-200";

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href || "#"} className={className}>
      {children}
    </a>
  );
};

const SocialLink = ({ href, children }) => {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-950 hover:text-white transition duration-300"
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-950 rounded-md flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                AI Invoice App
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              The simplest way to create, manage, and send professional invoices
              using AI.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-base  mb-4 text-white">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FooterLink href="#features">Features</FooterLink>
              </li>
              <li>
                <FooterLink href="#testimonials">Testimonials</FooterLink>
              </li>
              <li>
                <FooterLink href="#faq">FAQ</FooterLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-base  mb-4 text-white">
              Company
            </h3>
            <ul className="space-y-3 text-sm ">
              <li>
                <FooterLink to="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-base  mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 ">
            © 2026 AI Invoice App. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 ">
            Powered by{" "}
            <a href="https://webxode.com" target="_blank">
              Webxode Technologies ❤️
            </a>
          </p>
          <div className="flex items-center gap-3 text-black">
            <SocialLink
              href="https://www.instagram.com/webxode/"
              target="_blank"
            >
              <IoLogoInstagram className="w-5 h-5" />
            </SocialLink>
            <SocialLink href="https://github.com/ak220193" target="_blank">
              <IoLogoGithub className="w-5 h-5" />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/company/webxode-technologies/?viewAsMember=true"
              target="_blank"
            >
              <IoLogoLinkedin className="w-5 h-5" />
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/@Webxodetechnologies"
              target="_blank"
            >
              <IoLogoYoutube className="w-5 h-5" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
