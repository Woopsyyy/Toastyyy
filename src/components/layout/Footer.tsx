import { Link } from 'react-router-dom'

const footerLinks = {
  Product: [
    { label: 'Builder', path: '/builder' },
    { label: 'Examples', path: '/examples' },
    { label: 'Changelog', path: '/changelog' },
  ],
  Resources: [
    { label: 'Documentation', path: '/docs' },
    { label: 'npm', path: '#' },
    { label: 'GitHub', path: '#' },
  ],
  Legal: [
    { label: 'MIT License', path: '#' },
    { label: 'Privacy', path: '#' },
  ]
}

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-surface-2/50 pt-16 pb-8">
      <div className="container-tight grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-bold text-xl tracking-tight text-text">
            Toastyyy
          </Link>
          <p className="mt-4 text-sm text-text-2 text-balance">
            A premium, motion-first toast notification library for modern React applications.
          </p>
        </div>
        
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category} className="flex flex-col gap-3">
            <h4 className="font-semibold text-text text-sm">{category}</h4>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.label}>
                  {link.path.startsWith('/') ? (
                    <Link to={link.path} className="text-sm text-text-3 hover:text-text transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.path} className="text-sm text-text-3 hover:text-text transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="container-tight pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-text-3">
          © {new Date().getFullYear()} Toastyyy. All rights reserved.
        </p>
        <div className="flex gap-4 items-center">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-3 font-medium">All systems operational</span>
        </div>
      </div>
    </footer>
  )
}
