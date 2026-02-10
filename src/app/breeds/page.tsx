"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart, Sparkles, Home, Shield, ArrowRight, PawPrint, Star } from "lucide-react";
import { breeds } from "@/data/breeds";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const whyYorkies = [
  {
    icon: Heart,
    title: "Big hearts, small size",
    description: "Yorkies pack endless love into a compact, easy-to-cuddle package.",
  },
  {
    icon: Sparkles,
    title: "Hypoallergenic coat",
    description: "Their soft, low-shedding coat is gentle on allergies and easy to love.",
  },
  {
    icon: Home,
    title: "Perfect for any space",
    description: "Apartment or house—they adapt happily and don’t need a yard.",
  },
  {
    icon: Shield,
    title: "Health & longevity",
    description: "With proper care, Yorkies often enjoy 12–15 years of companionship.",
  },
];

export default function BreedsPage() {
  const breed = breeds[0];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #fff5f2 0%, #ffe8e0 40%, #ffddd2 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#FF6B35] font-semibold uppercase tracking-wider text-sm mb-3">
              Our breed
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              The Yorkie Breed
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We specialize in Yorkies—intelligent, affectionate companions perfect for your family.
            </p>
          </motion.div>
          <motion.div
            className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={breed.image}
              alt={breed.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 448px"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 50%)",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Why Yorkies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why choose a Yorkie?
          </motion.h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
            A few reasons families fall in love with this breed
          </p>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {whyYorkies.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow bg-gray-50/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Temperament & breed card */}
      <section
        className="py-16"
        style={{
          background: "linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Personality at a glance</h2>
              <p className="text-gray-600">Traits that make Yorkies so beloved</p>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {breed.temperament.map((trait) => (
                <motion.span
                  key={trait}
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200 text-gray-700 font-medium text-sm"
                >
                  <Star className="w-4 h-4 text-[#FF6B35]" />
                  {trait}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Link href={`/breeds/${breed.id}`} className="block w-full max-w-md">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-80">
                      <Image
                        src={breed.image}
                        alt={breed.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <PawPrint className="w-5 h-5 text-[#FF6B35]" />
                        <span className="text-sm font-medium text-[#FF6B35] uppercase tracking-wider">
                          Our breed
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{breed.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{breed.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span>Size: {breed.size}</span>
                        <span>Life span: {breed.lifeSpan}</span>
                        <span>Grooming: {breed.groomingNeeds}</span>
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-white"
        style={{
          background: "linear-gradient(135deg, #FF6B35 0%, #E55A2B 50%, #004E89 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to meet your Yorkie?
          </motion.h2>
          <motion.p
            className="text-white/90 text-lg mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Browse our available Yorkie puppies and find your perfect companion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="lg" className="bg-white text-[#FF6B35] hover:bg-gray-100 rounded-full px-8 shadow-lg">
              <Link href="/puppies" className="flex items-center gap-2">
                Browse Yorkie puppies
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
