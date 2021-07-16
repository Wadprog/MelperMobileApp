import React, { useState } from 'react'
import styled from 'styled-components/native'

// Custom  dependencies 
import Dot from './Dot'
import size from '../config/size'

// Components 
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${size.padding};
`

const Dots = ({ selectedDot = 0, onSelectDot, amountOfDots }) => {
    
  if (!amountOfDots || amountOfDots < 2) return null
  const [currentActiveDot, setCurrentActiveDot] = useState(selectedDot)
  const handleSelect = (index) => {
    if (onSelectDot) return onSelectDot(index)
    return setCurrentActiveDot(index)
  }
  const DotsArray = () => {
    const arr = []
    for (let index = 0; index < amountOfDots; index++) {
      arr.push(
        <Dot
          key={`dot-${index}`}
          active={index == currentActiveDot}
          onPress={() => handleSelect(index)}
        />
      )
    }
    return arr
  }
  return <Container>{DotsArray()}</Container>
}

export default Dots
