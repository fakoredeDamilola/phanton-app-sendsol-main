import React, { useContext, useEffect, useState } from 'react'
import Styled from "styled-components"
import { useNavigate } from 'react-router-dom'
import Card from "./Card"
import Payment from "./Payment/index"
import Table from "../components/table"
import axios from 'axios'



const Wrapper = Styled.div`
font-family: "Roboto","Helvetica","Arial",sans-serif;
.title{
  font-size: 3rem;
  margin: 2rem auto;
  text-align: center;
}
margin: 2rem auto;
/* background: #ccc; */
.container{
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(200px,350px));
  grid-gap: 2rem;
}
padding: 2rem;
`
const InputStyle = Styled.div`
`

const options = [
  { sub: 1440, price: 2, color: "#95e9bb" },
  { sub: 720, price: 3.5, color: "#0ca62b" },
  { sub: 60, price: 10, color: "#62c5fd" },
  { sub: 30, price: 25, color: "#707f2a" },
  { sub: 10, price: 55, color: "#b00c88" },
  { sub: 5, price: 99, color: "#8fdb2d" },
  { sub: 2, price: 200, color: "#6a1b7f" },
  { sub: 1, price: 350, color: "#01229c" },
]

function Subscription() {

  const [card, setCard] = useState()
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const navigate = useNavigate()

  return (
    <>
      <button style={ { margin: "4rem 2rem 0", border: "none", boxShadow: "none", fontSize: "1.5rem" } } onClick={ card ? () => setCard(null) : () => navigate("/dashboard") } > { "<" } back</button>
      { !card ? <Wrapper>
        <h3 className='title'>Subscription and Pricing</h3>
        <div className='container'>
          { options.map((el, index) => <Card key={ el.sub } sub={ el.sub } price={ el.price } color={ el.color } setCard={ setCard } />) }
        </div>
      </Wrapper> : <Payment price={ card.price } sub={ card.sub } color={ card.color } setCard={ () => null } /> }
    </>
  )
}

export default Subscription
