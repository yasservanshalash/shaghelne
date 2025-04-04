import { category } from "../../data/listing";
import listingStore from "../../store/listingStore";
import { useEffect, useState } from "react";

export default function CategoryDropdown1() {
  const [getCategory, setCategory] = useState([]);
  
  const listingStoreInstance = listingStore();
  const getOurCategory = listingStoreInstance?.getCategory || [];
  const setOurCategory = listingStoreInstance?.setCategory;

  // handler
  const categoryHandler = (data) => {
    if (!Array.isArray(getCategory) || !getCategory.includes(data)) {
      return setCategory((item) => [...(Array.isArray(item) ? item : []), data]);
    }
    const filtered = Array.isArray(getCategory) 
      ? getCategory.filter((item) => item !== data) 
      : [];
    setCategory(filtered);
  };

  useEffect(() => {
    setCategory(Array.isArray(getOurCategory) ? getOurCategory : []);
  }, [getOurCategory]);

  return (
    <>
      <div className="widget-wrapper pr25">
        <div className="category-list mt-0">
          <div className="checkbox-style1">
            {category.map((item, i) => (
              <label key={i} className="custom_checkbox">
                {item.title}
                <input
                  type="checkbox"
                  onChange={() => categoryHandler(item.title)}
                  checked={Array.isArray(getCategory) && getCategory.includes(item.title)}
                />
                <span className="checkmark" />
                <span className="right-tags">({item.total})</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          if (setOurCategory) {
            setOurCategory([]);
            if (Array.isArray(getCategory)) {
              getCategory.forEach((item) => {
                setOurCategory(item);
              });
            }
          }
        }}
        className="done-btn ud-btn btn-thm drop_btn"
      >
        Apply
        <i className="fal fa-arrow-right-long" />
      </button>
    </>
  );
}
