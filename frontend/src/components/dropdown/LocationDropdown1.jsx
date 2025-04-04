import { location } from "../../data/listing";
import listingStore from "../../store/listingStore";
import { useEffect, useState } from "react";

export default function LocationDropdown1() {
  const [getLocation, setLocation] = useState([]);
  
  const listingStoreInstance = listingStore();
  const getOurLocation = listingStoreInstance?.getLocation || [];
  const setOurLocation = listingStoreInstance?.setLocation;

  const locationHandler = (data) => {
    const isExist = Array.isArray(getLocation) && getLocation.includes(data);
    if (!isExist) {
      return setLocation((item) => [...(Array.isArray(item) ? item : []), data]);
    }
    const deleted = Array.isArray(getLocation) ? getLocation.filter((item) => item !== data) : [];
    setLocation(deleted);
  };

  useEffect(() => {
    setLocation(Array.isArray(getOurLocation) ? getOurLocation : []);
  }, [getOurLocation]);

  return (
    <>
      <div className="widget-wrapper pr20">
        <div className="checkbox-style1">
          {location.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                checked={Array.isArray(getLocation) && getLocation.includes(item.value)}
                onChange={() => locationHandler(item.value)}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          if (setOurLocation) {
            setOurLocation([]);
            if (Array.isArray(getLocation)) {
              getLocation.forEach((item) => {
                setOurLocation(item);
              });
            }
          }
        }}
        className="done-btn ud-btn btn-thm drop_btn4"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
