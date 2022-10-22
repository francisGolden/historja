import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Autocomplete = ({
  isLoaded,
  setWhere,
  where,
  setCoords,
  address,
  setAddress,
}) => {
  const handleChange = (value) => {
    setAddress(value);
    setWhere(value);
  };

  const handleSelect = (value) => {
    setAddress(value);
    setWhere(value);

    geocodeByAddress(value)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoords(latLng))
      .catch((error) => console.log("error"));
  };

  const TextareaAutosize = require("react-textarea-autosize").default;

  return (
    <div className="flex w-full">
      {!isLoaded ? (
        <div>loading...</div>
      ) : (
        <div className="flex w-full">
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => {
              return (
                <div className="flex flex-col w-full text-2xl">
                  <div
                    className="flex gap-2 justify-start items-center 
                  border-b-2 border-slate-500 "
                  >
                    <p>🌍</p>
                    <TextareaAutosize
                      value={where}
                      data-cy="where"
                      className="bg-transparent font-bold overflow-y resize-none scrollbar-hide
                      w-full py-4 
                focus:outline-none
                                "
                      {...getInputProps({
                        placeholder: "Current location?",
                      })}
                    />
                  </div>

                  <div>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const style = suggestion.active
                        ? {
                            backgroundColor: "rgba(241, 245, 249, 0.5)",
                            cursor: "pointer",
                          }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          className="bg-slate-100/80"
                          key={index}
                          {...getSuggestionItemProps(suggestion, { style })}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }}
          </PlacesAutocomplete>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
