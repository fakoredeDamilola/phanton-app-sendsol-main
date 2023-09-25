// import React from "react";
// import { Modal, Backdrop, Fade, Typography, Button, Box } from "@mui/material";

// const WelcomeModal = ({ openModal, closeModal, textHeader, welcomeText, startTour1 }) => {
//   return (
//     <Modal
//       open={openModal}
//       onClose={() => closeModal(false)}
//       //   closeAfterTransition
//       //   BackdropComponent={Backdrop}
//       //   BackdropProps={{
//       //     timeout: 500,
//       //   }}
//     >
//       <Fade in={openModal}>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "450px",
//             borderRadius: "6px",
//             paddingBottom: "20px",
//             backgroundColor: "#15202B",
//             minHeight: "300px",
//           }}
//         >
//           <Box
//             style={{
//               backgroundColor: "#EAF6FF",
//               textAlign: "center",
//               color: "#319EF6",
//               padding: "25px 0",
//               fontWeight: "normal",
//             }}
//           >
//             <div>
//               {/* Replace 'LOGO' with your logo */}
//               LOGO
//             </div>
//           </Box>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexDirection: "column",
//               paddingTop: "4px",
//               paddingBottom: "4px",
//             }}
//           >
//             <Typography variant="h6" style={{ color: "#F1F5F8", margin: "6px 0" }}>
//               {textHeader}
//             </Typography>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexDirection: "column",
//               paddingTop: "4px",
//               paddingBottom: "4px",
//             }}
//           >
//             <Typography
//               variant="body1"
//               style={{ color: "#F1F5F8", textAlign: "center", margin: "0 8px", fontSize: "16px" }}
//             >
//               {welcomeText}
//             </Typography>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexDirection: "column",
//               paddingTop: "4px",
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               size="large"
//               onClick={startTour1}
//               style={{ width: "80%", marginTop: "8px" }}
//             >
//               Take short tour
//             </Button>
//             <button onClick={() => closeModal(false)}>
//               <Typography
//                 style={{
//                   paddingTop: "12px",
//                   textDecoration: "underline",
//                   fontSize: "16px",
//                   fontWeight: "normal",
//                   color: "#4CAFFF",
//                 }}
//               >
//                 Skip tour
//               </Typography>
//             </button>
//           </div>
//         </div>
//       </Fade>
//     </Modal>
//   );
// };

// export default WelcomeModal;
import React, { useState } from "react";
import { Fade, Typography, Button, Box, Dialog } from "@mui/material";

const WelcomeModal = ({ openModal, closeModal, textHeader, welcomeText, startToure }) => {
  const [open, setOpen] = useState(false);

  function startTour1() {
    closeModal(false);
    startToure();
  }

  const handleClose = () => {
    alert(123);
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Dialog open={openModal} onClose={() => closeModal(false)} sx={{ zIndex: 50 }}>
          <Fade in={openModal}>
            <div>
              <Box
                style={{
                  backgroundColor: "black",
                  textAlign: "center",
                  color: "#319EF6",
                  padding: "25px 0",
                  fontWeight: "normal",
                }}
              >
                <div>
                  {/* Replace 'LOGO' with your logo */}
                  LOGO
                </div>
              </Box>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  backgroundColor: "#6C757D",
                }}
              >
                <Typography variant="h6" style={{ color: "#F1F5F8", margin: "6px 0" }}>
                  {textHeader}
                </Typography>
              </div>
              <Typography variant="body1" style={{ color: "#F1F5F8" }}>
                This is a simple Material-UI modal.
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="white" onClick={startTour1}>
                  Start
                </Button>
                <Button variant="contained" color="white" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </div>
          </Fade>
        </Dialog>
      </Box>
    </div>
  );
};

export default WelcomeModal;
