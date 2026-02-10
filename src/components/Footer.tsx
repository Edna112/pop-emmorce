import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#FF6B35] mb-4">YorkieCharm</h3>
            <p className="text-gray-400 mb-4">
              Find your perfect Yorkie puppy from trusted breeders. We connect loving families with healthy, happy Yorkies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/puppies" className="hover:text-[#FF6B35] transition-colors">
                  Browse Puppies
                </Link>
              </li>
              <li>
                <Link href="/breeds" className="hover:text-[#FF6B35] transition-colors">
                  The Yorkie Breed
                </Link>
              </li>
              <li>
                <Link href="/breeders" className="hover:text-[#FF6B35] transition-colors">
                  Find Breeders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF6B35] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-[#FF6B35] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FF6B35] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#FF6B35] transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="hover:text-[#FF6B35] transition-colors">
                  Health Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-[#FF6B35] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FF6B35] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/breeder-agreement" className="hover:text-[#FF6B35] transition-colors">
                  Breeder Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} YorkieCharm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
