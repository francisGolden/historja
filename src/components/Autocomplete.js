import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";


const Autocomplete = ({ isLoaded, setWhere, where, setCoords, address, setAddress }) => {


    const handleChange = (value) => {
        setAddress(value)
        setWhere(value)
    }

    const handleSelect = (value) => {
        setAddress(value)
        setWhere(value)
        
        geocodeByAddress(value)
        .then(results => getLatLng(results[0]))
        .then(latLng => setCoords(latLng))
        .catch(error => console.log("error"))

    }


    return (
        <div className="flex w-full">
            {(!isLoaded) ? (<div>loading...</div>) :
                (<div className="flex w-full">
                    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>

                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                            return (
                            <div className="flex flex-col w-full">
                                <textarea value={where} className="bg-slate-100/80 p-1" {...getInputProps({
                                    placeholder: "Search Places ...",
                                })} />
                                <div>
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion, index) => {
                                        const style = suggestion.active ? {
                                            backgroundColor: "rgba(241, 245, 249, 0.5)", cursor: "pointer"
                                        } :
                                            { backgroundColor: "#ffffff", cursor: "pointer" }
                                        return (
                                            <div className="bg-slate-100/80" key={index} {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>)
                        }}

                    </PlacesAutocomplete>
                </div>)
            }
        </div>

    )
}

export default Autocomplete;