"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart, X, SlidersHorizontal, Phone } from "lucide-react";
import { puppies } from "@/data/puppies";
import { breeds } from "@/data/breeds";
import { FilterOptions } from "@/types/puppy";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function BrowsePuppiesContent() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Read breed_slug from URL params (matching PuppySpot format)
  useEffect(() => {
    const breedSlug = searchParams.get("breed_slug");
    if (breedSlug) {
      // Map breed slug to breedId
      const breedMap: Record<string, string> = {
        "yorkiepoo": "yorkie-poo",
        "yorkie-poo": "yorkie-poo",
        "golden-retriever": "golden-retriever",
        "french-bulldog": "french-bulldog",
        "labrador-retriever": "labrador-retriever",
        "german-shepherd": "german-shepherd",
        "bulldog": "bulldog",
        "beagle": "beagle",
        "poodle": "poodle",
      };
      const breedId = breedMap[breedSlug.toLowerCase()] || breedSlug;
      setFilters((prev) => ({ ...prev, breed: breedId }));
    }
  }, [searchParams]);

  const filteredPuppies = useMemo(() => {
    return puppies.filter((puppy) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !puppy.name.toLowerCase().includes(query) &&
          !puppy.breed.toLowerCase().includes(query) &&
          !puppy.location.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Breed filter
      if (filters.breed && puppy.breedId !== filters.breed) {
        return false;
      }

      // Price filter
      if (filters.minPrice && puppy.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && puppy.price > filters.maxPrice) {
        return false;
      }

      // Gender filter
      if (filters.gender && puppy.gender !== filters.gender) {
        return false;
      }

      // Location filter
      if (filters.location && !puppy.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Age filter
      if (filters.age) {
        if (filters.age === "young" && puppy.age > 8) return false;
        if (filters.age === "medium" && (puppy.age < 9 || puppy.age > 12)) return false;
        if (filters.age === "older" && puppy.age < 13) return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const clearFilters = () => {
    setFilters({});
    setSearchQuery("");
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || searchQuery.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Puppies</h1>
          <p className="text-gray-600">Find your perfect companion from {puppies.length} available puppies</p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="p-4 mb-6 border-0 shadow-md">
          <>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by name, breed, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2 text-gray-600">
                  <X className="w-5 h-5" />
                  Clear
                </Button>
              )}
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Breed</label>
                <select
                  value={filters.breed || ""}
                  onChange={(e) => setFilters({ ...filters, breed: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="">All Breeds</option>
                  {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  value={filters.gender || ""}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value as "Male" | "Female" | undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ""}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ""}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  type="text"
                  placeholder="City, State"
                  value={filters.location || ""}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value || undefined })}
                />
              </div>
            </div>
            )}
          </>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredPuppies.length}</span> puppies
          </p>
        </div>

        {/* Puppy Grid */}
        {filteredPuppies.length > 0 ? (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05, delayChildren: 0.05 },
              },
            }}
          >
            {filteredPuppies.map((puppy) => (
              <motion.div
                key={puppy.id}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="h-full"
              >
                <Link href={`/puppies/${puppy.id}`} className="block h-full">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border-0 shadow-md h-full flex flex-col">
                    <div className="relative h-64 shrink-0">
                      <Image
                        src={puppy.images[0]}
                        alt={puppy.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100">
                        <Heart className="w-5 h-5 text-gray-400" />
                      </div>
                      {!puppy.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded">Sold</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col min-h-[140px]">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{puppy.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-1">{puppy.breed}</p>
                      <div className="flex items-center justify-between mb-2 mt-auto">
                        <span className="text-[#FF6B35] font-bold text-xl">
                          ${puppy.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm">{puppy.age} weeks</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 line-clamp-1">{puppy.gender}</span>
                        <span className="text-gray-500 line-clamp-1">{puppy.location}</span>
                      </div>
                      <a
                        href="tel:+12083155967"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 flex items-center gap-1.5 text-sm text-[#FF6B35] hover:underline"
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>Breeder: (208) 315-5967</span>
                      </a>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="p-12 text-center border-0 shadow-md">
            <p className="text-gray-600 text-lg">No puppies found matching your criteria.</p>
            <Button variant="link" onClick={clearFilters} className="mt-4 text-[#FF6B35]">
              Clear filters and try again
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function BrowsePuppies() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      }
    >
      <BrowsePuppiesContent />
    </Suspense>
  );
}
