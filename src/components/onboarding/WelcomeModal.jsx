import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const WelcomeModal = ({ openModal, closeModal, startToure, welcomeText, textHeader }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog fullScreen={fullScreen} open={openModal} onClose={() => closeModal(false)}>
      <DialogTitle>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => closeModal(false)}
          aria-label="close"
          sx={{
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box textAlign="center" color="blue" padding={2}>
          {/* <img src={logo} alt="logo" /> */}
          <h1>logo</h1>
        </Box>
        <Typography textAlign="center" variant="h5" color="white" gutterBottom>
          {textHeader}
        </Typography>
        <Typography variant="body1" color="white" paragraph>
          {welcomeText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            startToure();
            closeModal(false);
          }}
          variant="contained"
          color="primary"
        >
          Start Tour
        </Button>
        <Button onClick={() => closeModal(false)} color="secondary">
          Skip Tour
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeModal;
