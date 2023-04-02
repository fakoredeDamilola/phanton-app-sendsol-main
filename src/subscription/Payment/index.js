import { useState } from 'react';
import styled from 'styled-components';
import StripeContainer from './StripeContainer';
import Card from 'subscription/Card';

const Wrapper = styled.div`
padding: 5rem;
display: flex;
flex-direction: column;
align-items: center;
.msg{
  margin-bottom: 3rem;
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
  return (
    <Wrapper>
      <h1 className='msg'>Your are about to purchase { (sub >= 60) ? `${sub / 60} ${(sub / 60 > 1) ? " hours" : " hour"}` : `${sub} ${(sub > 1) ? " minutes" : "minute"}` } subscription</h1>
      { showItem ? (
        <StripeContainer />
      ) : (
        <>
          {/* <h3>${price}.00</h3> */}
            <Card price={ price } sub={ sub } color={ color } />
          <button style={{backgroundColor: `${color}`}} onClick={ () => setShowItem(true) }>Purchase Subscription</button>
        </>
      ) }
    </Wrapper>
  );
}

export default Index;