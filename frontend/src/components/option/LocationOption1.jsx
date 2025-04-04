import { location } from "../../data/listing";
import Search1 from "../element/Search1";
import listingStore from "../../store/listingStore";

export default function LocationOption1() {
  const listingStoreInstance = listingStore();
  const getLocation = listingStoreInstance?.getLocation || [];
  const setLocation = listingStoreInstance?.setLocation;

  // handler
  const locationHandler = (data) => {
    if (setLocation) {
      setLocation(data);
    }
  };

  return (
    <>
      <div className="card-body card-body px-0 pt-0">
        <Search1 />
        <div className="checkbox-style1 mb15">
          {location.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                checked={Array.isArray(getLocation) && getLocation.includes(item.value)}
                onChange={() => locationHandler(item.value)}
              />
              <span className="checkmark" />
              <span className="right-tags">({item.total})</span>
            </label>
          ))}
        </div>
        <a className="text-thm">+20 more</a>
      </div>
    </>
  );
}
