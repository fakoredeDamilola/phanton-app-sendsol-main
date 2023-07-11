import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import RewardModal from "../../components/RewardModal";
import axios from "axios";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import { ClipLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(false);
  const [showAddExtra, setShowAddExtra] = useState(false);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalInput, setModalInput] = useState({
    ph1: "",
    ph2: "",
    water: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("phantom_user"));
    console.log({ user });
    axios
      .get("http://localhost:5000/api/sub/getmac", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          console.log(res.data, "keke");
          if (res.data.data.MacAddress) {
            const newObject = {
              id: res.data.data._id,
              IP: res.data.data.MacAddress,
              active: true,
            };
            setData([newObject]);

            if (res.data.extra.ecsensor) {
              setShowAddExtra(true);
              setModalInput({
                ph1: res.data.extra.ph1,
                ph2: res.data.extra.ph2,
                water: res.data.extra.water,
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
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkSub = () => {
    const user = JSON.parse(localStorage.getItem("phantom_user"));
    console.log({ user });
    if (userIP !== "") {
      setLoading(true);
      axios
        .post(
          "http://localhost:5000/api/sub/data",
          { IP: userIP },
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          // setLoading(false);
          console.log({ res });

          // setData(res.data)
          if (res.data.status) {
            // setData(prevData=>prevData[userIP] = res.data.status)
            console.log(res.data.reading);
            let result = res.data.reading;
            const newObject = {
              id: result._id,
              IP: userIP,
              active: true,
            };
            console.log(
              { newObject, data },
              data.filter((datum) => datum !== newObject.id).length === 0
            );
            setData((prevData) => [newObject]);
            const IPData = JSON.parse(localStorage.getItem("IPData"));
            console.log({ IPData });
            if (IPData) {
              localStorage.setItem("IPData", JSON.stringify({ data: [newObject] }));
            } else {
              localStorage.setItem("IPData", JSON.stringify({ data: [newObject] }));
            }
            setUserIP("");

            setLoading(false);
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
  const submitRecentData = async () => {
    console.log({ modalInput, data });
    const user = JSON.parse(localStorage.getItem("phantom_user"));
    console.log({ user, data });
    if (data[0].IP !== "") {
      setLoading(true);
      const IPNeeded = data[0].IP;
      const dataSent = {
        [IPNeeded]: {
          water: parseFloat(modalInput.water) ?? 0,
          ph1: parseFloat(modalInput.ph1) ?? 0,
          ph2: parseFloat(modalInput.ph2) ?? 0,
        },
      };
      console.log({ dataSent });
      const url =
        "https://webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-fppkf/service/rootlabs/incoming_webhook/webhook0?secret=12345";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSent),
      });
      console.log({ response });
      const text = await response.text();
      console.log(text);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  <TableCell>{row.IP}</TableCell>
                  <TableCell>{row.active ? "connected" : "not connected"}</TableCell>
                  <TableCell>
                    {showAddExtra && (
                      <Button
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
        <MDBox mx={3}>
          <MDBox>
            <div htmlFor="ph1">ph1</div>
            <MDInput
              fullWidth
              type="number"
              name="ph1"
              value={modalInput.ph1}
              onChange={handleInputChange}
            />
          </MDBox>
          <MDBox my={2}>
            <div htmlFor="ph2">ph2</div>
            <MDInput
              fullWidth
              type="number"
              name="ph2"
              value={modalInput.ph2}
              onChange={handleInputChange}
            />
          </MDBox>
          <MDBox>
            <div htmlFor="water">water</div>
            <MDInput
              fullWidth
              type="number"
              name="water"
              value={modalInput.water}
              onChange={handleInputChange}
            />
          </MDBox>
        </MDBox>

        <div className="modal-buttons">
          <Button
            sx={[styles.sendButtonActive]}
            variant="gradient"
            color="info"
            onClick={() => {
              submitRecentData();
              setOpenModal(false);
            }}
          >
            Submit Info
          </Button>
        </div>
      </RewardModal>
    </DashboardLayout>
  );
};

export default Data;
