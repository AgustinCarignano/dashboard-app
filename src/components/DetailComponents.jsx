import styled from "styled-components";
import { fonts } from "../theme/theme.js";

export const ItemContainer = styled.div`
  display: flex;
  border-radius: 20px;
  grid-column: 1/5;
  background-color: #fff;
  overflow: hidden;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 50%;
  padding: 40px;
  position: relative;
`;
export const PrimaryContainer = styled.div`
  display: flex;
  gap: 50px;
`;
export const DetailHeader = styled.div`
  h1 {
    font: ${fonts["style1"].font};
    color: ${fonts["style1"].color};
  }
  p {
    font: ${fonts["style4"].font};
    color: ${fonts["style4"].color};
  }
`;
export const SecondaryContainer = styled.div`
  display: flex;
  border-bottom: ${(props) => (props.border ? "solid 3px #f5f5f5" : "none")};
  padding-bottom: ${(props) => (props.padding ? "20px" : "0")};
  div {
    width: 50%;
  }
`;
export const Subtitle = styled.p`
  font: ${fonts["style5"].font};
  color: ${fonts["style5"].color};
  padding: 5px 0;
`;
export const DetailSmaller = styled.p`
  font: ${fonts["style3"].font};
  color: ${fonts["style3"].color};
  padding: 5px 0;
`;
export const DetailBigger = styled.p`
  font: ${fonts["style2"].font};
  color: ${fonts["style2"].color};
  padding: 5px 0;
`;
export const TextContent = styled.p`
  font: ${fonts["style7"].font};
  color: ${fonts["style7"].color};
`;
export const AmenitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .remark {
    transform: scale(1.2);
    margin: 15px 15px 0;
  }
`;
export const EditBtn = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify};
  width: 50%;
  position: relative;
  background-color: ${(props) => props.background};
  img {
    width: 100%;
  }
`;
export const RoomInfoContainer = styled.div`
  padding: 30px 40px;
`;
export const BookingStatus = styled.span`
  display: inline-block;
  width: 300px;
  text-align: center;
  padding: 20px;
  color: #fff;
  font: normal 600 14px/21px "Poppins", sans-serif;
  position: absolute;
  top: 20px;
  right: -100px;
  transform: rotate(45deg);
  background-color: ${(props) =>
    props.children === "CHECK IN"
      ? "#5AD07A"
      : props.children === "CHECK OUT"
      ? "#E23428"
      : "#FF9C3A"};
`;

export const DetailImg = styled.div`
  width: 25%;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
