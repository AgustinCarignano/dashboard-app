import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../mockService/service";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import Table, {
  ImgRowContainer,
  RowContainer,
  RowDataSmaller,
} from "../../components/Table";
import Modal from "../../components/Modal";
import { formatDate } from "../../utils";

const availableStates = {
  ACTIVE: 6,
  INACTIVE: 7,
};

function Users() {
  const [data, setData] = useState([]);
  const [modifydData, setModifydData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Employee");
  const [orderBy, setOrderBy] = useState("startDate");
  const [searchTerms, setSearchTerms] = useState("");
  const navigate = useNavigate();
  const tabs = ["All Employee", "Active Employee", "Inactive Employee"];

  function handleRedirect(id) {
    const path = `/dashboard-app/users/${id}`;
    navigate(path);
  }

  const tableHeader = [
    { label: "Name", action: () => setOrderBy("fullName") },
    { label: "Start Date", action: () => setOrderBy("startDate") },
    { label: "Description" },
    { label: "Contact" },
    { label: "Status" },
  ];

  const rowsToRender = (item) => {
    const [userDate] = formatDate(item.startDate);
    return (
      <>
        <td>
          <RowContainer
            justify="normal"
            onClick={() => handleRedirect(item.id)}
          >
            <ImgRowContainer>
              <img src={item.photo} alt="employee profile" />
            </ImgRowContainer>
            <div>
              <p>{item.fullName}</p>
              <RowDataSmaller>#{item.id}</RowDataSmaller>
              <RowDataSmaller>{item.email}</RowDataSmaller>
            </div>
          </RowContainer>
        </td>
        <td>{userDate}</td>
        <td>
          <Modal
            title="Description"
            content={item.description}
            preview={
              item.description.length > 100
                ? item.description.slice(0, 100) + "..."
                : item.description
            }
          />
        </td>
        <td>{item.contact}</td>
        <td>
          <Button variant={availableStates[item.status]}>{item.status}</Button>
        </td>
      </>
    );
  };

  async function getData() {
    const newData = await getAllData("users_data.json");
    setData(newData);
  }

  useEffect(() => {
    const newData = structuredClone(data);
    let filterData = [];
    if (activeTab === "Active Employee")
      filterData = newData.filter((item) => item.status === "ACTIVE");
    else if (activeTab === "Inactive Employee")
      filterData = newData.filter((item) => item.status === "INACTIVE");
    else filterData = newData;
    filterData.sort((a, b) => {
      if (a[orderBy] > b[orderBy]) return 1;
      else if (a[orderBy] < b[orderBy]) return -1;
      return 0;
    });
    const searchData = filterData.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerms.toLowerCase())
    );
    setModifydData(searchData);
  }, [data, activeTab, orderBy, searchTerms]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <MainContainer>
      <Table
        data={modifydData}
        option="users"
        tableHeader={tableHeader}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSearchTerms={setSearchTerms}
        rows={rowsToRender}
        newBtn="New User"
        //newestAction={() => setOrderBy("startDate")}
        paginate={true}
      />
    </MainContainer>
  );
}

export default Users;
