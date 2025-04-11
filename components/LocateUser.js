import * as Location from 'expo-location'
import { useCallback, useEffect, useState } from 'react'

const LocateUser = ({ onLocationUpdate }) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  //get current location coordinates
  const getLocationAsync = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status === 'granted') {
      try {
        let location = await Location.getCurrentPositionAsync({})

        setHasLocationPermission(true)
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)

        onLocationUpdate(location.coords.latitude, location.coords.longitude)
      } catch (error) {
        console.error(error)
      }
    } else {
      alert('Location permission not granted')
    }
  }, [onLocationUpdate])

  useEffect(() => {
    getLocationAsync()
  }, [getLocationAsync, latitude, longitude, hasLocationPermission])
}

export default LocateUser
