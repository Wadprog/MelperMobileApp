import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  position: null,
  origin: null,
  error: null,
  destination: null,
  currentLocation: null,
  travelTimeInformation: null,
}
const Map = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setDepartureFrom: (state, action) => {
      state.currentLocation = action.payload
    },
    setPosition: (loc, action) => {
      loc.position = action.payload
    },
    setOrigin: (state, action) => {
      loc.origin = action.payload
    },
    setTravelTimeInformation: (state, action) => {
      console.log('Receiving info')
      console.log(action.payload)
      state.travelTimeInformation = action.payload
    },
  },
})

export default Map.reducer
export const {
  setPosition,
  setOrigin,
  setDepartureFrom,
  setDestination,
  setTravelTimeInformation,
} = Map.actions
export const getLocation = (state) => state.map
