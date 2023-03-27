import React from "react";
import { useParams } from "react-router-dom";

function Rooms() {
  const { id } = useParams();
  return (
    <div>
      <h1>Rooms {id && id}</h1>
    </div>
  );
}

export default Rooms;
