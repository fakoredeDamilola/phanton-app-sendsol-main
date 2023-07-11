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
import { useState, useEffect } from "react";
import "../../assets/css/style.css";
import StakingCard from "./components/StakingCard";
import axios from "axios";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import moment from "moment/moment";

function Dashboard() {
  // const socket = io.connect("http://localhost:5000");
  const [socket, setSocket] = useState(null);
  // const [options,setOptions] = useState({
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //   },
  //   scales: {
  //     y:
  //       {
  //         min: 0,
  //         // max: 15,
  //         stepSize: 10,
  //       },
  //     x:
  //       {
  //         // ticks:{
  //         //   values:new Array(10).fill(12)
  //         // }
  //       },
  //   },
  // })
  const [humidityData, setHumidityData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [humidityStatData, setHumidityStatData] = useState(0);
  const [temperatureStatData, setTemperatureStatData] = useState(0);
  const [temperatureData, setTemperatureData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [phData, setPHData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [phStatData, setStatPHData] = useState(0);
  const [tempToken, setTempToken] = useState("");
  const [humidityToken, setHumidityToken] = useState("");
  const [PHToken, setPHToken] = useState("");
  const [tempData, setTempData] = useState(0);
  const [errorMessage, setShowErrorMessage] = useState(false);

  const [phtime, setPhTime] = useState(null);
  const [tempTime, setTempTime] = useState(null);
  const [humidTime, setHumidTime] = useState(null);
  const humidityHandler = () => {
    Axios.get(`splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`)
      .then((response) => {
        setHumidityData(response.data.data);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const tempHandler = () => {
    Axios.get(`splTransfers?account=FCgYUwNW3Dts3dteLQjQWwz5E6gytJgLDVcCqYXB7u4k`)
      .then((response) => {
        // setTempData(response.data.data);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.on("success", (res) => {
      console.log("calling");
      callAllNewData();
      // updateAllState(res);
    });
  }, [socket]);

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

  useEffect(() => {
    newCall();
    callAllNewData();
  }, []);

  const callAllNewData = () => {
    const user = JSON.parse(localStorage.getItem("phantom_user"));
    axios
      .get("http://localhost:5000/api/sub/graph", {
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
  const newCall = async (address) => {
    console.log({ address }, "newCall", process.env.REACT_APP_PUBLIC_SOLANA);
    try {
      let data;
      const response = await Axios.get(
        `https://public-api.solscan.io/account/splTransfers?account=${address}&toTime=10&limit=10&offset=1`,
        {
          headers: {
            token: process.env.REACT_APP_PUBLIC_SOLANA,
          },
        }
      );
      const res = response.data.data;
      console.log({ res });
      return res;
    } catch (e) {
      console.log({ e }, "kekmkmekmekkemkmekmemkmemk");
    }
  };
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min + 1) + min;
  }
  const updateAllState = async (res) => {
    console.log;
    setTempToken(res.data.tempToken);
    setHumidityToken(res.data.humidityToken);
    setPHToken(res.data.phToken);
    const humidVals = res.data.humidValues;
    const tempVals = res.data.tempValues;
    const phVals = res.data.phValues;

    console.log({ tempVals });
    const humidArray =
      humidVals.length > 10 ? humidVals.slice(humidVals.length - 10, humidVals.length) : humidVals;
    const tempArray =
      tempVals.length > 10 ? tempVals.slice(tempVals.length - 10, tempVals.length) : tempVals;
    const phArray = phVals.length > 10 ? phVals.slice(phVals.length - 10, phVals.length) : phVals;

    console.log(tempArray[tempArray.length - 1], "JEJJEJJEJJ");
    setHumidityStatData(humidArray[humidArray.length - 1]);
    setStatPHData(phArray[phArray.length - 1]);
    setTemperatureStatData(tempArray[tempArray.length - 1]);

    const time =
      res.data.time.length > 10
        ? res.data.time.slice(res.data.time.length - 10, res.data.time.length)
        : res.data.time;

    console.log({ humidArray, time });

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
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
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
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="device_thermostat"
                title="Last Temperature"
                count={temperatureStatData + " Celsius"}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
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
          <Grid item xs={12} md={6} lg={3}>
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
            No Mac Connected,please add it on the <Link to="/data"> data page</Link> to see live
            data
          </MDBox>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
