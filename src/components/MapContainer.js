import {
  GoogleMap,
  MarkerF,
  OverlayView,
  InfoBoxF,
} from "@react-google-maps/api";
import { useEffect, useState, useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const Map = ({ filtrd }) => {
  let lats = [];
  let longs = [];

  const [centerLat, setCenterLat] = useState(0);
  const [centerLong, setCenterLong] = useState(0);
  const [center, setCenter] = useState();
  const { loading, notes } = useContext(NoteContext);

  let maxLat = 0;
  let minLat = 0;
  let maxLong = 0;
  let minLong = 0;

  const getCenter = () => {
    lats = [];
    longs = [];
    maxLat = 0;
    minLat = 0;
    maxLong = 0;
    minLong = 0;

    const sortMin = (a, b) => {
      return a - b;
    };

    const sortMax = (a, b) => {
      return b - a;
    };

    filtrd.forEach((note) => {
      lats.push(note.coords.lat);
      longs.push(note.coords.lng);
    });

    minLat = lats.sort(sortMin)[0];
    minLong = longs.sort(sortMin)[0];

    maxLat = lats.sort(sortMax)[0];
    maxLong = longs.sort(sortMax)[0];

    setCenterLat(maxLat - (maxLat - minLat) / 2);
    setCenterLong(maxLong - (maxLong - minLong) / 2);
  };

  useEffect(() => {
    getCenter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrd]);

  return (
    <GoogleMap
      zoom={5}
      center={{lat: centerLat, lng: centerLong}}
      mapContainerClassName="w-full lg:w-1/2 h-[600px]"
      options={{ mapId: "6846c91021828ddf", streetViewControl: false }}
    >
      {filtrd.map(({ event, when, id, coords }) => {
        return (
          <MarkerF
            animation={2}
            label={{
              text: `${event} (${when})`,
              className:
                "p-1 border-2 border-black bg-gradient-to-r from-cyan-500/90 to-blue-500/90 rounded font-bold",
            }}
            key={id}
            position={coords}
          ></MarkerF>
        );
      })}
    </GoogleMap>
  );
};

export default Map;
