"use client";

import { FiTruck, FiHeadphones, FiShield, FiSend } from "react-icons/fi";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">
          {/* Item */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white text-2xl">
                <FiTruck />
              </div>
            </div>

            <h3 className="font-bold text-2xl mb-2">FREE AND FAST DELIVERY</h3>

            <p className="text-gray-600">
              Free delivery for all orders over $140
            </p>
          </div>

          {/* Item */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white text-2xl">
                <FiHeadphones />
              </div>
            </div>

            <h3 className="font-bold text-2xl mb-2">24/7 CUSTOMER SERVICE</h3>

            <p className="text-gray-600">Friendly 24/7 customer support</p>
          </div>

          {/* Item */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white text-2xl">
                <FiShield />
              </div>
            </div>

            <h3 className="font-bold text-2xl mb-2">MONEY BACK GUARANTEE</h3>

            <p className="text-gray-600">We return money within 30 days</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 pb-14">
          {/* Exclusive */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Exclusive</h2>

            <h3 className="text-2xl font-semibold mb-4">Subscribe</h3>

            <p className="text-gray-300 mb-6">Get 10% off your first order</p>

            <div className="border border-gray-500 rounded-md flex items-center px-4 py-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none flex-1"
              />

              <FiSend className="text-xl" />
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Support</h3>

            <div className="space-y-4 text-gray-300">
              <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Account</h3>

            <ul className="space-y-4 text-gray-300">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Link</h3>

            <ul className="space-y-4 text-gray-300">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Download App</h3>

            <p className="text-gray-300 mb-5 text-sm">
              Save $3 with App New User Only
            </p>

            <div className="flex gap-3 mb-6">
              <div className="w-24 h-24 bg-white" />

              <div className="space-y-3">
                <div className="border border-gray-500 rounded px-4 py-2 text-sm">
                  Google Play
                </div>

                <div className="border border-gray-500 rounded px-4 py-2 text-sm">
                  App Store
                </div>
              </div>
            </div>

            <div className="flex gap-5 text-2xl">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 py-6 text-center text-gray-500">
          © Copyright Rimel 2022. All right reserved
        </div>
      </footer>
    </>
  );
}
