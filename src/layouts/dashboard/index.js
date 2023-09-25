// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Line } from "react-chartjs-2";
import Axios from "../../axios/Axios";
import { useState, useEffect, useMemo } from "react";
import "../../assets/css/style.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import Joyride from "react-joyride";
import "react-circular-progressbar/dist/styles.css";
import StakingCard from "./components/StakingCard";
import axios from "axios";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useMaterialUIController } from "context";
import AnimatedProgressProvider from "./components/AnimatedProgressProvider";
import { phantomStep } from "components/onboarding/PhantomStep";
import WelcomeModal from "components/onboarding/WelcomeModal";

function Dashboard() {
  const [socket, setSocket] = useState(null);
  const [humidityData, setHumidityData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [humidityStatData, setHumidityStatData] = useState(0);
  const [temperatureStatData, setTemperatureStatData] = useState(0);
  const [temperatureData, setTemperatureData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [ECData, setECData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [ECsensorStatData, setECsensorStatData] = useState(0);
  const [waterStatData, setWaterStatData] = useState(0);
  const [waterData, setWaterData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [phData, setPHData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [phStatData, setStatPHData] = useState(0);
  const [tempToken, setTempToken] = useState("");
  const [humidityToken, setHumidityToken] = useState("");
  const [waterLevel, setWaterLevel] = useState("");
  const [waterToken, setWaterToken] = useState("");
  const [ecToken, setECSensorToken] = useState("");
  const [PHToken, setPHToken] = useState("");
  const [controller] = useMaterialUIController();
  const { refreshPageAfterDataChange } = controller;
  const [errorMessage, setShowErrorMessage] = useState(false);

  const [phtime, setPhTime] = useState(null);
  const [tempTime, setTempTime] = useState(null);
  const [humidTime, setHumidTime] = useState(null);

  useEffect(() => {
    setSocket(io("https://solanarootlab-94e7d0d3206e.herokuapp.com"));

    callAllNewData();
  }, []);

  useEffect(() => {
    socket?.on("success", (res) => {
      callAllNewData();
    });
  }, [socket]);

  function convertLength(value, unit) {
    if (unit === "inches") {
      return value * 2.54; // Convert inches to centimeters
    } else if (unit === "cm") {
      return value / 2.54; // Convert centimeters to inches
    } else {
      return 'Invalid unit. Please use "inches" or "cm".';
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
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
                if (res.data.extra.ecSensor) {
                  const maxLevel = convertLength(res.data.extra.water, "inches");
                  const currentLevel = res.data.extra.waterlevel - 20;
                  const percentageLevel = (currentLevel / maxLevel) * 100;

                  setWaterLevel(res.data.extra.waterlevel);
                }
              }
            }
          })
          .catch((err) => {
            // alert("Invalid Credentials");
            console.log("The error", err);
          });
      };
      getMacDetails();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const phHandler = () => {
    Axios.get(`splTransfers?account=FmA4MZVTtY8nKqUZY3voVc6yK6n6R3hh4dH9AxfmWJRb`)
      .then((response) => {
        // setPhData(response.data.data);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        // max: 15,
        stepSize: 60,
      },
      x: {
        // type:'time'
      },
    },
  };
  const phOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 14,
        stepSize: 2,
      },
      x: {
        // type:'time'
      },
    },
  };

  const callAllNewData = () => {
    const user = JSON.parse(localStorage.getItem("phantom_user"));
    axios
      .get("https://solanarootlab-94e7d0d3206e.herokuapp.com/api/sub/graph", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        // setLoading(false);

        // setData(res.data)
        if (res.data.status) {
          console.log({ res });
          updateAllState(res);
          setShowErrorMessage(false);
        } else {
          console.log("error poo");
          setShowErrorMessage(true);
        }
      })
      .catch((err) => {
        // setLoading(false);
        // alert("Invalid Credentials");
        console.log("The error", err);
      });
  };
  useMemo(() => {
    if (refreshPageAfterDataChange) {
      callAllNewData();
    }
  }, [refreshPageAfterDataChange]);
  const [run, setRun] = useState(false);
  function strartWelcomeRide() {
    setRun(true);
  }
  useEffect(() => {
    const visits = window.localStorage.getItem("phantomRide");
    if (!visits) {
      setWelcomeModal(true);
      // window.localStorage.setItem("phantomRide", "1");
    }
  }, []);

  const [welcomeModal, setWelcomeModal] = useState(false);

  const updateAllState = async (res) => {
    setTempToken(res.data.tempToken);
    setHumidityToken(res.data.humidityToken);
    setPHToken(res.data.phToken);
    if (res.data.ecSensor) {
      setECSensorToken(res.data.ecToken);
      setWaterToken(res.data.waterToken);
    } else {
      setECSensorToken("");
      setWaterToken("");
    }

    setPHToken(res.data.phToken);
    const humidVals = res.data.humidValues;
    const ecVals = res.data?.ecValues;
    const waterVals = res.data?.waterValues;
    const tempVals = res.data.tempValues;
    const phVals = res.data.phValues;

    const humidArray =
      humidVals.length > 10 ? humidVals.slice(humidVals.length - 10, humidVals.length) : humidVals;

    const ecArray =
      ecVals?.length > 10 ? ecVals?.slice(ecVals?.length - 10, ecVals?.length) : ecVals;
    // const waterArray =
    //   waterVals?.length > 10
    //     ? waterVals?.slice(waterVals?.length - 10, waterVals?.length)
    //     : waterVals;
    const waterArray = new Array(10).fill(res.data.water);
    const tempArray =
      tempVals.length > 10 ? tempVals.slice(tempVals.length - 10, tempVals.length) : tempVals;
    const phArray = phVals.length > 10 ? phVals.slice(phVals.length - 10, phVals.length) : phVals;

    setHumidityStatData(humidArray[humidArray.length - 1]);
    setECsensorStatData(ecArray ? ecArray[ecArray.length - 1] : 0);
    setWaterStatData(waterArray ? waterArray[waterArray.length - 1] : 0);
    setStatPHData(phArray[phArray.length - 1]);
    setTemperatureStatData(tempArray[tempArray.length - 1]);

    const time =
      res.data.time.length > 10
        ? res.data.time.slice(res.data.time.length - 10, res.data.time.length)
        : res.data.time;

    const humidityDataset = [
      {
        label: "Humidity",
        data: humidArray,
        // data:humid,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ];

    const temperatureDataset = [
      {
        label: "Temperature",
        data: tempArray,
        // data:temp,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ];
    const phDataset = [
      {
        label: "phValue",
        data: phArray,
        // data:ph,
        borderColor: "rgb(25, 99, 232)",
        backgroundColor: "rgba(55, 99, 32, 0.5)",
      },
    ];
    const ecDataset = [
      {
        label: "ECValue",
        data: ecArray,
        // data:ph,
        borderColor: "rgb(25, 49, 232)",
        backgroundColor: "rgba(55, 199, 32, 0.5)",
      },
    ];
    const waterDataset = [
      {
        label: "waterValue",
        data: waterArray,
        // data:ph,
        borderColor: "rgb(125, 149, 232)",
        backgroundColor: "rgba(15, 199, 32, 0.5)",
      },
    ];
    const newTime = time.map((t) => {
      const duration = moment(parseInt(t));
      const formattedTime = duration.format("hh:mm");
      return formattedTime;
    });
    setHumidityData({
      labels: newTime,
      datasets: humidityDataset,
    });
    setTemperatureData({ labels: newTime, datasets: temperatureDataset });
    setPHData({ labels: newTime, datasets: phDataset });
    setECData(res.data.ecToken ? { labels: newTime, datasets: ecDataset } : {});
    setWaterData(res.data.waterToken ? { labels: newTime, datasets: waterDataset } : {});
  };

  return (
    <>
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
      <WelcomeModal
        startToure={strartWelcomeRide}
        openModal={welcomeModal}
        closeModal={() => {
          // window.localStorage.setItem("transationRide", "1");
          setWelcomeModal((state) => !state);
        }}
        textHeader={"Welcome to the P2P Platform"}
        welcomeText="
   Here, we'll walkthough how to sell/buy your cryptocurrencies or tokens"
      />
      <DashboardLayout sx={{ mt: "40px" }}>
        <DashboardNavbar />
        <MDBox py={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3} className={"humidity"}>
              <MDBox mb={1.5}>
                <StakingCard />
                <ComplexStatisticsCard
                  color="dark"
                  icon="ac_unit"
                  title="Last Humidity"
                  // count={humidityStatData.length && humidityStatData[0].changeAmount / 1000000000 + '%'}
                  count={humidityStatData + "%"}
                  // percentage={{
                  //   color: "success",
                  //   amount: "+55%",
                  //   label: "than lask week",
                  // }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className={"temperature"}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="device_thermostat"
                  title="Last Temperature"
                  count={temperatureStatData + " Fahrenheit"}
                  // percentage={{
                  //   color: "success",
                  //   amount: "+3%",
                  //   label: "than last month",
                  // }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className={"ph"}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="auto_graph"
                  title="Last pH"
                  count={phStatData}
                  // percentage={{
                  //   color: "success",
                  //   amount: "+1%",
                  //   label: "than yesterday",
                  // }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3} className={"KHLR"}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="adjust"
                  title="Last KHLR"
                  count="33.33 KHLR"
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
          {!errorMessage ? (
            <Grid container>
              {waterToken && (
                <MDBox
                  id="container"
                  style={{
                    paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2>Water level</h2>
                  <MDBox
                    sx={{
                      height: "50%",
                      width: "50%",
                      // transform: "rotate(-90deg)"
                      "&:@media(max-width:600px)": {
                        height: "80%",
                        width: "80%",
                      },
                    }}
                  >
                    <AnimatedProgressProvider
                      valueStart={0}
                      valueEnd={waterLevel}
                      duration={1.4}
                      easingFunction={easeQuadInOut}
                    >
                      {(value) => {
                        const roundedValue = Math.round(value);
                        return (
                          <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            styles={buildStyles({ pathTransition: "none" })}
                          />
                        );
                      }}
                    </AnimatedProgressProvider>
                  </MDBox>
                </MDBox>
              )}
              <Grid item xs={9}>
                <MDBox mt={4.5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox mb={3}>
                        <div className="humidity-tooltip">
                          <Line data={humidityData} />
                          <span class="humidity-tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=${humidityToken}`}</span>
                        </div>
                        <p>{humidTime}</p>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
              <Grid item xs={9}>
                <MDBox mt={4.5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox mb={3}>
                        <div className="temp-tooltip">
                          <Line data={temperatureData} options={options} />
                          <span class="temp-tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=${tempToken}`}</span>
                        </div>
                        <p>{tempTime}</p>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
              <Grid item xs={9}>
                <MDBox mt={4.5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox mb={3}>
                        <div className="tooltip">
                          <Line data={phData} options={phOptions} />
                          <span class="tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=${PHToken}`}</span>
                        </div>
                        <p>{phtime}</p>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
              {ecToken && (
                <>
                  <Grid item xs={9}>
                    <MDBox mt={4.5}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                          <MDBox mb={3}>
                            <div className="tooltip">
                              <Line data={ECData} options={options} />
                              <span class="tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=${ecToken}`}</span>
                            </div>
                            {/* <p>{waterTime}</p> */}
                          </MDBox>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Grid>
                </>
              )}
            </Grid>
          ) : (
            <MDBox
              sx={{
                width: "100%",
                color: "white",
                fontSize: "16px",
                display: "flex",
                justifyContent: "center",
                margin: "20px",
                padding: "30px",
              }}
            >
              No Mac Connected ,please add it on the{" "}
              <Link to="/data" style={{ textDecoration: "underline" }}>
                {" "}
                data page
              </Link>{" "}
              to see live data
            </MDBox>
          )}
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
