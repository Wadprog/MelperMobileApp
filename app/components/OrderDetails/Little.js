import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

// Custom dependencies
import sizes from '../../config/size'
import colors from '../../config/colors'

// Components
const Container = styled.View`
  position: absolute;
  bottom: 5%;
  left: ${sizes.padding}px;
  right: ${sizes.padding}px;
  flex-direction: row;
  height: 70px;
  background-color: ${colors.white};
  border-radius: 35px;
`
const IconContainer = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`
const MiddleButtonWrapper = styled.TouchableOpacity`
  position: relative;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  background-color: ${colors.secondary};
`
function Little({ amountOfOrders, Total, ...rest }) {
  return (
    <Container>
      <IconContainer>
        <TouchableOpacity onPress={() => rest.onSetLocation()}>
          <MaterialCommunityIcons
            name="map-marker"
            color={colors.secondary}
            size={35}
          />
        </TouchableOpacity>
      </IconContainer>

      <IconContainer>
        <MiddleButtonWrapper onPress={() => rest.onOrder()}>
          <MaterialCommunityIcons name="cart" color={colors.white} size={35} />
        </MiddleButtonWrapper>
      </IconContainer>

      <IconContainer>
        <TouchableOpacity onPress={() => rest.onSetCreditCard()}>
          <MaterialCommunityIcons
            name="credit-card"
            color={colors.secondary}
            size={35}
          />
        </TouchableOpacity>
      </IconContainer>
    </Container>
  )
}

export default Little

// {
//   amountOfOrders && (
//     <View
//       style={{
//         borderRadius: 99,
//         width: 30,
//         height: 30,
//         position: 'absolute',
//         top: -10,
//         right: -4,
//         backgroundColor: colors.primary,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Text
//         style={{
//           color: colors.white,
//           fontSize: 16,
//           fontWeight: 'bold',
//         }}
//       >
//         {amountOfOrders}
//       </Text>
//     </View>
//   )
// }
