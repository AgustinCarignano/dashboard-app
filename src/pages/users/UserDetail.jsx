import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fonts } from "../../theme/theme";
import { getItemData } from "../../mockService/service";
import { useParams, useNavigate } from "react-router-dom";
import MainContainer from "../../components/MainContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { formatDate } from "../../utils";

const Container = styled.div`
  grid-column: 1/5;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 20px;
  background-color: #fff;
  padding: 40px;
  max-width: 700px;
  margin: 0 auto;
`;

const UserHeader = styled.div`
  display: flex;
  gap: 50px;
`;
const UserImg = styled.div`
  width: 25%;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
const UserIdentify = styled.div`
  h1 {
    font: ${fonts["style1"].font};
    color: ${fonts["style1"].color};
  }
  p {
    font: ${fonts["style4"].font};
    color: ${fonts["style4"].color};
  }
`;
const Subtitle = styled.h3`
  font: ${fonts["style2"].font};
  color: ${fonts["style2"].color};
  padding: 5px 0;
`;
const Description = styled.p`
  font: ${fonts["style7"].font};
  color: ${fonts["style7"].color};
`;
const DetailContainer = styled.div`
  display: flex;
  width: 100%;
  div {
    width: 50%;
  }
`;
const DetailTitle = styled.h4`
  font: ${fonts["style5"].font};
  color: ${fonts["style5"].color};
  padding: 5px 0;
  width: 100%;
`;
const DetailContent = styled.p`
  font: ${fonts["style3"].font};
  color: ${fonts["style3"].color};
  padding: 5px 0;
  width: 100%;
`;
const DetailStatus = styled(DetailContent)`
  color: #5ad07a;
`;
const EditBtn = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
`;

function UserDetail() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleRedirect() {
    const path = `/dashboard-app/users/update/${user.id}`;
    navigate(path);
  }

  async function getUserData() {
    const data = await getItemData("users_data.json", id);
    data.startDate = formatDate(data.startDate)[0];
    setUser(data);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <MainContainer>
      {user.lenght === 0 ? (
        <h2>Loading</h2>
      ) : (
        <Container>
          <UserHeader>
            <UserImg>
              <img src={user.photo} alt="" />
            </UserImg>
            <UserIdentify>
              <h1>{user.fullName}</h1>
              <p>ID {user.id}</p>
              <p>{user.email}</p>
              <p>{user.contact}</p>
            </UserIdentify>
          </UserHeader>
          <div>
            <Subtitle>{user.role}</Subtitle>
            <Description>{user.description}</Description>
          </div>
          <DetailContainer>
            <div>
              <DetailTitle>Start Date</DetailTitle>
              <DetailContent>{user.startDate}</DetailContent>
            </div>
            <div>
              <DetailTitle>Status</DetailTitle>
              <DetailStatus>{user.status}</DetailStatus>
            </div>
          </DetailContainer>
          <EditBtn onClick={handleRedirect}>
            <Button variant={5} style={{ fontSize: "20px" }}>
              <FontAwesomeIcon icon={faPenToSquare} />
              Edit
            </Button>
          </EditBtn>
        </Container>
      )}
    </MainContainer>
  );
}

export default UserDetail;
