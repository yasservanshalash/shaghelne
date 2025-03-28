import { Link } from "react-router-dom";
import FooterSocial from "./FooterSocial";

// Removed links array since all items are being removed

export default function FooterHeader() {
  return (
    <>
      <div className="flex flex-wrap border-b border-green-200 pb-4 mb-8">
        <div className="w-full md:w-7/12">
          {/* Links removed as requested */}
        </div>
        <div className="w-full md:w-5/12">
          {/* Commented out since this contains "Follow us" */}
          {/* <FooterSocial /> */}
        </div>
      </div>
    </>
  );
}
