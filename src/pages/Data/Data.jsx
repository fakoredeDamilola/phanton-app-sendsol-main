import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Joyride from "react-joyride";
import MDInput from "components/MDInput";
import RewardModal from "../../components/RewardModal";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { setRefreshPageAfterDataChange } from "context";
import { useMaterialUIController } from "context";
import "./style.css";
import { phantomStep } from "components/onboarding/PhantomStep";

const styles = {
  // [theme.breakpoints.down('md')]: {
  //   backgroundColor: theme.palette.secondary.main,
  // },
  container: {
    backgroundColor: "#ffffff95",
    display: "flex",
    flexDirection: "column",
    width: 1440,
    height: 996,
    borderRadius: 4,
    margin: 4,
    padding: 4,
  },
  contentContainer: {
    display: "flex",
    backgroundColor: "red",
    flexDirection: "row",
    maxWidth: 1200,

    justifyContent: "space-between",
  },
  sendButtonActive: {
    backgroundColor: "#14679b",
    color: "#fff !important",
    width: "160px",
    "&:hover": {
      backgroundColor: "#10212c",
    },
  },
  table: {
    // minWidth: 650,
  },
  row: {},
  error: {
    width: "100%",
    backgroundColor: "red",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
  },
  empty: {
    width: "100%",
    color: "white",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    margin: "20px",
    padding: "30px",
  },
};

