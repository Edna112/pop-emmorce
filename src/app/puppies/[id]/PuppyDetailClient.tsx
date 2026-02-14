"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Calendar, Shield, Check, Share2, Download } from "lucide-react";
import { puppies } from "@/data/puppies";

interface Props {
  id: string;
}

export default function PuppyDetailClient({ id }: Props) {
  const puppy = puppies.find((p) => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionData, setQuestionData] = useState({
    name: "",
    email: "",
    question: "",
  });

  if (!puppy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#FF6B35]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/puppies" className="hover:text-[#FF6B35]">Puppies for Sale</Link>
            <span className="mx-2">/</span>
            <Link href={`/breeds/${puppy.breedId}`} className="hover:text-[#FF6B35]">{puppy.breed}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{puppy.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images Gallery */}
          <div className="lg:col-span-2">
            {/* Main Image Display */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={puppy.images[selectedImageIndex]}
                  alt={puppy.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {puppy.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-[#FF6B35]' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${puppy.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Puppy Information Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">About {puppy.name}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{puppy.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Puppy Details</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Breed:</span>
                      <span className="font-medium">{puppy.breed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{puppy.age} weeks old</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{puppy.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium">{puppy.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{puppy.weight} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{puppy.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Health & Care</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Health Guarantee</span>
                        <p className="text-sm text-gray-600">Comprehensive health guarantee included</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Microchipped</span>
                        <p className="text-sm text-gray-600">Puppy is microchipped for identification</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Vaccinations</span>
                        <p className="text-sm text-gray-600">{puppy.vaccinations.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase/Contact Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-1">{puppy.name}</h1>
                  <p className="text-gray-600 mb-2">{puppy.breed}</p>
                  {puppy.puppyId && (
                    <p className="text-sm text-gray-500">Puppy ID: {puppy.puppyId}</p>
                  )}
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b">
                <div className="text-4xl font-bold text-[#FF6B35] mb-2">
                  ${puppy.price.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Price includes health guarantee</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{puppy.age} weeks old</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <span className="w-5 h-5 flex items-center justify-center text-gray-400">
                    {puppy.gender === "Male" ? "♂" : "♀"}
                  </span>
                  <span>{puppy.gender}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>{puppy.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {puppy.available ? (
                <>
                  <Link
                    href={`/puppies/${id}/contact`}
                    className="block w-full bg-[#FF6B35] text-white py-4 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors mb-3 text-center"
                  >
                    Contact Breeder
                  </Link>
                  <button
                    onClick={() => setShowQuestionForm(!showQuestionForm)}
                    className="w-full border-2 border-[#FF6B35] text-[#FF6B35] py-3 rounded-lg font-semibold hover:bg-[#FF6B35] hover:text-white transition-colors mb-4"
                  >
                    Ask a Question
                  </button>
                </>
              ) : (
                <button className="w-full bg-gray-400 text-white py-4 rounded-lg font-semibold cursor-not-allowed mb-4">
                  No Longer Available
                </button>
              )}

              {/* Share Options */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6B35] transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6B35] transition-colors">
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Save</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Verified Breeder</span>
                </div>
                <p className="text-xs text-gray-500">
                  This breeder has been verified by Yorkie and meets our quality standards.
                </p>
              </div>

              {/* Question Form */}
              {showQuestionForm && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-4">Ask a Question</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert("Your question has been sent! The breeder will respond soon.");
                      setShowQuestionForm(false);
                      setQuestionData({ name: "", email: "", question: "" });
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={questionData.name}
                        onChange={(e) => setQuestionData({ ...questionData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={questionData.email}
                        onChange={(e) => setQuestionData({ ...questionData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Question <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={questionData.question}
                        onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Ask the breeder about this puppy..."
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-[#FF6B35] text-white py-2 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
                      >
                        Send Question
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowQuestionForm(false);
                          setQuestionData({ name: "", email: "", question: "" });
                        }}
                        className="px-4 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
