import React, { Fragment } from "react";

import Heading from "./Heading";

const ProductGrid = ({
  blockID,
  data: { classes, id, heading, subheading, items }
}) => {
  const handleLinkClick = eventLabel => {
    ga("send", {
      hitType: "event",
      eventCategory: "Click",
      eventAction: "Living Room category clickthrough",
      eventLabel: eventLabel
    });
  };
  return (
    <div>
      <Heading blockID={blockID} data={{ classes, id, heading, subheading }} />
      <div
        className={`productGrid block block-${blockID} ${classes
          ? classes
          : ""}`}
        id={id ? id : null}
      >
        <div className="items">
          {items.map((item, index) => {
            return (
              <a
                href={item.url[window.textiles.localeSimple]}
                className="item"
                key={index}
                onClick={() => {
                  handleLinkClick(item.text);
                }}
              >
                <div className="image-wrapper">
                  <img
                    src={`${window.textiles.assetPath}images/${item.image}`}
                    alt=""
                  />
                </div>
                <p>
                  {item.text}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
