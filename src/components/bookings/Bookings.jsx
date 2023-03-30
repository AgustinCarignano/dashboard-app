import React, { useEffect, useState } from "react";
import { getAllData } from "../../mockService/service";
import MainContainer from "../sharedComponents/MainContainer";
import Table from "../sharedComponents/Table";
import Button from "../sharedComponents/Button";
import Modal from "../sharedComponents/Modal";
import { useNavigate } from "react-router-dom";

const availableStates = {
  "Check In": 6,
  "Check Out": 7,
  "In Progress": 8,
};

function Bookings() {
  const [data, setData] = useState([]);
  const [orderedData, setOrderedData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Bookings");
  const navigate = useNavigate();
  const tabs = ["All Bookings", "Checking In", "Checking Out", "In Progress"];

  async function getData() {
    const newData = await getAllData("mockData/bookings_data.json");
    setData(newData);
    setOrderedData(newData);
  }

  function filterData(dataArr, orderCriteria) {
    const orderList = (arr, criteria) => {
      arr.sort((a, b) => {
        if (a[criteria] > b[criteria]) return 1;
        else if (a[criteria] < b[criteria]) return -1;
        return 0;
      });
      return arr;
    };
    switch (orderCriteria) {
      case "All Bookings":
        return orderList(dataArr, "orderDate");
      case "Checking In":
        return orderList(dataArr, "checkIn");
      case "Checking Out":
        return orderList(dataArr, "checkOut");
      case "In Progress":
        const filterArr = dataArr.filter(
          (item) => item.status === "In Progress"
        );
        return orderList(filterArr, "orderDate");
      default:
        return dataArr;
    }
  }

  function handleRedirect(id) {
    const path = `/dashboard-app/bookings/${id}`;
    navigate(path);
  }

  const rowsToRender = (item) => {
    return (
      <>
        <td className="firstColumn" onClick={() => handleRedirect(item.id)}>
          <p>{item.guest}</p>
          <p className="idField">#{item.id}</p>
        </td>
        <td>{item.orderDate}</td>
        <td>
          {new Date(item.checkIn).toDateString("en-us", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </td>
        <td>{item.checkOut}</td>
        <td>
          <Modal title={item.guest} content={item.specialRequest} />
        </td>
        <td>{item.roomType}</td>
        <td>
          <Button variant={availableStates[item.status]}>{item.status}</Button>
        </td>
      </>
    );
  };

  useEffect(() => {
    const copyOfData = structuredClone(data);
    const newData = filterData(copyOfData, activeTab);
    setOrderedData(newData);
  }, [data, activeTab]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainContainer>
      <Table
        data={orderedData}
        option="bookings"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rows={rowsToRender}
        newBtn="New Booking"
      />
    </MainContainer>
  );
}

export default Bookings;
