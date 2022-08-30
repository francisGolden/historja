import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";


const EditAutocomplete = ({ isLoaded, setNewWhere, newWhere, setNewCoords, address, setAddress }) => {

    const handleChange = (value) => {
        setAddress(value)
        setNewWhere(value)
    }

    const handleSelect = (value) => {
        setAddress(value)
        setNewWhere(value)
        
        geocodeByAddress(value)
        .then(results => getLatLng(results[0]))
        .then(latLng => setNewCoords(latLng))
        .catch(error => console.log("error"))

    }


    return (
        <div className="flex w-full">
            {(!isLoaded) ? (<div>loading...</div>) :
                (<div className="flex w-full">
                    <PlacesAutocomplete value={newWhere} onChange={handleChange} onSelect={handleSelect}>

                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                            return (
                            <div className="flex flex-col w-full">
                                <textarea value={newWhere} className="bg-slate-100/80 p-1" {...getInputProps({
                                    placeholder: "Rome, Firenze, Sondrio, ...",
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

export default EditAutocomplete;