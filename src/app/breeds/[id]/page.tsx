import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Calendar, Activity, Scissors } from "lucide-react";
import { breeds } from "@/data/breeds";
import { puppies } from "@/data/puppies";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return breeds.map((b) => ({ id: b.id }));
}

export default async function BreedDetail({ params }: PageProps) {
  const { id } = await params;
  const breed = breeds.find((b) => b.id === id);

  if (!breed) {
    notFound();
  }

  const breedPuppies = puppies.filter((p) => p.breedId === breed.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/breeds" className="text-[#FF6B35] hover:underline mb-4 inline-block">
          <ArrowLeft className="w-4 h-4 inline mr-2" />
          Back to Breed
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative h-96">
              <Image
                src={breed.image}
                alt={breed.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">{breed.name}</h1>
              <p className="text-gray-700 text-lg mb-6">{breed.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-[#FF6B35]" />
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-semibold">{breed.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#FF6B35]" />
                  <div>
                    <p className="text-sm text-gray-500">Life Span</p>
                    <p className="font-semibold">{breed.lifeSpan}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-[#FF6B35]" />
                  <div>
                    <p className="text-sm text-gray-500">Exercise Needs</p>
                    <p className="font-semibold">{breed.exerciseNeeds}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Scissors className="w-5 h-5 text-[#FF6B35]" />
                  <div>
                    <p className="text-sm text-gray-500">Grooming Needs</p>
                    <p className="font-semibold">{breed.groomingNeeds}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Temperament</h3>
                <div className="flex flex-wrap gap-2">
                  {breed.temperament.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {breedPuppies.length > 0 && (
                <Link
                  href={`/puppies?breed=${id}`}
                  className="inline-block bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
                >
                  View {breedPuppies.length} Available Puppies
                </Link>
              )}
            </div>
          </div>
        </div>

        {breedPuppies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Available {breed.name} Puppies</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {breedPuppies.slice(0, 4).map((puppy) => (
                <Link key={puppy.id} href={`/puppies/${puppy.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="relative h-48">
                      <Image
                        src={puppy.images[0]}
                        alt={puppy.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{puppy.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{puppy.age} weeks old</p>
                      <p className="text-[#FF6B35] font-bold">${puppy.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
