import { bestSeller } from "../../data/listing";
import listingStore from "../../store/listingStore";

export default function SortOption1() {
  const listingStoreInstance = listingStore();
  const getBestSeller = listingStoreInstance?.getBestSeller || 'best-seller';
  const setBestSeller = listingStoreInstance?.setBestSeller;

  // handle
  const bestSellerHandler = (data) => {
    if (setBestSeller) {
      setBestSeller(data);
    }
  };

  const getBestSellerSelected = bestSeller.find((item) =>
    item.value === getBestSeller ? item : false
  ) || bestSeller[0]; // Fallback to first item if nothing found

  return (
    <>
      <div className="pcs_dropdown dark-color pr10 pr0-xs text-center">
        <span>Sort by</span>
        <div className="dropdown bootstrap-select show-tick">
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-bs-toggle="dropdown"
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">
                  {getBestSellerSelected?.title || "Best Seller"}
                </div>
              </div>
            </div>
          </button>
          <div className="dropdown-menu">
            <div className="inner show">
              <ul className="dropdown-menu inner show">
                {bestSeller.map((item, i) => (
                  <li key={i}>
                    <a
                      onClick={() => bestSellerHandler(item.value)}
                      className={`dropdown-item ${
                        item.value === getBestSeller ? "active selected" : ""
                      }`}
                    >
                      <span className="bs-ok-default check-mark" />
                      <span className="text">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
