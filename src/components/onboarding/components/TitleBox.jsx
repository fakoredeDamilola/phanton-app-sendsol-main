import { Typography } from "@mui/material";
import React from "react";

const TitleBox = ({ children }) => (
  <Typography pl={2} align="justify" fontWeight="600">
    {children}
  </Typography>
);

export default TitleBox;
