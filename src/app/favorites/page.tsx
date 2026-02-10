import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  // This would typically come from user's saved favorites
  const favorites: any[] = [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Favorites</h1>

        {favorites.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Favorites would be rendered here */}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-6">Start adding puppies to your favorites!</p>
            <Link
              href="/puppies"
              className="inline-flex items-center space-x-2 bg-[#FF6B35] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
            >
              <span>Browse Puppies</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
