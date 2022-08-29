import {GoogleMap, MarkerF} from "@react-google-maps/api"


const Map = ({filtrd}) => {

    return (
    <GoogleMap zoom={4} center={{lat: 41.9027835, lng: 12.4963655}}
    mapContainerClassName="w-full lg:w-1/2 h-[400px]">
        {filtrd.map((event)=>{
            return (
                <MarkerF label={`${event.event} (${event.when})`} key={event.id} position={event.coords}>

                </MarkerF>
            )
        })}
        
    </GoogleMap>)
}

export default Map;

