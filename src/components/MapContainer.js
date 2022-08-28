import { useMemo } from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"

const Map = ({coords}) => {
    return (
    <GoogleMap zoom={5} center={{lat: 48.2085, lng: 16.3721}}
    mapContainerClassName="w-full h-[400px]">
        {coords.map((coord)=>{
            return (
                <Marker position={coord}>
                </Marker>
            )
        })}
        
    </GoogleMap>)
}

export default Map;

