import React from "react";

const Divider = ({ blockID }) =>
  <div className={`divider block block-${blockID}`}>
    <div className="line" />
  </div>;

export default Divider;
