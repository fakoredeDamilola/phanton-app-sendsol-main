import { useEffect, useState } from "react";
import styled from "styled-components";
import StripeContainer from "./StripeContainer";
import Card from "subscription/Card";
import { Alert } from "subscription/Alert";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import axios from "axios";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .msg {
    margin-bottom: 3rem;
    text-align: center;
  }
  button {
    margin-top: 3rem;
    color: #0e0e0e;
    font-size: 1.2rem;
    padding: 1rem;
    border-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

function Index({ price, sub, color }) {
  const [showItem, setShowItem] = useState(false);
  const [userIP, setUserIP] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [available, setAvailable] = useState(false);
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
          if (res.data.data.MacAddress) {
            setUserIP(res.data.data.MacAddress);
          }
        } else {
          setShowErrorMessage(`${userIP} not found`);
        }
      })
      .catch((err) => {
        // alert("Invalid Credentials");
        console.log("The error", err);
      });
  }, []);
  const [alertDetails, setAlertDetails] = useState({ show: false, message: "", color: "black" });
  const subString =
    sub >= 60
      ? `${sub / 60} ${sub / 60 > 1 ? " hours" : " hour"}`
      : `${sub} ${sub > 1 ? " minutes" : "minute"}`;
  const checkSub = async () => {
    const user = JSON.parse(localStorage.getItem("phantom_user"));
    console.log({ user });
    let avail = false;
    if (userIP) {
      const data = await axios.get("http://localhost:5000/api/sub", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
        params: {
          IP: userIP,
        },
      });
      console.log({ data });
      const res = data;

      // setLoading(false);
      console.log({ res });

      // setData(res.data)
      if (res.data.status) {
        setAvailable(true);
        avail = true;
      } else {
        setAvailable(false);
        avail = false;
        setShowErrorMessage(`${userIP} not found`);
      }
      return avail;
    } else {
      alert("error");
    }
  };
  const checkInfo = async () => {
    if (userIP) {
      // setShowItem(true);
      const user = JSON.parse(localStorage.getItem("phantom_user"));
      console.log({ user });
      const data = {
        name: `${subString} subscription`,
        subRatePerMin: price,
        hasActiveSub: true,
        email: user.email,
        durationInMinutes: `${24 * 60 * 60}`,
        MacAddress: userIP,
      };

      console.log({ user, data });
      try {
        axios
          .post("http://localhost:5000/api/sub", data, {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            console.log({ res });
          })
          .catch((err) => {
            console.log("The error", err);
          });
        alert("subscription successfully, you are good to go");
      } catch (e) {
        alert("an error occurred");
      }
    } else {
      alert("no mac address,add the address in the data page");
    }
  };
  return (
    <Wrapper>
      {alertDetails.show && (
        <Alert
          color={alertDetails.color}
          message={alertDetails.message}
          onClick={() => setAlertDetails({ color: "black", message: "", show: false })}
        />
      )}

      <h1 className="msg">
        Your are about to purchase {subString} subscription at{" "}
        {price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </h1>
      {showItem ? (
        <StripeContainer
          macAddress={userIP}
          handlers={{ setShowItem, setAlertDetails }}
          price={price}
          description={`${subString} subscription`}
        />
      ) : (
        <>
          {/* <h3>${price}.00</h3> */}
          <Card price={price} sub={sub} color={color} setCard={() => {}} />
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
            <h3 style={{ textAlign: "center" }}>{userIP}</h3>
            <p style={{ fontSize: "14px", textAlign: "center" }}>
              This is your macAddress, that subscription will be added to. please change it on the{" "}
              <h4 style={{ textDecoration: "underline", display: "inline-block" }}>
                <Link to="/data">data page</Link>
              </h4>{" "}
              if it is not correct
            </p>
            {showErrorMessage ?? (
              <MDBox
                sx={{
                  width: "100%",
                  backgroundColor: "red",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {showErrorMessage}
              </MDBox>
            )}
          </MDBox>
          <button onClick={checkInfo}>Purchase Subscription</button>
        </>
      )}
    </Wrapper>
  );
}

export default Index;
