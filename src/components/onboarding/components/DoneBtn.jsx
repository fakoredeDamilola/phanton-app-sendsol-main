import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DoneBtn = ({ link }) => {
  return (
    <>
      {link ? (
        <Link to={link}>
          <Button sx={{ border: "1px solid white", color: "white" }}>Done</Button>
        </Link>
      ) : (
        <Button sx={{ border: "1px solid white", color: "white" }}>Done</Button>
      )}
    </>
  );
};

export default DoneBtn;
