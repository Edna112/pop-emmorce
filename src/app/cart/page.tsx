"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { puppies } from "@/data/puppies";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { puppyId: "1", quantity: 1 },
    { puppyId: "2", quantity: 1 },
  ]);

  const cartPuppies = cartItems.map((item) => {
    const puppy = puppies.find((p) => p.id === item.puppyId);
    return puppy ? { ...puppy, quantity: item.quantity } : null;
  }).filter(Boolean) as Array<typeof puppies[0] & { quantity: number }>;

  const subtotal = cartPuppies.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 500;
  const total = subtotal + shipping;

  const removeItem = (puppyId: string) => {
    setCartItems(cartItems.filter((item) => item.puppyId !== puppyId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartPuppies.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                  {cartPuppies.map((puppy) => (
                    <div key={puppy.id} className="flex gap-4 pb-6 border-b last:border-0">
                      <Link href={`/puppies/${puppy.id}`} className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={puppy.images[0]}
                          alt={puppy.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/puppies/${puppy.id}`}>
                          <h3 className="font-semibold text-lg mb-1 hover:text-[#FF6B35]">
                            {puppy.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-2">{puppy.breed}</p>
                        <p className="text-gray-500 text-sm mb-4">
                          {puppy.age} weeks old • {puppy.gender} • {puppy.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#FF6B35] font-bold text-xl">
                            ${puppy.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(puppy.id)}
                            className="flex items-center space-x-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-[#FF6B35]">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full bg-[#FF6B35] text-white py-4 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors block text-center mb-4"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/puppies"
                  className="flex items-center justify-center space-x-2 text-gray-600 hover:text-[#FF6B35]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding puppies to your cart!</p>
            <Link
              href="/puppies"
              className="inline-block bg-[#FF6B35] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
            >
              Browse Puppies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
