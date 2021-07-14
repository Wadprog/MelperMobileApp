import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Slide from '../components/SlideButton'
const SP = 25,
  WH = Dimensions.get('window').width

const ImageWrapper = styled.View`
  width: ${WH - SP}px;
  height: ${WH - SP}px;
  border-radius: ${WH}px;
  justify-content: center;
  align-items: center;
  padding: ${SP}px;
  flex-direction: row;
`
const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  margin: 0 10px;
`

export default function PhotoCarousel({ photos }) {
  return (
    <ImageWrapper>
      <Slide name="chevron-left" size={24} />
      <Image source={photos[0]} />
      <Slide name="chevron-right" size={24} />
    </ImageWrapper>
  )
}
