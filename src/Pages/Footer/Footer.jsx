import {
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    about: [
      { label: "Our Story", href: "#about" },
      { label: "Team", href: "#team" },
      { label: "Vision & Mission", href: "#about" },
      { label: "Join Us", href: "#contact" },
    ],
    resources: [
      { label: "Events", href: "#events" },
      { label: "Blog", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "FAQs", href: "#" },
    ],
    connect: [
      { label: "Contact", href: "#contact" },
      { label: "Support", href: "#" },
      { label: "Feedback", href: "#" },
      { label: "Partners", href: "#" },
    ],
  };
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];
  return (
    <footer className="bg-neutral-950/70 border-t border-neutral-800 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto md:px-6 lg:px-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              className="inline-flex items-center gap-2 mb-6 group"
            >
              <span className="font-display font-bold text-2xl text-white">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  ENCIDE
                </span>{" "}
                Club
              </span>
            </a>
            <p className="text-neutral-400 max-w-sm mb-8 leading-relaxed">
              Building tomorrow's leaders through innovation, collaboration, and
              a passion for excellence. Join our community today.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)]"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">
              About
            </h4>
            <ul className="space-y-4">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-violet-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">
              Resources
            </h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-violet-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">
              Connect
            </h4>
            <ul className="space-y-4">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-violet-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {currentYear} Encide club. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm flex items-center gap-1.5 group">
              Made by encide web team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
