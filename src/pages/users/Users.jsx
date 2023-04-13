import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsersData,
  selectUsers,
  selectIsLoading,
  deleteUser,
} from "./usersSlice.js";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import Table, {
  ImgRowContainer,
  RowContainer,
  RowDataSmaller,
} from "../../components/Table";
import Modal from "../../components/Modal";
import { formatDate } from "../../utils";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup.jsx";
import DeleteItem from "../../components/DeleteItem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { themeContext } from "../../context/ThemeContext.jsx";

const availableStates = {
  ACTIVE: 9,
  INACTIVE: 10,
};

function Users() {
  const data = useSelector(selectUsers);
  const isLoadingData = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [modifydData, setModifydData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Employee");
  const [orderBy, setOrderBy] = useState("startDate");
  const [searchTerms, setSearchTerms] = useState("");
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();
  const tabs = ["All Employee", "Active Employee", "Inactive Employee"];

  const optionsMenu = [
    {
      label: "Details",
      action: (itemId) => navigate(`/dashboard-app/users/${itemId}`),
    },
    {
      label: "Edit",
      action: (itemId) => navigate(`/dashboard-app/users/update/${itemId}`),
    },
    {
      label: "Delete",
      action: (itemId) => {
        setItemToDelete(itemId);
        setShowConfirm(true);
      },
    },
  ];

  const tableHeader = [
    { label: "Name", action: () => setOrderBy("fullName") },
    { label: "Start Date", action: () => setOrderBy("startDate") },
    { label: "Description" },
    { label: "Contact" },
    { label: "Status" },
  ];

  function handleRedirect(id) {
    const path = `/dashboard-app/users/${id}`;
    navigate(path);
  }

  function handleDeleteItem() {
    dispatch(deleteUser(itemToDelete));
    setShowConfirm(false);
  }

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
              <RowDataSmaller theme={theme}>#{item.id}</RowDataSmaller>
              <RowDataSmaller theme={theme}>{item.email}</RowDataSmaller>
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
          <RowContainer justify="space-between">
            <Button variant={availableStates[item.status]}>
              {item.status}
            </Button>
            <Popup
              options={optionsMenu}
              itemId={item.id}
              preview={
                <FontAwesomeIcon
                  color="#6E6E6E"
                  icon={faEllipsisVertical}
                  size="xl"
                />
              }
            />
          </RowContainer>
        </td>
      </>
    );
  };

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
    //getData();
    dispatch(getUsersData());
  }, []);
  return (
    <MainContainer>
      {isLoadingData ? (
        <Loader />
      ) : (
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
      )}
      {showConfirm && (
        <DeleteItem
          handleClose={() => setShowConfirm((prev) => !prev)}
          handleDelete={handleDeleteItem}
        />
      )}
    </MainContainer>
  );
}

export default Users;
