import React from "react";

export default function MetaComponent({ meta }) {
  return (
    <>
      <title>{meta?.title}</title>
      {meta?.description && <meta name="description" content={meta.description} />}
    </>
  );
}
