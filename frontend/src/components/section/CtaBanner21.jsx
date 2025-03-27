import { Link } from "react-router-dom";
import React from "react";

export default function CtaBanner21() {
  return (
    <section className="max-w-[1700px] mx-auto rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-6/12 lg:w-8/12 animate-fadeInRight">
            <div className="text-white mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                With talented freelancers do{" "}
                <br className="hidden xl:block" /> more work.
              </h2>
              <p className="mb-8">
                Work with the largest network of independent professionals and{" "}
                <br className="hidden lg:block" /> get things done—from quick
                turnarounds.
              </p>
              <Link to="/job-1" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-2xl mr-5 hover:bg-gray-100 transition-colors">
                Find Work <i className="fal fa-arrow-right-long ml-2"></i>
              </Link>
              <Link
                to="/freelancer-1"
                className="inline-block px-6 py-3 border border-white text-white rounded-2xl hover:bg-white hover:text-gray-900 transition-colors"
              >
                Find Talent <i className="fal fa-arrow-right-long ml-2"></i>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-6/12 lg:w-4/12 animate-fadeIn">
            <img
              className="hidden md:block mx-auto"
              src="/images/about/about-16.png"
              alt="Freelancer illustration"
            />
            <img
              className="hidden md:block absolute -bottom-10 right-10 max-w-xs"
              src="/images/about/element-12.png"
              alt="Decorative element"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
