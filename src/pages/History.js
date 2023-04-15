import React from 'react'
import styled from 'styled-components'
import Table from "../components/table"


const Wrapper = styled.div`
margin-left: 266px;
padding: 2rem 1rem;
@media (max-width: 1200px){
  margin-left: unset;
}
`

export default function History() {
  return (
    <Wrapper>
      <Table/>
    </Wrapper>
  )
}
