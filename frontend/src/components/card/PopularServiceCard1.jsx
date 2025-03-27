import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function PopularServiceCard1({
  data,
  style = "",
  isContentExpanded = false,
  textAlign = "",
  ratingDirection = "",
}) {
  const [isFavActive, setFavActive] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${
          pathname === "/home-2" ||
          pathname === "/home-9" ||
          pathname === "/home-16" ||
          pathname === "/home-14"
            ? "rounded-2xl"
            : ""
        } ${pathname === "/home-7" ? "style5" : ""} ${style}`}
        style={
          pathname === "/home-20" ? { border: "none", boxShadow: "none" } : {}
        }
      >
        <div className="relative">
          <img className="w-full h-48 object-cover" src={data.img} alt="thumbnail" />
          <button
            onClick={() => setFavActive(!isFavActive)}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white bg-opacity-70 rounded-full text-gray-600 hover:text-red-500 z-10 ${
              isFavActive ? "text-red-500" : ""
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={isFavActive ? "currentColor" : "none"}
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className={`p-4 ${isContentExpanded ? "px-0" : ""}`}>
          <p className={`text-gray-500 text-sm mb-1 ${textAlign}`}>{data.category}</p>
          <h5 className={`text-lg font-semibold mb-2 ${textAlign}`}>
            <Link to={`/service-single/${data.id}`} className="text-gray-800 hover:text-green-500 transition-colors">
              {data.title.slice(0, 40) + "..."}
            </Link>
          </h5>
          <div className={`flex items-center mb-2 ${ratingDirection}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 text-yellow-400 mr-2"
            >
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800 mr-2">{data.rating}</span>
              {data.review} reviews
            </p>
          </div>
          <hr className="my-2 border-gray-200" />
          <div className={`flex justify-between items-center mt-3 ${ratingDirection}`}>
            <Link className="flex flex-row-reverse gap-2 items-center group" to="/">
              <span className="relative mr-2">
                <img
                  className="rounded-full w-8 h-8 object-cover"
                  src={data.author.img}
                  alt="Freelancer Photo"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-white"></span>
              </span>
              <span className="text-sm text-gray-700 group-hover:text-green-500">{data.author.name}</span>
            </Link>
            <div>
              <p className="text-sm text-gray-600">
                Starting at
                <span className="text-base font-medium text-gray-800 ml-1">
                  ${data.price}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
