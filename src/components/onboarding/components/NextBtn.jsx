import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NextBtn = ({ link }) => {
  return (
    <>
      {link ? (
        <Link to={link}>
          <Button sx={{ border: "1px solid white", color: "white" }}>Next</Button>
        </Link>
      ) : (
        <Button sx={{ border: "1px solid white", color: "white" }}>Next</Button>
      )}
    </>
  );
};

export default NextBtn;
