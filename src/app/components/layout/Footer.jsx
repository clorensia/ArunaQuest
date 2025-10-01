import { Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer({ onBlogClick }) {
  return (
    <footer className="bg-black/40 text-slate-400 border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white">ArunaQuest</h3>
            <p className="mt-2 max-w-xs">
              Choose your career path with confidence through interactive, true-to-life simulations.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white tracking-wider">Product</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help/Docs
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white tracking-wider">Company</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <button 
                  onClick={onBlogClick}
                  className="hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; 2025 ArunaQuest. All rights reserved.</p>
          
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/official.arunika_/" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}