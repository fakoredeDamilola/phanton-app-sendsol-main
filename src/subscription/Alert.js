import React from "react"
import styled from "styled-components"

const AlertWrapper = styled.div`
width: 250px;
padding: 10px;
min-height: 50px;
border-top-right-radius: 10px;
border-bottom-left-radius: 10px;
border-bottom: 3px solid ${props => props.color};
 box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
font-size: 14px;
position: fixed;
right: 2rem;
top: 2rem;
background-color: white;
.cancel{
  content: "X";
  font-size: 16px;
  position: absolute;
  right: 10px;
  top: 10px;
  font-weight: 700;

}
p{
  padding: 0 10px;
}
`
export const Alert = ({ message, color, onClick }) => <AlertWrapper onClick={ onClick } color={ color }>
  <p>{ message }</p>
  <span className="cancel">X</span>
</AlertWrapper>