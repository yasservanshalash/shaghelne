import { level } from "../../data/listing";
import listingStore from "../../store/listingStore";
import { useEffect, useState } from "react";

export default function LevelDropdown1() {
  const [getLevel, setLevel] = useState([]);

  const listingStoreInstance = listingStore();
  const setOurLevel = listingStoreInstance?.setLevel;
  const getOurLevel = listingStoreInstance?.getLevel || [];

  // handler
  const levelHandler = (data) => {
    const isExist = Array.isArray(getLevel) && getLevel.includes(data);
    if (!isExist) {
      return setLevel((item) => [...(Array.isArray(item) ? item : []), data]);
    }
    const deleted = Array.isArray(getLevel) ? getLevel.filter((item) => item !== data) : [];
    setLevel(deleted);
  };

  useEffect(() => {
    setLevel(Array.isArray(getOurLevel) ? getOurLevel : []);
  }, [getOurLevel]);

  return (
    <>
      <div className="widget-wrapper pb25 mb0">
        <div className="checkbox-style1">
          {level.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                onChange={() => levelHandler(item.value)}
                checked={Array.isArray(getLevel) && getLevel.includes(item.value)}
              />
              <span className="checkmark" />
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          if (setOurLevel) {
            setOurLevel([]);
            if (Array.isArray(getLevel)) {
              getLevel.forEach((item) => {
                setOurLevel(item);
              });
            }
          }
        }}
        className="done-btn ud-btn btn-thm dropdown-toggle"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
