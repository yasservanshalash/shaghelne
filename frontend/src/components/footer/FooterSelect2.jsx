import { lan, momney } from "../../data/footer";
import { useState } from "react";

export default function FooterSelect2() {
  const [getMoneySelect, setMoneySelect] = useState("Euro");
  const [getLanSelect, setLanSelect] = useState("English");
  const [moneyDropdownOpen, setMoneyDropdownOpen] = useState(false);
  const [lanDropdownOpen, setLanDropdownOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap space-x-4">
        <div className="relative">
          <button
            type="button"
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 flex items-center justify-between min-w-[100px]"
            onClick={() => setMoneyDropdownOpen(!moneyDropdownOpen)}
          >
            <span>{getMoneySelect}</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {moneyDropdownOpen && (
            <div className="absolute z-10 bottom-full mb-1 bg-white rounded shadow-lg w-full">
              <ul className="py-1">
                {momney.map((item, index) => (
                  <li
                    key={index}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      getMoneySelect === item ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      setMoneySelect(item);
                      setMoneyDropdownOpen(false);
                    }}
                  >
                    <span className="block">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 flex items-center justify-between min-w-[100px]"
            onClick={() => setLanDropdownOpen(!lanDropdownOpen)}
          >
            <span>{getLanSelect}</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {lanDropdownOpen && (
            <div className="absolute z-10 bottom-full mb-1 bg-white rounded shadow-lg w-full">
              <ul className="py-1">
                {lan.map((item, index) => (
                  <li
                    key={index}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      getLanSelect === item ? "bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      setLanSelect(item);
                      setLanDropdownOpen(false);
                    }}
                  >
                    <span className="block">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
