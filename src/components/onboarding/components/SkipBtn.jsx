import { Typography } from "@mui/material";
import React from "react";

const SkipBtn = ({ skipAllTours }) => {
  return (
    <button>
      <Typography
        py={3}
        decoration="underline"
        fontSize="16px"
        onClick={skipAllTours}
        fontWeight="normal"
        color="white"
      >
        Skip
      </Typography>
    </button>
  );
};

export default SkipBtn;
