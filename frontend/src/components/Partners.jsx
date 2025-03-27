import { partners, partnersTwo } from "../data/partners";
import React from "react";

export default function OurPartners() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto rounded-3xl mb-2 mt-4 hover:bg-gray-50 transition-colors">
      <div className="container mx-auto">
        <div className="mb-10">
          <div className="text-center">
            <h6 className="text-lg font-semibold text-gray-700">موثوق به من قبل أفضل الشركات في العالم</h6>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partnersTwo.map((item, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className="text-center mb-6">
                <img
                  className="mx-auto w-full h-auto object-contain max-h-16 opacity-70 hover:opacity-100 transition-opacity"
                  src={item}
                  alt={`Partner ${index}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
