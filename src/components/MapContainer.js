import {GoogleMap, MarkerF, OverlayView, InfoBoxF} from "@react-google-maps/api"
import marker from "../img/marker.svg"


const Map = ({filtrd}) => {

    return (
    <GoogleMap zoom={4} center={{lat: 41.9027835, lng: 12.4963655}}
    mapContainerClassName="w-full lg:w-1/2 h-[400px]" options={{mapId: "6846c91021828ddf", 
    streetViewControl: false}}>
        {filtrd.map((event)=>{
            return (
                <MarkerF animation={2} 
                label={{text:`${event.event} (${event.when})`, 
                className: "p-1 border-2 shadow-lg border-black rounded bg-zinc-100/90 font-bold text-white"}} 
                
                key={event.id} 
                position={event.coords}>

                </MarkerF>
            )
        })}
        
    </GoogleMap>)
}

export default Map;

