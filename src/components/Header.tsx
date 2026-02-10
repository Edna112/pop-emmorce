"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white shadow-md"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-[#FF6B35]">YorkieCharm</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/puppies" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Browse Puppies
            </Link>
            <Link href="/breeds" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Breed
            </Link>
            <Link href="/breeders" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Breeders
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
              <Input
                type="text"
                placeholder="Search breeds, puppies..."
                className="w-full pl-10 rounded-full border-input"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="hidden md:block p-2 text-gray-700 hover:text-[#FF6B35] transition-colors">
              <Heart className="w-6 h-6" />
            </Link>
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[#FF6B35] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FF6B35] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="hidden md:flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-[#FF6B35] transition-colors">
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-4">
              <Link href="/puppies" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                Browse Puppies
              </Link>
<Link href="/breeds" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
              Breed
            </Link>
              <Link href="/breeders" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                Breeders
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">
                Contact
              </Link>
              <Link href="/favorites" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Favorites</span>
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            </nav>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
