import { level } from "../../data/listing";
import listingStore from "../../store/listingStore";

export default function LevelOption1() {
  const listingStoreInstance = listingStore();
  const getLevel = listingStoreInstance?.getLevel || [];
  const setLevel = listingStoreInstance?.setLevel;

  // handler
  const levelHandler = (data) => {
    if (setLevel) {
      setLevel(data);
    }
  };

  return (
    <>
      <div className="card-body px-0 pt-0">
        <div className="checkbox-style1 mb15">
          {level.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                checked={Array.isArray(getLevel) && getLevel.includes(item.value)}
                onChange={() => levelHandler(item.value)}
              />
              <span className="checkmark" />
              <span className="right-tags">({item.total})</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
