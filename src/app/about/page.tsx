import { Heart, Shield, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Yorkie</h1>
          <p className="text-gray-600 text-lg mb-12">
            Connecting loving families with healthy, happy Yorkie puppies from trusted breeders nationwide.
          </p>

          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Yorkie, we believe every family deserves to find their perfect Yorkie companion. 
              Our mission is to make the process of finding and bringing home a puppy safe, transparent, 
              and enjoyable. We work exclusively with verified, responsible breeders who prioritize the 
              health and well-being of their puppies.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We're committed to ensuring that every puppy finds a loving home and every family finds 
              the perfect match. Our platform provides comprehensive information, health guarantees, 
              and ongoing support throughout your puppy's life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Health Guarantee</h3>
              <p className="text-gray-600">
                All puppies come with comprehensive health guarantees and veterinary records. 
                We ensure every puppy is healthy before they go to their new home.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Breeders</h3>
              <p className="text-gray-600">
                We carefully vet all breeders on our platform to ensure they meet our high standards 
                for animal care and breeding practices.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Our team reviews every listing to ensure accuracy and quality. We're committed to 
                providing the best experience for both families and breeders.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="bg-[#FF6B35] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lifetime Support</h3>
              <p className="text-gray-600">
                We're here for you throughout your puppy's life. From finding the right match to 
                ongoing care advice, we're your partner in pet ownership.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Yorkie was founded with a simple goal: to make finding the perfect Yorkie easier, 
              safer, and more transparent. We recognized that the process of finding a puppy could 
              be overwhelming, with concerns about breeder reliability, puppy health, and the overall 
              experience.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we've helped thousands of families find their perfect companions. We continue 
              to grow our network of trusted breeders while maintaining our commitment to quality, 
              transparency, and the well-being of every puppy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
