import Image from "next/image";
import Link from "next/link";
import Name from "./Name";
export default function Overview() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1 p-6 sm:p-8 md:p-12">
            <Name />
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Tired of the same old tunes? Discover fresh tracks tailored to
              your mood, activities, and favorite genres. Your musical journey
              starts here!
            </p>
            <div className="text-center md:text-left">
              <Link
                href="/recommendations"
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="md:flex-1 p-6 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-w-4 aspect-h-3">
              <img
                src="/Recommendations.png"
                className="rounded-2xl shadow-md"
                alt="Spotify Recommendations"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
