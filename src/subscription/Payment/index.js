import { useState } from 'react';
import styled from 'styled-components';
import StripeContainer from './StripeContainer';
import Card from 'subscription/Card';
import { Alert } from 'subscription/Alert';



const Wrapper = styled.div`
padding: 5rem;
display: flex;
flex-direction: column;
align-items: center;
.msg{
  margin-bottom: 3rem;
  text-align: center;
}
button{
  margin-top: 3rem; 
  color :#0e0e0e;
  font-size: 1.2rem;
  padding: 1rem;
  border-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
`

function Index({price, sub, color}) {
  const [showItem, setShowItem] = useState(false);
  const [alertDetails, setAlertDetails] = useState({ show: false, message: "", color: "black" })
  const subString = (sub >= 60) ? `${sub / 60} ${(sub / 60 > 1) ? " hours" : " hour"}` : `${sub} ${(sub > 1) ? " minutes" : "minute"}`;
  return (
    <Wrapper>
      { alertDetails.show && <Alert color={ alertDetails.color } message={ alertDetails.message } onClick={()=>setAlertDetails({color:"black", message:"",show:false})} /> }

      <h1 className='msg'>Your are about to purchase { subString } subscription at { price.toLocaleString("en-US", { style: "currency", currency: "USD" }) }</h1>
      { showItem ? (
        <StripeContainer handlers={ { setShowItem, setAlertDetails } } price={price} description={`${subString} subscription`} />
      ) : (
        <>
          {/* <h3>${price}.00</h3> */}
            <Card price={ price } sub={ sub } color={ color }setCard={()=>{}} />
          <button  onClick={ () => setShowItem(true) }>Purchase Subscription</button>
        </>
      ) }
    </Wrapper>
  );
}

export default Index; 