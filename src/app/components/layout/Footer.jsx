// File: src/app/components/layout/Footer.jsx
'use client'

import { useState } from 'react'
import { Twitter, Instagram, Linkedin } from 'lucide-react'
import UnderMaintenanceModal from '@/app/components/ui/UnderMaintenanceModal'

export default function Footer({ onBlogClick }) {
    const [maintenanceModal, setMaintenanceModal] = useState({ isOpen: false, feature: '' })

    const handleFeatureClick = (featureName) => {
        setMaintenanceModal({ isOpen: true, feature: featureName })
    }

    const handleSocialClick = (platform, url) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
        } else {
            handleFeatureClick(platform)
        }
    }

    return (
        <>
            <footer className="bg-black/40 text-slate-400 border-t border-white/10">
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold text-white">ArunaQuest</h3>
                            <p className="mt-2 max-w-xs">
                                Pilih jalur kariermu dengan percaya diri melalui simulasi interaktif yang terasa nyata.
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
                                    <button 
                                        onClick={() => handleFeatureClick("Help & Documentation")}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        Help/Docs
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white tracking-wider">Company</h4>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <button
                                        onClick={onBlogClick}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        Blog
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFeatureClick("Contact Us")}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        Contact Us
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFeatureClick("Privacy Policy")}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        Privacy Policy
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={() => handleFeatureClick("Terms of Service")}
                                        className="hover:text-white transition-colors text-left"
                                    >
                                        Terms of Service
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center">
                        <p>&copy; 2025 ArunaQuest. All rights reserved.</p>

                        <div className="flex space-x-6 mt-4 sm:mt-0">
                            <button 
                                onClick={() => handleSocialClick('Twitter', 'https://twitter.com')}
                                className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => handleSocialClick('Instagram', 'https://www.instagram.com/official.arunika_/')}
                                className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => handleSocialClick('LinkedIn', 'https://linkedin.com')}
                                className="hover:text-white transition-colors hover:scale-110 transform duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            <UnderMaintenanceModal 
                isOpen={maintenanceModal.isOpen}
                onClose={() => setMaintenanceModal({ isOpen: false, feature: '' })}
                feature={maintenanceModal.feature}
            />
        </>
    )
}