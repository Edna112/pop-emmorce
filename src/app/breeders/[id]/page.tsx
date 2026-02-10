import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, Mail, Shield, Award, Users, Calendar, ArrowLeft } from "lucide-react";
import { puppies } from "@/data/puppies";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BreederDetail({ params }: PageProps) {
  const { id } = await params;
  const breederPuppies = puppies.filter((p) => p.breeder.id === id);
  
  if (breederPuppies.length === 0) {
    notFound();
  }

  const breeder = breederPuppies[0].breeder;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/breeders" className="text-[#FF6B35] hover:underline mb-4 inline-flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Breeders</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{breeder.name}</h1>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span>{breeder.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-4">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl font-bold">{breeder.rating}</span>
                    <span className="text-gray-500">({breederPuppies.length} puppies)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Verified</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {breeder.yearsExperience && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-[#FF6B35]" />
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-semibold">{breeder.yearsExperience} years</p>
                    </div>
                  </div>
                )}
                {breeder.totalPuppies && (
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-[#FF6B35]" />
                    <div>
                      <p className="text-sm text-gray-500">Total Placed</p>
                      <p className="font-semibold">{breeder.totalPuppies}+ puppies</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {breeder.phone && (
                  <a
                    href={`tel:${breeder.phone}`}
                    className="flex items-center space-x-3 text-[#FF6B35] hover:underline"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{breeder.phone}</span>
                  </a>
                )}
                {breeder.email && (
                  <a
                    href={`mailto:${breeder.email}`}
                    className="flex items-center space-x-3 text-[#FF6B35] hover:underline"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{breeder.email}</span>
                  </a>
                )}
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold mb-4">About This Breeder</h2>
                <p className="text-gray-700 leading-relaxed">
                  {breeder.name} is a verified and trusted breeder on Yorkie. With {breeder.yearsExperience || 'many'} years of experience 
                  and {breeder.totalPuppies || breederPuppies.length}+ puppies successfully placed in loving homes, they are committed to 
                  breeding healthy, well-socialized puppies. All puppies come with comprehensive health guarantees and are raised in 
                  loving, family environments.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Contact Breeder</h3>
                <button className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors mb-3">
                  Send Message
                </button>
                <button className="w-full border-2 border-[#FF6B35] text-[#FF6B35] py-3 rounded-lg font-semibold hover:bg-[#FF6B35] hover:text-white transition-colors">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Puppies */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Available Puppies ({breederPuppies.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {breederPuppies.map((puppy) => (
              <Link key={puppy.id} href={`/puppies/${puppy.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="relative h-64">
                    <Image
                      src={puppy.images[0]}
                      alt={puppy.name}
                      fill
                      className="object-cover"
                    />
                    {!puppy.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded">Sold</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{puppy.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{puppy.breed}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#FF6B35] font-bold text-xl">
                        ${puppy.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm">{puppy.age} weeks</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
