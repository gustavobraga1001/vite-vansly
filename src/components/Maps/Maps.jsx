import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const Maps = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB3Qj7ytVrui6Psa-sR5cJgyFAStIQAPx0"
      })

    return (
    <div className='maps'>
        {
            isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{width: '100%', height:'80vh'}}
                  center={{
                    lat: -23.61741720501313, 
                    lng: -46.57452432873151
                  }}
                  options={{
                    disableDefaultUI: true,
                    zoomControl:false,
                    styles:[
                        {
                            "featureType": "administrative",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "hue": "#000000"
                                },
                                {
                                    "lightness": -100
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.locality",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "saturation": "-3"
                                },
                                {
                                    "gamma": "1.81"
                                },
                                {
                                    "weight": "0.01"
                                },
                                {
                                    "hue": "#ff0000"
                                },
                                {
                                    "lightness": "17"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.land_parcel",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "hue": "#dddddd"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": -3
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "hue": "#000000"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": -100
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "hue": "#000000"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": -100
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "hue": "#bbbbbb"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 26
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "hue": "#ffffff"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 100
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.text",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#797979"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#868686"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "hue": "#ff0000"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 100
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "labels.text",
                            "stylers": [
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#b6b2b2"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "hue": "#ff0000"
                                },
                                {
                                    "lightness": -100
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "hue": "#ff0000"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 100
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "hue": "#000000"
                                },
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": -100
                                },
                                {
                                    "visibility": "off"
                                }
                            ]
                        }
                    ]
                  }}
                  zoom={15}
                >
                  <></>
                </GoogleMap>
            ) : <></>
        }
    </div>
    )
}

export default Maps