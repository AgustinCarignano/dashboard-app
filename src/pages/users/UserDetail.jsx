import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetails,
  selectUserDetail,
  selectIsLoading,
} from "./usersSlice";
import { useParams, useNavigate } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { formatDate } from "../../utils";
import Loader from "../../components/Loader";
import {
  ItemContainer,
  PrimaryContainer,
  DetailImg,
  DetailHeader,
  TextContent,
  DetailBigger,
  DetailSmaller,
  SecondaryContainer,
  Subtitle,
  EditBtn,
} from "../../components/DetailComponents";
import Popup from "../../components/Popup";
import DeleteItem from "../../components/DeleteItem";

const Container = styled(ItemContainer)`
  position: relative;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  max-width: 700px;
  margin: 0 auto;
`;
const DetailStatus = styled(DetailSmaller)`
  color: #5ad07a;
`;

function UserDetail() {
  const [showConfirm, setShowConfirm] = useState(false);
  const user = useSelector(selectUserDetail);
  const isLoadingData = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const optionsMenu = [
    {
      label: "Edit User",
      action: (itemId) => navigate(`/dashboard-app/users/update/${itemId}`),
    },
    {
      label: "Delete User",
      action: () => {
        setShowConfirm(true);
      },
    },
  ];

  /* function handleDeleteItem() {
    dispatch(deleteUser(user.id));
    navigate(`/dashboard-app/users`);
  } */

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, []);

  return (
    <MainContainer>
      {isLoadingData ? (
        <Loader />
      ) : (
        <Container>
          <PrimaryContainer>
            <DetailImg>
              <img src={user.photo} alt="" />
            </DetailImg>
            <DetailHeader>
              <h1 style={{ maxWidth: "240px" }}>{user.fullName}</h1>
              <p>ID {user.id}</p>
              <p>{user.email}</p>
              <p>{user.contact}</p>
            </DetailHeader>
          </PrimaryContainer>
          <div>
            <DetailBigger>{user.role}</DetailBigger>
            <TextContent>{user.description}</TextContent>
          </div>
          <SecondaryContainer border={false} padding={false}>
            <div>
              <Subtitle>Start Date</Subtitle>
              <DetailSmaller>{formatDate(user.startDate)[0]}</DetailSmaller>
            </div>
            <div>
              <Subtitle>Status</Subtitle>
              <DetailStatus>{user.status}</DetailStatus>
            </div>
          </SecondaryContainer>
          <EditBtn>
            <Popup
              preview={
                <Button variant={5} style={{ fontSize: "20px" }}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Actions
                </Button>
              }
              options={optionsMenu}
              itemId={user.id}
            />
          </EditBtn>
        </Container>
      )}
      {showConfirm && (
        <DeleteItem
          handleClose={() => setShowConfirm((prev) => !prev)}
          handleDelete={() => console.log("put the function handleDeleteItem")}
        />
      )}
    </MainContainer>
  );
}

export default UserDetail;
