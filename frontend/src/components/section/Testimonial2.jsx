import { useState } from "react";

export default function Testimonial2() {
  const [activeTab, setActiveTab] = useState("profile");

  const testimonialData = [
    {
      id: "home",
      content: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
      image: "/images/testimonials/1.jpg",
      name: "Albert Cole",
      position: "Designer"
    },
    {
      id: "profile",
      content: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
      image: "/images/testimonials/2.jpg",
      name: "Alison Dawn",
      position: "WP Developer"
    },
    {
      id: "contact",
      content: "Our family was traveling via bullet train between cities in Japan with our luggage - the location for this hotel made that so easy. Agoda price was fantastic.",
      image: "/images/testimonials/3.jpg",
      name: "Daniel Parker",
      position: "Front-end Developer"
    }
  ];

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4 animate-fadeInUp">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold">What our students have to say</h2>
                <p className="mt-2.5">
                  Discover your perfect program in our courses.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full xl:w-10/12 mx-auto">
              <div className="relative mt-10">
                <div className="mb-10">
                  {testimonialData.map((item) => (
                    <div
                      key={item.id}
                      className={`text-center ${
                        activeTab === item.id ? "block" : "hidden"
                      }`}
                    >
                      <div className="text-center">
                        <span className="inline-block text-4xl text-gray-400 mb-4 fas fa-quote-left" />
                        <h4 className="text-xl font-medium max-w-3xl mx-auto">
                          "{item.content}"
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="flex flex-wrap justify-center gap-6">
                  {testimonialData.map((item) => (
                    <li key={item.id} className="cursor-pointer">
                      <a
                        className={`block ${
                          activeTab === item.id ? "ring-2 ring-blue-500" : ""
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <div className="flex items-center">
                          <img
                            className="rounded-full h-16 w-16 object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                          <h6 className="ml-4 xl:ml-3 mb-0">
                            {item.name}
                            <br />
                            <span className="text-sm text-gray-500">{item.position}</span>
                          </h6>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
