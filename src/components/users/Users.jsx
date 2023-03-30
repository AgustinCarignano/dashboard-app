import React, { useState, useEffect } from "react";
import { getAllData } from "../../mockService/service";
import Button from "../sharedComponents/Button";
import MainContainer from "../sharedComponents/MainContainer";
import Table from "../sharedComponents/Table";

const availableStates = {
  ACTIVE: 6,
  INACTIVE: 7,
};

function Users() {
  const [data, setData] = useState([]);
  const [modifydData, setModifydData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Employee");
  const [orderBy, setOrderBy] = useState("startDate");
  const tabs = ["All Employee", "Active Employee", "Inactive Employee"];

  const rowsToRender = (item) => {
    return (
      <>
        <td /* onClick={() => handleRedirect(item.id)} */>
          <div className="rooms_firstColumn">
            <div className="img">
              <img src={item.photo} alt="thumbnail" />
            </div>
            <div>
              <p>{item.fullName}</p>
              <p className="idField">#{item.id}</p>
            </div>
          </div>
        </td>
        <td>{item.email}</td>
        <td>{item.startDate}</td>
        <td>${item.description}</td>
        <td>{item.contact}</td>
        <td>
          <Button variant={availableStates[item.status]}>{item.status}</Button>
        </td>
      </>
    );
  };

  function filterData(dataArr, filterOption, orderBy) {
    const orderList = (arr, criteria) => {
      arr.sort((a, b) => {
        if (a[criteria] > b[criteria]) return 1;
        else if (a[criteria] < b[criteria]) return -1;
        return 0;
      });
      return arr;
    };
    let filterArr = [];
    switch (filterOption) {
      case "Active Employee":
        filterArr = dataArr.filter((item) => item.status === "ACTIVE");
        return orderList(filterArr, orderBy);
      case "Inactive Employee":
        filterArr = dataArr.filter((item) => item.status === "INACTIVE");
        return orderList(filterArr, orderBy);
      default:
        return orderList(dataArr, orderBy);
    }
  }

  async function getData() {
    const newData = await getAllData("mockData/users_data.json");
    setData(newData);
  }

  useEffect(() => {
    const copyOfData = structuredClone(data);
    const newData = filterData(copyOfData, activeTab, orderBy);
    setModifydData(newData);
  }, [data, activeTab, orderBy]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <MainContainer>
      <Table
        data={modifydData}
        option="users"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rows={rowsToRender}
        newBtn="New User"
      />
    </MainContainer>
  );
}

export default Users;
