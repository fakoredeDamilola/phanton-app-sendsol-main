
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Line } from "react-chartjs-2";
import Axios from "../../axios/Axios";
import { useState, useEffect } from "react";
import moment from 'moment';

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import '../../assets/css/style.css';

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [humidityData, setHumidityData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [phData, setPhData] = useState([]);

  const humidity_data = {
    labels: humidityData && humidityData.map(humidity => moment(humidity.blockTime * 1000).format('hh:mm:ss')).reverse(),
    datasets: [
      {
        label: "Humidity",
        data: humidityData && humidityData.map(humidity => humidity.changeAmount / 1000000000).reverse(),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  const temp_data = {
    labels: tempData && tempData.map(humidity => moment(humidity.blockTime * 1000).format('hh:mm:ss')).reverse(),
    datasets: [
      {
        label: "Temperature (Celsius)",
        data: tempData && tempData.map(humidity => humidity.changeAmount / 1000000000).reverse(),
        fill: true,
        backgroundColor: "rgba(255,0,0,0.2)",
        borderColor: "rgba(255,0,0,1)"
      }
    ]
  };

  const ph_data = {
    labels: phData && phData.map(humidity => moment(humidity.blockTime * 1000).format('hh:mm:ss')).reverse(),
    datasets: [
      {
        label: "pH",
        data: phData && phData.map(humidity => humidity.changeAmount / 1000000000).reverse(),
        fill: true,
        backgroundColor: "rgba(128,0,0,0.2)",
        borderColor: "rgba(128,0,0,1)"
      }
    ]
  };

  const humidityHandler = () => {
    Axios.get(`splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`)
      .then(response => {
        setHumidityData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const tempHandler = () => {
    Axios.get(`splTransfers?account=FCgYUwNW3Dts3dteLQjQWwz5E6gytJgLDVcCqYXB7u4k`)
      .then(response => {
        setTempData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  }

  const phHandler = () => {
    Axios.get(`splTransfers?account=FmA4MZVTtY8nKqUZY3voVc6yK6n6R3hh4dH9AxfmWJRb`)
      .then(response => {
        setPhData(response.data.data);
      })
      .catch(error => {
        console.log({ error });
      });
  }

  useEffect(() => {
    humidityHandler();
    tempHandler();
    phHandler();
  }, []);

  useEffect(() => {
    const myInterval = setInterval(function () {
      humidityHandler();
      tempHandler();
      phHandler();
    }, 60000);

    return () => {
      clearInterval(myInterval);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="ac_unit"
                title="Last Humidity"
                count={humidityData.length && humidityData[0].changeAmount / 1000000000 + '%'}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="device_thermostat"
                title="Last Temperature"
                count={tempData.length && tempData[0].changeAmount / 1000000000 + ' Celsius'}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="auto_graph"
                title="Last pH"
                count={phData.length && (phData[0].changeAmount / 1000000000).toFixed(2)}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
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
        <Grid container>
          <Grid item xs={9}>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <MDBox mb={3}>
                    <div className="humidity-tooltip">
                      <Line data={humidity_data} />
                      <span class="humidity-tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`}</span>
                    </div>
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
                      <Line data={temp_data} />
                      <span class="temp-tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=9iYqFPocWJhALeJ1bKPrF7k8La1UtV88XvP8aZTSho7y`}</span>
                    </div>
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
                      <Line data={ph_data} />
                      <span class="tooltiptext">{`https://public-api.solscan.io/account/splTransfers?account=FmA4MZVTtY8nKqUZY3voVc6yK6n6R3hh4dH9AxfmWJRb`}</span>
                    </div>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