const Data = () => {
  const [userIP, setUserIP] = useState("");
  const [errorMessage, setShowErrorMessage] = useState("");
  const [modalMessage, setShowModalMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddExtra, setShowAddExtra] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [data, setData] = useState([]);
  const [run, setRun] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalInput, setModalInput] = useState({
    ph1: "",
    ph2: "",
    tankHeight: "",
    startPump: "",
    timer1: "",
    timer2: "",
    timer3: "",
    pump1: "",
    pump2: "",
    pump3: "",
  });
  const [pumps, setPumps] = useState({
    pump1: false,
    pump2: false,
    pump3: false,
  });
  const [controller, dispatch] = useMaterialUIController();
  const { refreshPageAfterDataChange } = controller;

  useEffect(() => {
    getMacDetails();
  }, []);

  useMemo(async () => {
    const newObject = {
      pump1: pumps.pump1 ? 10 : 1,
      pump2: pumps.pump2 ? 10 : 1,
      pump3: pumps.pump3 ? 10 : 1,
    };
    if (data[0].IP !== "") {
      const IPNeeded = data[0].IP;
      const dataSent = {
        [IPNeeded]: newObject,
      };
      const url =
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-fppkf/service/rootlabs/incoming_webhook/webhook0?secret=12345";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSent),
      });
      const text = await response.json();
      setRefreshPageAfterDataChange(dispatch, !refreshPageAfterDataChange);
      getMacDetails();
    }
  }, [pumps.pump1, pumps.pump2, pumps.pump3]);

  const getMacDetails = async () => {
    const user = JSON.parse(localStorage.getItem("phantom_user"));
    axios
      .get("https://solanarootlab-94e7d0d3206e.herokuapp.com/api/sub/getmac", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          if (res.data.data.MacAddress) {
            const newObject = {
              id: res.data.data._id,
              IP: res.data.data.MacAddress,
              active: true,
            };
            setData([newObject]);

            if (res.data.extra.ecSensor) {
              setShowAddExtra(true);
              setModalInput({
                ph1: res?.data?.extra?.ph1,
                ph2: res?.data?.extra?.ph2,
                timer1: res?.data?.extra?.timer1,
                timer2: res?.data?.extra?.timer2,
                timer3: res?.data?.extra?.timer3,
                pump1: res?.data?.extra?.pump1,
                pump2: res?.data?.extra?.pump2,
                pump3: res?.data?.extra?.pump3,
                tankHeight: res?.data?.extra?.tankHeight,
                startPump: res?.data?.extra?.startPump,
              });
              setPumps({
                pump1: res?.data?.extra?.pump1 === 1 ? false : true,
                pump2: res?.data?.extra?.pump2 === 1 ? false : true,
                pump3: res?.data?.extra?.pump3 === 1 ? false : true,
              });
            } else {
              setShowAddExtra(false);
            }
          }
        } else {
          setShowErrorMessage(`${userIP} not found`);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        // alert("Invalid Credentials");
        console.log("The error", err);
      })
      .finally(() => setLoading(false));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setShowModalMessage("");

    setModalInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkSub = () => {
    const user = JSON.parse(localStorage.getItem("phantom_user"));

    if (userIP !== "") {
      setLoading(true);
      axios
        .post(
          // "https://solanarootlab-94e7d0d3206e.herokuapp.com/api/sub/data",
          "https://solanarootlab-94e7d0d3206e.herokuapp.com/api/sub/data",
          { IP: userIP },
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status) {
            let result = res.data.reading;
            const newObject = {
              id: result._id,
              IP: userIP,
              active: true,
            };
            setData((prevData) => [newObject]);
            // setRefreshPageAfterDataChange(dispatch, !refreshPageAfterDataChange);
            const IPData = JSON.parse(localStorage.getItem("IPData"));
            if (IPData) {
              localStorage.setItem("IPData", JSON.stringify({ data: [newObject] }));
            } else {
              localStorage.setItem("IPData", JSON.stringify({ data: [newObject] }));
            }
            setUserIP("");

            setLoading(false);
            alert("Updated");
            getMacDetails();
            setRefreshPageAfterDataChange(dispatch, !refreshPageAfterDataChange);
          } else {
            setShowErrorMessage(`${userIP} not found`);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          // alert("Invalid Credentials");
          console.log("The error", err);
        })
        .finally(() => setLoading(false));
    } else {
      setShowErrorMessage("Please input a value");
    }
  };
  function removeEmptyProperty(arg) {
    const anyObj = { ...arg };
    for (let prop in anyObj) {
      if (!anyObj[prop]) {
        delete anyObj[prop];
      }
    }
    return anyObj;
  }
  const submitRecentData = async () => {
    if (modalInput.ph1 !== "" && (modalInput.ph1 < 1 || modalInput.ph1 > 14)) {
      setShowModalMessage("PH1 value must be between 1 and 14");
      return;
    }

    // Validate PH2
    if (modalInput.ph2 !== "" && (modalInput.ph2 < 1 || modalInput.ph2 > 14)) {
      setShowModalMessage("PH2 value must be between 1 and 14");
      return;
    }

    // Validate Water Full Height
    // if (
    //   modalInput.tankHeight !== "" &&
    //   (modalInput.tankHeight < 8 || modalInput.tankHeight > 17)
    // ) {
    //   setShowModalMessage("Water Full Height value must be between 8 and 17");
    //   return;
    // }

    // Validate Low Level Height
    // if (
    //   modalInput.startPump !== "" &&
    //   (modalInput.startPump < 0 || modalInput.startPump > 7)
    // ) {
    //   setShowModalMessage("Low Level Height value must be between 0 and 7");
    //   return;
    // }

    // Check and validate Pump 1 settings

    if ((modalInput.timer1 !== "" && modalInput.timer1 < 10) || modalInput.timer1 > 14400) {
      setShowModalMessage("Pump 1 timer must be between 10 and 14400");
      return;
    }

    if ((modalInput.timer2 !== "" && modalInput.timer2 < 10) || modalInput.timer2 > 14400) {
      setShowModalMessage("Pump 2 timer must be between 10 and 14400");
      return;
    }

    // Check and validate Pump 3 settings

    if ((modalInput.timer3 !== "" && modalInput.timer3 < 10) || modalInput.timer3 > 14400) {
      setShowModalMessage("Pump 3 timer must be between 10 and 14400");
      return;
    }

    const newObject = removeEmptyProperty({
      tankHeight: parseFloat(modalInput.tankHeight) ?? 0,
      startPump: parseFloat(modalInput.startPump) ?? 0,
      ph1: parseFloat(modalInput.ph1) ?? 0,
      ph2: parseFloat(modalInput.ph2) ?? 0,
      timer1: parseFloat(modalInput.timer1) ?? 0,
      timer2: parseFloat(modalInput.timer2) ?? 0,
      timer3: parseFloat(modalInput.timer3) ?? 0,
      pump1: pumps.pump1 ? 10 : 1,
      pump2: pumps.pump2 ? 10 : 1,
      pump3: pumps.pump3 ? 10 : 1,
    });
    setModalLoading(true);
    setShowModalMessage("");
    if (data[0].IP !== "") {
      const IPNeeded = data[0].IP;
      const dataSent = {
        [IPNeeded]: newObject,
      };
      const url =
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-fppkf/service/rootlabs/incoming_webhook/webhook0?secret=12345";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSent),
      });
      const text = await response.json();
      setRefreshPageAfterDataChange(dispatch, !refreshPageAfterDataChange);
      getMacDetails();
    }
    setOpenModal(false);
    setModalLoading(false);
    setShowModalMessage(false);
    setModalInput({
      ph1: "",
      ph2: "",
      tankHeight: "",
      startPump: "",
      timer1: "",
      timer2: "",
      timer3: "",
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Joyride
        // @ts-ignore
        steps={phantomStep}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        //callback={handleStepComplete}
        styles={{
          options: {
            arrowColor: "#319EF6",
            backgroundColor: "#319EF6",
            textColor: "#FFFFFF",
            primaryColor: "#319EF6",
          },
        }}
      />
      <MDBox
        py={3}
        sx={({ breakpoints }) => ({
          [breakpoints.only("md")]: {
            width: "300px",
          },
          [breakpoints.only("xl")]: {
            width: "500px",
            maxWidth: "38%",
            margin: "0 auto",
          },
        })}
        mx={8}
        mt={4}
        className="dataInput"
      >
        {/* <Grid container spacing={3}> */}
        {/* <MDBox mb={2} backgroundColor="red"> */}
        <MDInput
          onChange={(e) => {
            setUserIP(e.target.value);
            if (errorMessage) {
              setShowErrorMessage("");
            }
          }}
          value={userIP}
          type="string"
          label="IP"
          fullWidth
        />
        {/* </MDBox> */}
        {/* </Grid> */}
        {errorMessage ?? <MDBox sx={styles.error}>{errorMessage}</MDBox>}
      </MDBox>
      <Button
        onClick={() => {
          checkSub();
        }}
        sx={[styles.sendButtonActive]}
        variant="gradient"
        color="info"
      >
        Send <ClipLoader loading={loading} size={25} />
      </Button>

      {data.length === 0 ? (
        <MDBox sx={styles.empty}>No Mac Connected</MDBox>
      ) : (
        <TableContainer component={Paper} sx={{ my: "30px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* <TableHead> */}
            <TableRow sx={{ fontWeight: 700 }}>
              <TableCell>Mac Address</TableCell>
              <TableCell>Connection</TableCell>
            </TableRow>
            {/* </TableHead> */}
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell className="showMacAddress">{row.IP}</TableCell>
                  <TableCell className="statusOfConnection">
                    {row.active ? "connected" : "not connected"}
                  </TableCell>
                  <TableCell>
                    {showAddExtra && (
                      <Button
                        className="addExtraData"
                        onClick={() => {
                          setOpenModal(true);
                        }}
                        sx={[styles.sendButtonActive]}
                        variant="gradient"
                        color="info"
                      >
                        Add Extra Data
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <RewardModal
        show={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <h3>Add Extra Data</h3>
        {modalMessage && <MDBox sx={{ color: "red" }}>{modalMessage}</MDBox>}
        <MDBox mx={3}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <MDBox>
              <label htmlFor="ph1">PH up Min Threshold(Pump 2)</label>
              <MDInput
                fullWidth
                type="number"
                placeholder="1-14"
                min="1"
                max="14"
                name="ph1"
                value={modalInput.ph1}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox>
              <label htmlFor="ph2">PH down Max Threshold(Pump 3)</label>
              <MDInput
                fullWidth
                type="number"
                name="ph2"
                // placeholder="1-14"
                // min="1"
                // max="14"
                value={modalInput.ph2}
                onChange={handleInputChange}
              />
            </MDBox>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", my: "10px" }}>
            <MDBox>
              <label htmlFor="tankHeight">Tank Max Height (inches)</label>
              <MDInput
                fullWidth
                type="number"
                // placeholder="8-17"
                // min="8"
                // max="17"
                name="tankHeight"
                value={modalInput.tankHeight}
                onChange={handleInputChange}
              />
            </MDBox>
            <MDBox>
              <label htmlFor="startPump">Tank Min refill height (inches)</label>
              <MDInput
                fullWidth
                type="number"
                min="0"
                max="7"
                placeholder="0-7"
                name="startPump"
                value={modalInput.startPump}
                onChange={handleInputChange}
              />
            </MDBox>
          </Box>
          <div class="toggle-container">
            <div class="toggle">
              <label for="pump1">Pump 1</label>
              <input
                type="checkbox"
                id="pump1"
                class="toggle-input"
                checked={pumps.pump1}
                onChange={() =>
                  setPumps((prevState) => ({ ...prevState, pump1: !prevState.pump1 }))
                }
              />
              <label class="slider" for="pump1"></label>
              <span class="status">{pumps.pump1 ? "On" : "Off"}</span>
              <input
                type="number"
                id="timer1"
                name="timer1"
                class="timer-input"
                placeholder="Timer"
                value={modalInput.timer1}
                max="14400"
                min="10"
                onChange={handleInputChange}
              />
            </div>
            <div class="toggle">
              <label for="pump2">Pump 2</label>
              <input
                type="checkbox"
                id="pump2"
                class="toggle-input"
                checked={pumps.pump2}
                onChange={() =>
                  setPumps((prevState) => ({ ...prevState, pump2: !prevState.pump2 }))
                }
              />
              <label class="slider" for="pump2"></label>
              <span class="status">{pumps.pump2 ? "On" : "Off"}</span>
              <input
                type="number"
                id="timer2"
                name="timer2"
                class="timer-input"
                placeholder="Timer"
                value={modalInput.timer2}
                max="14400"
                min="10"
                onChange={handleInputChange}
              />
            </div>
            <div class="toggle">
              <label for="pump3">Pump 3</label>
              <input
                type="checkbox"
                id="pump3"
                class="toggle-input"
                checked={pumps.pump3}
                onChange={() =>
                  setPumps((prevState) => ({ ...prevState, pump3: !prevState.pump3 }))
                }
              />
              <label class="slider" for="pump3"></label>
              <span class="status">{pumps.pump3 ? "On" : "Off"}</span>
              <input
                type="number"
                id="timer3"
                name="timer3"
                class="timer-input"
                placeholder="Timer"
                max="14400"
                value={modalInput.timer3}
                min="10"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </MDBox>

        <div className="modal-buttons">
          <Button
            sx={[styles.sendButtonActive]}
            variant="gradient"
            color="info"
            onClick={() => {
              submitRecentData();
            }}
          >
            Submit Info <ClipLoader loading={modalLoading} size={25} />
          </Button>
        </div>
      </RewardModal>
    </DashboardLayout>
  );
};

export default Data;
