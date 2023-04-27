import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  getUsersData,
  selectUsers,
  selectIsLoading,
  deleteUser,
} from "../../store/slices/usersSlice";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import Table, {
  IRowItem,
  ImgRowContainer,
  RowContainer,
  RowDataSmaller,
} from "../../components/Table";
import Modal from "../../components/Modal";
import { formatDate } from "../../utils";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup";
import DeleteItem from "../../components/DeleteItem";
import { themeContext } from "../../context/ThemeContext";
import { UserType } from "../../@types/users";

function Users() {
  const data = useAppSelector(selectUsers);
  const isLoadingData = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  const [modifydData, setModifydData] = useState<UserType[]>([]);
  const [activeTab, setActiveTab] = useState("All Employee");
  const [orderBy, setOrderBy] = useState("startDate");
  const [searchTerms, setSearchTerms] = useState("");
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();
  const tabs = ["All Employee", "Active Employee", "Inactive Employee"];

  const optionsMenu = [
    {
      label: "Details",
      action: (itemId: string) => navigate(`/dashboard-app/users/${itemId}`),
    },
    {
      label: "Edit",
      action: (itemId: string) =>
        navigate(`/dashboard-app/users/update/${itemId}`),
    },
    {
      label: "Delete",
      action: (itemId: string) => {
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

  function handleRedirect(id: string) {
    const path = `/dashboard-app/users/${id}`;
    navigate(path);
  }

  function handleDeleteItem() {
    dispatch(deleteUser(itemToDelete));
    setShowConfirm(false);
  }

  const rowsToRender = (item: UserType): IRowItem => {
    const [userDate] = formatDate(item.startDate);
    return {
      id: item.id,
      rowData: [
        <RowContainer justify="normal" onClick={() => handleRedirect(item.id)}>
          <ImgRowContainer aspectRatio="1/1">
            <img src={item.photo} alt="employee profile" />
          </ImgRowContainer>
          <div>
            <p>{item.fullName}</p>
            <RowDataSmaller theme={theme}>#{item.id}</RowDataSmaller>
            <RowDataSmaller theme={theme}>{item.email}</RowDataSmaller>
          </div>
        </RowContainer>,
        <>{userDate}</>,
        <Modal
          title="Description"
          content={item.description}
          previewStyle={{ cursor: "pointer" }}
          preview={
            item.description.length > 100
              ? item.description.slice(0, 100) + "..."
              : item.description
          }
        />,
        <>{item.contact}</>,
        <RowContainer justify="space-between">
          <Button variant={item.status === "ACTIVE" ? 9 : 10}>
            {item.status}
          </Button>
          <Popup
            options={optionsMenu}
            itemId={item.id}
            withArrow={false}
            preview={
              <FontAwesomeIcon
                color="#6E6E6E"
                icon={faEllipsisVertical}
                size="xl"
              />
            }
          />
        </RowContainer>,
      ],
    };
  };

  useEffect(() => {
    const newData = structuredClone(data);
    let filterData: UserType[] = [];
    if (activeTab === "Active Employee")
      filterData = newData.filter((item) => item.status === "ACTIVE");
    else if (activeTab === "Inactive Employee")
      filterData = newData.filter((item) => item.status === "INACTIVE");
    else filterData = newData;
    filterData.sort((a, b) => {
      if (a[orderBy as keyof UserType] > b[orderBy as keyof UserType]) return 1;
      else if (a[orderBy as keyof UserType] < b[orderBy as keyof UserType])
        return -1;
      return 0;
    });
    const searchData = filterData.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerms.toLowerCase())
    );
    setModifydData(searchData);
  }, [data, activeTab, orderBy, searchTerms]);

  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch]);
  return (
    <MainContainer>
      <>
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
            rowsGenerator={rowsToRender}
            newBtn="New User"
            //newestAction={() => setOrderBy("startDate")}
            paginate={true}
            draggableRow={false}
          />
        )}
        {showConfirm && (
          <DeleteItem
            handleClose={() => setShowConfirm((prev) => !prev)}
            handleDelete={handleDeleteItem}
          />
        )}
      </>
    </MainContainer>
  );
}

export default Users;
