import { Link } from 'react-router-dom';
import { Zap, Hash, ExternalLink } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Components', to: '/components' },
    { label: 'Templates', to: '/templates' },
    { label: 'Playground', to: '/playground' },
    { label: 'Themes', to: '/themes' },
    { label: 'Changelog', to: '/changelog' },
  ],
  Packages: [
    { label: 'toasty-graph-ui', href: 'https://npmjs.com' },
    { label: 'toasty-dashboard-ui', href: 'https://npmjs.com' },
    { label: 'toasty-charts', href: 'https://npmjs.com' },
    { label: 'toasty-motion-ui', href: 'https://npmjs.com' },
    { label: 'toasty-icons', href: 'https://npmjs.com' },
  ],
  Resources: [
    { label: 'Documentation', to: '/docs' },
    { label: 'Blog', to: '/blog' },
    { label: 'Showcase', to: '/showcase' },
    { label: 'Community', to: '/community' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #F59E0B)' }}>
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">Toasty</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              The premium graph, dashboard, and component ecosystem for React developers.
              Build stunning analytics UIs instantly.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://github.com/Woopsyyy/Toasty" target="_blank" rel="noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                <Hash className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{heading}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    {'to' in link ? (
                      <Link to={link.to}
                        className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} target="_blank" rel="noreferrer"
                        className="text-sm text-gray-600 hover:text-[#FF6B35] transition-colors flex items-center gap-1">
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Toasty. All rights reserved.</p>
          <p className="text-sm text-gray-400">
            Built with <span className="text-[#FF6B35]">♥</span> for React developers
          </p>
        </div>
      </div>
    </footer>
  );
}
