import priceStore from "../../store/priceStore";
import { useEffect, useRef, useState } from "react";
import Slider from "../common/Slider";

export default function PriceDropdown1() {
  // Use a ref to track whether we've initialized from the store
  const initializedRef = useRef(false);
  
  const [localPrice, setLocalPrice] = useState({
    min: 0,
    max: 100000,
  });

  // Get store instance only once on render
  const priceStoreInstance = priceStore();
  
  // One-time initialization from store
  useEffect(() => {
    if (!initializedRef.current && priceStoreInstance?.priceRange) {
      setLocalPrice({
        min: priceStoreInstance.priceRange.min || 0,
        max: priceStoreInstance.priceRange.max || 100000,
      });
      initializedRef.current = true;
    }
  }, [priceStoreInstance]);

  // Handler for slider changes - updates only local state
  const priceHandler = (data) => {
    setLocalPrice({
      min: data[0],
      max: data[1],
    });
  };

  // Apply button handler - only updates store when clicked
  const applyPriceToStore = () => {
    if (priceStoreInstance?.priceRangeHandler) {
      priceStoreInstance.priceRangeHandler(localPrice.min, localPrice.max);
    }
  };

  return (
    <>
      <div className="widget-wrapper pb25 mb0 pr20">
        <div className="range-slider-style1">
          <div className="range-wrapper">
            <div className="price__range__box">
              <Slider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                value={[localPrice.min, localPrice.max]}
                min={0}
                max={100000}
                onChange={priceHandler}
                minDistance={10}
                withBars={true}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center pt-3">
            <span id="slider-range-value1">${localPrice.min}</span>
            <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
            <span id="slider-range-value2">${localPrice.max}</span>
          </div>
          <div className="text-center mt10">
            <button
              onClick={applyPriceToStore}
              className="done-btn ud-btn btn-thm drop_btn"
            >
              Apply
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
