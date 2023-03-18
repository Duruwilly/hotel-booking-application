import React from "react";

const InlineErrors = ({ error }) => {
  return <h3 className="text-red-800 text-xs mb-3">{error}</h3>;
};

export default InlineErrors;
