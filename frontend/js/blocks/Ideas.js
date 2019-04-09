import React from "react";
import { filter } from "underscore";
import Heading from "./Heading";

const Ideas = ({ classes, blockID, data: { id, heading, subheading, items } }) => {
  const relevantItems = filter(items, item => {
    return item.url[window.textiles.localeSimple];
  });
  const handleLinkClick = eventLabel => {
    ga("send", {
      hitType: "event",
      eventCategory: "Click",
      eventAction: "Ideas clickthrough",
      eventLabel: eventLabel
    });
  };
  return (  
    <div
      className={`ideas block block-${blockID} ${classes ? classes : ""}`}
      id={id ? id : null}
    >
      <Heading blockID={blockID} data={{ classes, id, heading, subheading }} />
      <div className="items">
        {relevantItems.map((item, index) => {
          return (
            <div className={`item ${index%2 ? "" : "odd"}`} key={index}>
              <a
                className="cover-link"
                href={item.url[window.textiles.localeSimple]}
                onClick={() => {
                  handleLinkClick(item.heading);
                }}
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
                <p className="date">
                {item.date}
                </p>
                <p className="text equalise equalise-reasons-text">
                  {item.text}
                </p>
              </a>
              <ul className="tags">
                {item.tags.map((tag, index) => {
                  return (
                    <li className="tag" key={index}>
                      <a href={tag.url[window.textiles.localeSimple]}><button role="button" aria-pressed="false" rel="nofollow">{tag.label}</button></a>
                    </li>
                  )})
                }
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ideas;