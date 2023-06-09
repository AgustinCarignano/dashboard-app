import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {
  getUserDetails,
  selectUserDetail,
  selectIsLoading,
  deleteUser,
} from "../../store/slices/usersSlice";
import MainContainer from "../../components/MainContainer";
import Button from "../../components/Button";
import { formatDate } from "../../utils/dateUtils";
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
import { themeContext } from "../../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Container = styled(ItemContainer)`
  position: relative;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  padding-right: 200px;
  max-width: 700px;
  margin: 0 auto;
`;
const DetailStatus = styled(DetailSmaller)`
  color: ${(props) => props.theme[14]};
`;

function UserDetail() {
  const [showConfirm, setShowConfirm] = useState(false);
  const user = useAppSelector(selectUserDetail);
  const isLoadingData = useAppSelector(selectIsLoading);
  const { theme } = useContext(themeContext);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const tabSpace: string = "\u00A0\u00A0";

  const optionsMenu = [
    {
      label: "Edit User",
      action: (itemId: string) =>
        navigate(`/dashboard-app/users/update/${itemId}`),
    },
    {
      label: "Delete User",
      action: () => {
        setShowConfirm(true);
      },
    },
  ];

  async function handleDeleteItem() {
    try {
      await dispatch(deleteUser(user._id)).unwrap();
      navigate(`/dashboard-app/users`);
    } catch (error) {
      setShowConfirm(false);
      console.log("there has been an error", error);
    }
  }

  useEffect(() => {
    if (id && user._id !== id) dispatch(getUserDetails(id));
  }, [dispatch, user, id]);

  return (
    <MainContainer>
      <>
        {isLoadingData ? (
          <Loader />
        ) : (
          <Container theme={theme}>
            <PrimaryContainer>
              <DetailImg>
                <img src={user.photo} alt="" />
              </DetailImg>
              <DetailHeader theme={theme}>
                <h1 style={{ maxWidth: "240px" }}>{user.fullName}</h1>
                <p>ID {user._id}</p>
                <p>{user.email}</p>
                <p>{user.contact}</p>
              </DetailHeader>
            </PrimaryContainer>
            <div>
              <DetailBigger theme={theme}>{user.role}</DetailBigger>
              <TextContent theme={theme}>{user.description}</TextContent>
            </div>
            <SecondaryContainer border={false} padding={false} theme={theme}>
              <div>
                <Subtitle theme={theme}>Start Date</Subtitle>
                <DetailSmaller theme={theme}>
                  {formatDate(user.startDate)[0]}
                </DetailSmaller>
              </div>
              <div>
                <Subtitle theme={theme}>Status</Subtitle>
                <DetailStatus theme={theme}>{user.status}</DetailStatus>
              </div>
            </SecondaryContainer>

            <EditBtn>
              <Popup
                preview={
                  <Button variant={5} style={{ fontSize: "20px" }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    {tabSpace} Actions {tabSpace}
                  </Button>
                }
                options={optionsMenu}
                itemId={user._id}
                withArrow
              />
            </EditBtn>
          </Container>
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

export default UserDetail;
