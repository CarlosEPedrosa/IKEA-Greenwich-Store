import React from "react";
import { filter } from "underscore";
import Heading from "./Heading";

const Reasons = ({ classes, blockID, data: { id, heading, items } }) => {
  const relevantItems = filter(items, item => {
    return item.url[window.textiles.localeSimple];
  });
  return (  
    <div
      className={`reasons block block-${blockID} ${classes ? classes : ""}`}
      id={id ? id : null}
    >
      <Heading blockID={blockID} data={{ classes, id, heading }} />
      <div className="items">
        {relevantItems.map((item, index) => {
          return (
            <div className="item" key={index}>
              <a
                className="cover-link"
                href={item.url[window.textiles.localeSimple]}
              >
                <div className="image-wrapper">
                  <img
                    src={`${window.textiles.assetPath}images/${item.image}`}
                    alt=""
                  />
                </div>
                <h3 className="heading equalise equalise-reasons-heading">
                  {item.heading}
                </h3>
                <p className="text equalise equalise-reasons-text">
                  {item.text}
                </p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reasons;
