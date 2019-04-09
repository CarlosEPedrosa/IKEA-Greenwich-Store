import React from "react";

const Heading = ({
  blockID,
  data: { classes, id, heading, subheading, links }
}) =>
  <div
    className={`heading block block-${blockID} ${classes ? classes : ""}`}
    id={id ? id : null}
  >
    <h1 className="heading">
      {heading}
    </h1>
    <p
      className="subheading"
      dangerouslySetInnerHTML={{ __html: subheading }}
    />
    {links
      ? <p
          className="heading__links"
          dangerouslySetInnerHTML={{ __html: links }}
        />
      : null}
  </div>;

export default Heading;
