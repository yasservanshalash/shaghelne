import { Link } from "react-router-dom";
import React from "react";

export default function InspireingWork20() {
  return (
    <section className="py-12 md:py-24 pt-0">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-wrap items-center animate-fadeInUp"
        >
          <div className="w-full md:w-1/2 px-4">
            <div className="bg-amber-50 pb-12 pt-16 px-5 rounded-3xl text-center mb-8">
              <img
                className="mb-8 mx-auto"
                src="/images/about/home20-vector-1.png"
                alt="Find great work"
              />
              <h2 className="text-3xl font-bold mb-8">Find great work</h2>
              <p className="text-gray-700 mb-8">
                Work with the largest network of independent professionals and{" "}
                <br className="hidden lg:block" /> get things done—from quick
                turnaround.
              </p>
              <Link className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors" to="/job-1">
                Get Started <i className="fal fa-arrow-right-long ml-2"></i>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <div className="bg-blue-50 pb-12 pt-16 px-5 rounded-3xl text-center mb-8">
              <img
                className="mb-8 mx-auto"
                src="/images/about/home20-vector-2.png"
                alt="Find talent your way"
              />
              <h2 className="text-3xl font-bold mb-8">Find talent your way</h2>
              <p className="text-gray-700 mb-8">
                Work with the largest network of independent professionals and{" "}
                <br className="hidden lg:block" /> get things done—from quick
                turnaround.
              </p>
              <Link className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors" to="/freelancer-1">
                Get Started <i className="fal fa-arrow-right-long ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
