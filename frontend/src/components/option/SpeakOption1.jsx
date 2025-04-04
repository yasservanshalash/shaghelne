import { speaks } from "../../data/listing";
import listingStore from "../../store/listingStore";

export default function SpeakOption1() {
  const listingStoreInstance = listingStore();
  const getSpeak = listingStoreInstance?.getSpeak || [];
  const setSpeak = listingStoreInstance?.setSpeak;

  // handler
  const speakHandler = (data) => {
    if (setSpeak) {
      setSpeak(data);
    }
  };

  return (
    <>
      <div className="card-body px-0 pt-0">
        <div className="checkbox-style1 mb15">
          {speaks.map((item, i) => (
            <label key={i} className="custom_checkbox">
              {item.title}
              <input
                type="checkbox"
                checked={Array.isArray(getSpeak) && getSpeak.includes(item.value)}
                onChange={() => speakHandler(item.value)}
              />
              <span className="checkmark" />
              <span className="right-tags">({item.total})</span>
            </label>
          ))}
        </div>
        <a className="text-thm" href="#">
          +20 more
        </a>
      </div>
    </>
  );
}
