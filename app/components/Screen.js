import React,{Fragment} from 'react'
import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components/native'

import Constants from 'expo-constants'
import colors from '../config/colors'
import { Error } from '../components/form'
const Container = styled.SafeAreaView`
  background-color: ${colors.lightGray2};
  padding-top: ${Constants.statusBarHeight}px;
  flex: 1;
`
const Screen = ({ children, style, loading = false, error = false }) => {
  return (
    <Container style={style}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <Fragment>
          <Error error={error} visible={error} />
          <Fragment>{children}</Fragment>
        </Fragment>
      )}
    </Container>
  )
}

export default Screen
