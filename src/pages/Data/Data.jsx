import React, { useState,useEffect } from "react";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer,  TableRow,TableHead } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import axios from "axios";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";

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
    backgroundColor:"red",
    flexDirection: "row",
    maxWidth: 1200,
    
    justifyContent: "space-between",
  },
  sendButtonActive: {
    backgroundColor: "#14679b",
    color:"#fff !important",
    width:"130px"
  },
   table: {
    // minWidth: 650,
  },
  row:{
    
  },
  error:{
    width:"100%",
    backgroundColor:"red",
    fontSize:"14px",
    display:"flex",
    justifyContent:"center"
  },
  empty:{
    width:"100%",
    color:"white",
    fontSize:"16px",
    display:"flex",
    justifyContent:"center",
    margin:"20px",
    padding:"30px"
  }
};

const Data = () => {
  const [userIP,setUserIP] = useState("")
  const [errorMessage,setShowErrorMessage] = useState("")
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // setLoading(true);
    // signInWithEmailAndPassword(auth, user.email, user.password)
   console.log({data})
  }, [data])

const checkSub = () => {
  const user = JSON.parse(localStorage.getItem("phantom_user"))
  console.log({user})
  if(userIP){
axios
    .get("http://localhost:5000/api/sub",{
     headers: {
        authorization:`Bearer ${user.token}`
      },
      params: {
        IP:userIP
      }
    })
    .then((res) => {
      // setLoading(false);
      console.log({res})
      
      // setData(res.data)
      if(res.data.status){
        // setData(prevData=>prevData[userIP] = res.data.status)
        console.log(res.data.reading)
        let result = res.data.reading
        const newObject = {
          id:result._id,
          IP:userIP,active:true
        }
        console.log({newObject})
        setData(prevData=>[...prevData,newObject])
        setUserIP("")
      }else {
        setShowErrorMessage(`${userIP} not found`)
      }
    })
    .catch((err) => {
      // setLoading(false);
      // alert("Invalid Credentials");
      console.log("The error", err)
      });
  }else{
    alert("werror")
  }
  
}

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <MDBox py={3}  sx={({ breakpoints }) => ({
							
							[breakpoints.only('md')]: {
							width:"300px",
							},
							[breakpoints.only('xl')]: {
								width: '500px',
								maxWidth: '38%',
                margin:'0 auto',
							}
						})} mx={8} mt={4}>
        {/* <Grid container spacing={3}> */}
        {/* <MDBox mb={2} backgroundColor="red"> */}
              <MDInput
                onChange={(e) => {
                  setUserIP(e.target.value);
                  if(errorMessage){
                    setShowErrorMessage("")
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
               checkSub()
              }}
              sx={[
               styles.sendButtonActive
              ]}
            >
              Send
            </Button>


          
  

 

 {data.length === 0 ?  (<MDBox sx={styles.empty}>No Mac Connected</MDBox>)
  :
 (    <TableContainer component={Paper} sx={{my:"30px"}}>
  <Table sx={{ minWidth: 650}} aria-label="simple table">
    {/* <TableHead> */}
      <TableRow sx={{fontWeight:700}}>
        <TableCell>Mac Address</TableCell>
        <TableCell>Connection</TableCell>
      </TableRow>
    {/* </TableHead> */}
    <TableBody>
      {data.map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>{row.IP}</TableCell>
              <TableCell>{row.active ? "connected" : "not connected"}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
)
  }
    </DashboardLayout>
  );
};

export default Data