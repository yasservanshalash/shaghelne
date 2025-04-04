import priceStore from "../../store/priceStore";
import Slider from "../common/Slider";

export default function PriceRange1() {
  const priceRange = priceStore((state) => state.priceRange);
  const priceRangeHandler = priceStore((state) => state.priceRangeHandler);

  // price range handler
  const rangeHandler = (e) => {
    priceRangeHandler(e[0], e[1]);
  };

  return (
    <>
      <div className="price__range__box">
        <Slider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={[priceRange.min, priceRange.max]}
          min={0}
          max={100000}
          onChange={rangeHandler}
          minDistance={10}
          withBars={true}
        />
      </div>
    </>
  );
}
