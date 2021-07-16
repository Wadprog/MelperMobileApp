import React from 'react'
import styled from 'styled-components/native'

import colors from '../config/colors'

const Container = styled.View`
  width: 150px;
  height: 50px;
  justify-content: center;
  flex-direction: row;
`
const ActionButton = styled.TouchableOpacity`
  width: 50px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  
`
const IncrementBtn = styled(ActionButton)`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`
const DecrementBtn = styled(ActionButton)`
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
`
const ValueContainer = styled.View`
  width: 50px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`
const Sign = styled.Text``
const CurrentValue = styled.Text``

const IncrementDecrement = ({ value = 0, onDecrement, onIncrement }) => {
  return (
    <Container>
      <DecrementBtn onPress={onDecrement}>
        <Sign>-</Sign>
      </DecrementBtn>
      <ValueContainer>
        <CurrentValue>{value}</CurrentValue>
      </ValueContainer>
      <IncrementBtn onPress={onIncrement}>
        <Sign>+</Sign>
      </IncrementBtn>
    </Container>
  )
}

export default IncrementDecrement
