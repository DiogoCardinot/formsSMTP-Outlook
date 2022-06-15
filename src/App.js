import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

import "./App.css";
import Form from "./forms";

const position = [51.505, -0.09];
export default function App() {
  return (
    <div>
      <div>diogo</div>
      <Form></Form>
      {/* <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "100vh" }}
      ></MapContainer> */}
    </div>
  );
}
