import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const MapMarker = ({ text }) => <div>{text}</div>;

const LocationSelector = ({ onSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = ({ lat, lng }) => {
    setSelectedLocation({ lat, lng });
    onSelect({ lat, lng });
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={1}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <MapMarker
            lat={selectedLocation.lat}
            lng={selectedLocation.lng}
            text="Selected Location"
          />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default LocationSelector;
