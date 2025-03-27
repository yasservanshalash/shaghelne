import { inspiringProjects, product1 } from "../../data/product";
import { Link } from "react-router-dom";
import React from "react";

export default function InspiringService11() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-wrap items-center animate-fadeInUp mb-8"
        >
          <div className="w-full lg:w-9/12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Inspiring work made on Freeio</h2>
              <p className="text-gray-600">
                Get some Inspirations from 1800+ skills
              </p>
            </div>
          </div>
          <div className="w-full lg:w-3/12">
            <div className="text-left lg:text-right mb-4 lg:mb-2">
              <Link className="inline-flex items-center text-gray-700 hover:text-gray-900" to="/blog-1">
                See more<i className="fal fa-arrow-right-long ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 animate-fadeInUp">
          {inspiringProjects.map((elm, i) => (
            <div key={i} className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-full">
                <img className="w-full rounded-t-xl" src={elm.imageSrc} alt="Project image" />
              </div>
              <div className="p-4">
                <div>
                  <a className="flex items-center" href="#">
                    <span className="relative mr-4">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={elm.freelancerImageSrc}
                        alt="Freelancer Photo"
                      />
                    </span>
                    <span>
                      <h5 className="text-sm font-medium mb-1">{elm.title}</h5>
                      <p className="text-sm text-gray-600 mb-0">by {elm.author}</p>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
