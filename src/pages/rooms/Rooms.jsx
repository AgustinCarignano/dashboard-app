import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../mockService/service";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import Table, {
  ImgRowContainer,
  RowContainer,
  RowDataSmaller,
} from "../../components/Table";

const availableStates = {
  Available: 6,
  Booked: 7,
};

function Rooms() {
  const [data, setData] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);
  const [activeTab, setActiveTab] = useState("All Rooms");
  const [orderBy, setOrderBy] = useState("roomNumber");
  const [ascPrice, setAscPrice] = useState(false);
  const navigate = useNavigate();
  const tabs = ["All Rooms", "Availables"];

  function handleRedirect(id) {
    const path = `/dashboard-app/rooms/${id}`;
    navigate(path);
  }

  const tableHeader = [
    { label: "Room", action: () => setOrderBy("roomNumber") },
    { label: "Room Type" },
    { label: "Amenities" },
    {
      label: "Price",
      action: () => {
        setOrderBy("price");
        setAscPrice((prev) => !prev);
      },
    },
    { label: "Offer Price" },
    {
      label: "Status",
      action: () => setOrderBy("status"),
    },
  ];

  const rowsToRender = (item) => {
    return (
      <>
        <td>
          <RowContainer
            justify="normal"
            onClick={() => handleRedirect(item.id)}
          >
            <ImgRowContainer>
              <img src={item.photos[0]} alt="thumbnail" />
            </ImgRowContainer>
            <div>
              <p>{item.roomNumber}</p>
              <RowDataSmaller>#{item.id}</RowDataSmaller>
            </div>
          </RowContainer>
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
    const newData = await getAllData("rooms_data.json");
    setData(newData);
  }

  useEffect(() => {
    const newData = structuredClone(data);
    let manipulatedData = [];
    if (activeTab === "Availables") {
      const filterData = newData.filter((item) => item.status === "Available");
      manipulatedData = filterData;
    } else {
      manipulatedData = newData;
    }
    manipulatedData.sort((a, b) => {
      let inv = 1;
      if (ascPrice) inv = -1;
      if (a[orderBy] > b[orderBy]) return inv * 1;
      else if (a[orderBy] < b[orderBy]) return inv * -1;
      else return 0;
    });
    setDataToRender(manipulatedData);
  }, [activeTab, data, orderBy, ascPrice]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainContainer>
      <Table
        data={dataToRender}
        option="rooms"
        tableHeader={tableHeader}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rows={rowsToRender}
        newBtn="New Room"
        paginate={true}
      />
    </MainContainer>
  );
}

export default Rooms;
