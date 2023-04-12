import React from "react";
import  nothing  from "./nothing.svg";

const Nothing = () => {
  return (
    <div
      style={ {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      } }
    >
      <img src={ nothing } alt="nothing" />
      <p style={ { fontSize: "3.2rem", fontWeight: "bold", margin: "2.4rem 0 0.6rem" } }>Opps!</p>
      <p style={ { color: "var(--body_text)", fontSize: "2rem" } }>
        Nothing matchs your search critera.
      </p>
    </div>
  );
};

export default Nothing;
