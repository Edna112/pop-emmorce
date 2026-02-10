import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, Mail, Shield, Award, Users, Calendar } from "lucide-react";
import { puppies } from "@/data/puppies";

export default function BreedersPage() {
  // Extract unique breeders from puppies with their puppies
  const breedersMap = new Map();
  puppies.forEach((puppy) => {
    if (!breedersMap.has(puppy.breeder.id)) {
      breedersMap.set(puppy.breeder.id, {
        ...puppy.breeder,
        puppies: [],
      });
    }
    breedersMap.get(puppy.breeder.id).puppies.push(puppy);
  });

  const breeders = Array.from(breedersMap.values());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Trusted Breeders</h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Connect with verified, responsible breeders who prioritize puppy health and well-being. 
            All our breeders are carefully vetted and meet our high standards for animal care.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breeders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {breeders.map((breeder) => {
            const featuredPuppy = breeder.puppies[0];
            return (
              <div
                key={breeder.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Breeder Image/Featured Puppy */}
                {featuredPuppy && (
                  <Link href={`/puppies/${featuredPuppy.id}`}>
                    <div className="relative h-64">
                      <Image
                        src={featuredPuppy.images[0]}
                        alt={breeder.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold">{breeder.rating}</span>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="p-6">
                  {/* Breeder Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{breeder.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-5 h-5 text-green-500" />
                        <span className="text-xs text-gray-500">Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{breeder.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{breeder.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({breeder.puppies.length} {breeder.puppies.length === 1 ? 'puppy' : 'puppies'})
                      </span>
                    </div>
                  </div>

                  {/* Breeder Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b">
                    {breeder.yearsExperience && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Experience</p>
                          <p className="text-sm font-semibold">{breeder.yearsExperience} years</p>
                        </div>
                      </div>
                    )}
                    {breeder.totalPuppies && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Total Placed</p>
                          <p className="text-sm font-semibold">{breeder.totalPuppies}+</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 mb-4">
                    {breeder.phone && (
                      <a
                        href={`tel:${breeder.phone}`}
                        className="flex items-center space-x-2 text-[#FF6B35] hover:underline text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{breeder.phone}</span>
                      </a>
                    )}
                    {breeder.email && (
                      <a
                        href={`mailto:${breeder.email}`}
                        className="flex items-center space-x-2 text-[#FF6B35] hover:underline text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{breeder.email}</span>
                      </a>
                    )}
                  </div>

                  {/* Available Puppies */}
                  {breeder.puppies.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        {breeder.puppies.length} {breeder.puppies.length === 1 ? 'puppy' : 'puppies'} available
                      </p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {breeder.puppies.slice(0, 4).map((puppy: any) => (
                          <Link
                            key={puppy.id}
                            href={`/puppies/${puppy.id}`}
                            className="flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#FF6B35] transition-colors"
                          >
                            <Image
                              src={puppy.images[0]}
                              alt={puppy.name}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        ))}
                        {breeder.puppies.length > 4 && (
                          <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                            <span className="text-xs text-gray-500">+{breeder.puppies.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Link
                      href={`/puppies?breeder=${breeder.id}`}
                      className="block text-center bg-[#FF6B35] text-white py-2 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
                    >
                      View All Puppies
                    </Link>
                    <Link
                      href={`/breeders/${breeder.id}`}
                      className="block text-center border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose Our Breeders?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Verified & Trusted</h3>
                <p className="text-sm text-gray-600">
                  All breeders undergo a thorough verification process to ensure they meet our quality standards.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Health Guarantee</h3>
                <p className="text-sm text-gray-600">
                  Every puppy comes with comprehensive health guarantees and veterinary records.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-sm text-gray-600">
                  Our breeders provide ongoing support and guidance throughout your puppy's life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
