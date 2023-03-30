import React, { useEffect, useState } from "react";
import { getAllData } from "../../mockService/service";
import Button from "../sharedComponents/Button";
import MainContainer from "../sharedComponents/MainContainer";
import Table from "../sharedComponents/Table";

const availableStates = {
  Available: 6,
  Booked: 7,
};

function Rooms() {
  const [data, setData] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);
  const [activeTab, setActiveTab] = useState("All Rooms");
  const tabs = ["All Rooms", "Availables"];

  const rowsToRender = (item) => {
    return (
      <>
        <td /* onClick={() => handleRedirect(item.id)} */>
          <div className="rooms_firstColumn">
            <div className="img">
              <img src={item.photos[0]} alt="thumbnail" />
            </div>
            <div>
              <p>{item.roomNumber}</p>
              <p className="idField">#{item.id}</p>
            </div>
          </div>
        </td>
        <td>{item.roomType}</td>
        <td style={{ maxWidth: "375px" }}>
          {item.amenities.map((el, i, arr) =>
            i < arr.length - 1 ? `${el}, ` : `${el}.`
          )}
        </td>
        <td>${item.price}</td>
        <td>
          $
          {item.offer
            ? item.price * (1 - parseInt(item.discount) / 100)
            : item.price}
        </td>
        <td>
          <Button variant={availableStates[item.status]}>{item.status}</Button>
        </td>
      </>
    );
  };

  async function getData() {
    const newData = await getAllData("mockData/rooms_data.json");
    setData(newData);
  }

  useEffect(() => {
    const newData = structuredClone(data);
    if (activeTab === "Availables") {
      const filterData = newData.filter((item) => item.status === "Available");
      setDataToRender(filterData);
    } else {
      setDataToRender(newData);
    }
  }, [activeTab, data]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainContainer>
      <Table
        data={dataToRender}
        option="rooms"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rows={rowsToRender}
        newBtn="New Room"
      />
    </MainContainer>
  );
}

export default Rooms;
