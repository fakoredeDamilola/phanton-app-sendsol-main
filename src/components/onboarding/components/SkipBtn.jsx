import { Typography, Button } from "@mui/material";
import React from "react";

const SkipBtn = ({ skipAllTours }) => {
  return (
    <Button sx={{ border: "1px solid white", color: "white" }} onClick={skipAllTours}>
      Skip
    </Button>
  );
};

export default SkipBtn;
