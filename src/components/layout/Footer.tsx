import { Link } from "react-router-dom";
import ToastMascot from "../ui/ToastMascot";

const footerLinks = {
  Product: [
    { label: "Builder", path: "/builder" },
    { label: "Examples", path: "/examples" },
    { label: "Changelog", path: "/changelog" },
  ],
  Resources: [
    { label: "Documentation", path: "/docs" },
    { label: "npm", path: "https://www.npmjs.com" },
    { label: "GitHub", path: "https://github.com/Woopsyyy/ToastyyyWebsite" },
  ],
  Legal: [
    { label: "MIT License", path: "#" },
    { label: "Privacy Policy", path: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-surface-2/40 pt-20 pb-12 relative overflow-hidden">
      <div className="container-tight relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 mb-4 flex items-center justify-center">
            <ToastMascot size={64} mood="happy" interactive={true} />
          </div>
          <Link
            to="/"
            className="font-extrabold text-2xl tracking-tight text-text"
          >
            Toastyyy
          </Link>
          <p className="mt-4 text-sm text-text-2 max-w-md text-balance leading-relaxed">
            The premium motion-first toast notification ecosystem for modern
            React platforms. Handcrafted for elite frontend builders.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full max-w-2xl justify-items-center mb-16 pt-8 border-t border-border/50">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div
              key={category}
              className="flex flex-col gap-4 text-center md:text-left"
            >
              <h4 className="font-bold text-text text-sm tracking-wider uppercase">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.path.startsWith("/") ? (
                      <Link
                        to={link.path}
                        className="text-sm font-semibold text-text-2 hover:text-text transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.path}
                        className="text-sm font-semibold text-text-2 hover:text-text transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 w-full text-xs font-semibold text-text-3">
          <p>
            © {new Date().getFullYear()} Toastyyy. Handcrafted with spring
            motion.
          </p>
          <div className="flex gap-2 items-center bg-white border border-border px-3.5 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Systems fully operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
