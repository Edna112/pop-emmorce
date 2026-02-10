"use client";

import { useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Star, Send, User, MessageSquare } from "lucide-react";
import { puppies } from "@/data/puppies";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ContactBreeder({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const puppy = puppies.find((p) => p.id === id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!puppy) {
    notFound();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("Your message has been sent to the breeder! They will contact you soon.");
    router.push(`/puppies/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href={`/puppies/${id}`}
          className="text-[#FF6B35] hover:underline mb-6 inline-flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Puppy Details</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Contact Breeder</h1>
          <p className="text-gray-600 mb-8">
            Get in touch with {puppy.breeder.name} about {puppy.name}
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Puppy & Breeder Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="font-semibold text-lg mb-4">About This Puppy</h2>
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={puppy.images[0]}
                    alt={puppy.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{puppy.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{puppy.breed}</p>
                <p className="text-[#FF6B35] font-bold text-xl mb-4">
                  ${puppy.price.toLocaleString()}
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{puppy.age} weeks old • {puppy.gender}</p>
                  <p>{puppy.location}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-semibold text-lg mb-4">Breeder Information</h2>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{puppy.breeder.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{puppy.breeder.rating}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{puppy.breeder.location}</span>
                  </div>
                  {puppy.breeder.phone && (
                    <a
                      href={`tel:${puppy.breeder.phone}`}
                      className="flex items-center space-x-2 text-[#FF6B35] hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{puppy.breeder.phone}</span>
                    </a>
                  )}
                  {puppy.breeder.email && (
                    <a
                      href={`mailto:${puppy.breeder.email}`}
                      className="flex items-center space-x-2 text-[#FF6B35] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{puppy.breeder.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Tell the breeder about yourself and why you're interested in this puppy..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF6B35] text-white py-4 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  By submitting this form, you agree to be contacted by the breeder. 
                  Your information will be shared with {puppy.breeder.name}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
