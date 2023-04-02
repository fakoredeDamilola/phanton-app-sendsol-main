import React from 'react'
import styled from "styled-components"
const CardStyle = styled.div`
height: 350px;
/* background-color: green; */
/* color: white; */
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
height: 300px;
max-width: 350px;
width: 100%;
border-radius: 1rem;
transition: all 0.3s;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: ${props => props.color};
color: #eee;
h5{
  font-size: 3rem;
}
h3{
  font-size: 5rem;
}
&:hover{
  transform: scale(107%)
}
`

function Card({ sub, price, color, setCard }) {
  const clickHandler = () => setCard({ price, sub, color})
  return (
    <CardStyle color={color} onClick={clickHandler}>
      <h5>{ (sub >= 60) ? `${sub / 60} ${(sub / 60 > 1) ? " hours" : " hour"}` : `${sub} ${(sub > 1) ? " minutes" : "minute"}` }</h5>
      <h3>${ price }</h3>
    </CardStyle>
  )
}

export default Card
