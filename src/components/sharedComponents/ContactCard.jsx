import React from "react";
import styled from "styled-components";

const MyCard = styled.div`
  background-color: #ffffff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ebebeb;
  border-radius: 20px;
  transition: all 0.3s;
  :hover {
    box-shadow: 0px 16px 30px #00000014;
  }
  .field {
    font: normal 600 16px/25px "Poppins", sans-serif;
    color: #262626;
    margin: 5px 0;
  }
  .content {
    font: normal 400 16px/28px "Poppins", sans-serif;
    color: #4e4e4e;
  }
`;

function ContactCard(props) {
  const { name, email, phone, subject, message } = props;
  return (
    <MyCard>
      <p className="field">Name</p>
      <p className="content">{name}</p>
      <p className="field">Email</p>
      <p className="content">{email}</p>
      <p className="field">Phone</p>
      <p className="content">{phone}</p>
      <p className="field">Subject</p>
      <p className="content">{subject}</p>
      <p className="field">Message</p>
      <p className="content">{message}</p>
    </MyCard>
  );
}

export default ContactCard;
