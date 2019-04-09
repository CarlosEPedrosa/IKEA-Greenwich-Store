import React from "react";

const Pips = ({ count, handleClick, activeIndex }) => {
  const renderPips = () => {
    let pips = [];
    for (let i = 0; i < count; i++) {
      pips.push(
        <div
          key={i}
          className={`pip${activeIndex === i ? " active" : ""}`}
          onClick={() => {
            if (activeIndex !== i) {
              handleClick(i);
            }
          }}
        >
          <div className="pip__border" />
          <div className="pip__dot" />
        </div>
      );
    }
    return pips;
  };

  return (
    <div className="pips">
      {renderPips()}
    </div>
  );
};

export default Pips;
