"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Heart, Shield, Truck, Star, Quote, PawPrint, Sparkles } from "lucide-react";
import { puppies } from "@/data/puppies";
import { breeds } from "@/data/breeds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const featuredPuppies = puppies.slice(0, 4);
  const featuredBreeds = breeds;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920"
            alt="Yorkie puppies"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(255,107,53,0.25) 50%, rgba(0,78,137,0.4) 100%)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Find Your Perfect Yorkie
            </h1>
            <p className="text-xl mb-8 text-white drop-shadow-md">
              Connect with trusted breeders and bring home a healthy, happy Yorkie puppy.
              Adorable Yorkies available from verified breeders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full bg-white text-[#FF6B35] hover:bg-gray-100 shadow-lg px-8">
                <Link href="/puppies" className="flex items-center gap-2">
                  <span>Browse Puppies</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-white text-white hover:bg-white/20 shadow-lg px-8">
                <Link href="/breeds" className="flex items-center gap-2">
                  Explore Breeds
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { icon: Shield, title: "Health Guarantee", desc: "All puppies come with a comprehensive health guarantee" },
              { icon: Truck, title: "Safe Delivery", desc: "Nationwide shipping with professional pet transport" },
              { icon: Star, title: "Trusted Breeders", desc: "Verified breeders with excellent ratings" },
              { icon: Heart, title: "Lifetime Support", desc: "We're here to help throughout your puppy's life" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={item} className="text-center">
                <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Puppies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Puppies</h2>
            <Link href="/puppies" className="text-[#FF6B35] font-semibold hover:underline flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {featuredPuppies.map((puppy) => (
              <motion.div key={puppy.id} variants={item} className="h-full">
                <Link href={`/puppies/${puppy.id}`} className="block h-full">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border-0 shadow-md h-full flex flex-col">
                    <div className="relative h-64 shrink-0">
                      <Image
                        src={puppy.images[0]}
                        alt={puppy.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                        <Heart className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col min-h-[140px]">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{puppy.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-1">{puppy.breed}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[#FF6B35] font-bold text-xl">
                          ${puppy.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm">{puppy.age} weeks</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-1">{puppy.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Yorkie Breed */}
      <section
        className="py-20 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #fff5f2 0%, #ffe8e0 30%, #f3f4f6 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#FF6B35] font-semibold uppercase tracking-wider text-sm mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Our breed
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">The Yorkie Breed</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Intelligent, affectionate companions with a hypoallergenic coat—perfect for families and individuals alike.
            </p>
          </motion.div>

          {featuredBreeds.map((breed) => (
            <motion.div
              key={breed.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={container}
              className="max-w-4xl mx-auto"
            >
              <Link href={`/breeds/${breed.id}`} className="block group">
                <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-80 md:min-h-[320px] shrink-0">
                      <Image
                        src={breed.image}
                        alt={breed.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(to right, transparent 40%, rgba(255,255,255,0.6) 100%)",
                        }}
                      />
                    </div>
                    <CardContent className="p-6 md:p-8 flex flex-col justify-center bg-white">
                      <div className="flex items-center gap-2 mb-3">
                        <PawPrint className="w-5 h-5 text-[#FF6B35]" />
                        <span className="text-sm font-medium text-[#FF6B35] uppercase tracking-wider">
                          Yorkie
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{breed.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{breed.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {breed.temperament.slice(0, 4).map((trait) => (
                          <span
                            key={trait}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-medium"
                          >
                            <Star className="w-3 h-3" />
                            {trait}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span>Size: {breed.size}</span>
                        <span>Life span: {breed.lifeSpan}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-[#FF6B35] font-semibold group-hover:gap-3 transition-all">
                        Learn more about Yorkies
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" className="rounded-full border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white">
              <Link href="/breeds" className="flex items-center gap-2">
                Explore the breed
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">
              Real stories from happy families who found their perfect puppy
            </p>
          </div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { quote: "We found our perfect Yorkie through Yorkie. The process was smooth, and the breeder was incredibly helpful. Chloe has been a joy to our family!", name: "Sarah Mitchell", loc: "California", initials: "SM", bg: "bg-[#FF6B35]" },
              { quote: "Amazing experience! The health guarantee gave us peace of mind, and our Yorkie Bella is healthy and happy. Highly recommend Yorkie!", name: "James Davis", loc: "New York", initials: "JD", bg: "bg-[#004E89]" },
              { quote: "The search filters made it so easy to find exactly what we were looking for. Our Yorkie Charlie is perfect, and the breeder support was excellent!", name: "Emily Wilson", loc: "Texas", initials: "EW", bg: "bg-green-500" },
              { quote: "From browsing to bringing home our Yorkie Luna, everything was seamless. The verified breeders and health guarantees made us feel confident in our choice.", name: "Michael Rodriguez", loc: "Ohio", initials: "MR", bg: "bg-purple-500" },
            ].map((review) => (
              <motion.div key={review.name} variants={item} className="h-full">
                <Card className="bg-gray-50 border-0 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col min-h-[260px]">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#FF6B35] mb-3 shrink-0" />
                    <p className="text-gray-700 mb-4 italic line-clamp-4 flex-1">{review.quote}</p>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${review.bg} rounded-full flex items-center justify-center text-white font-bold`}>
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.loc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 text-white"
        style={{
          background: "linear-gradient(135deg, #004E89 0%, #003d6b 40%, #002a4d 100%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Puppy?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of happy families who found their furry friend on Yorkie
          </p>
          <Button asChild size="lg" className="bg-[#FF6B35] hover:bg-[#E55A2B] rounded-full px-8">
            <Link href="/puppies" className="flex items-center gap-2">
              <span>Start Browsing</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
