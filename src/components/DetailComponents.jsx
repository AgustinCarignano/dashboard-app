import styled from "styled-components";

const fontsVariable = {
  normal_600_30: "normal 600 30px/46px 'Poppins', sans-serif;",
  normal_600_16: "normal 600 16px/25px 'Poppins', sans-serif;",
  normal_600_14: "normal 600 14px/21px 'Poppins', sans-serif;",
  normal_500_24: "normal 500 24px/35px 'Poppins', sans-serif;",
  normal_400_14: "normal 400 14px/21px 'Poppins', sans-serif;",
};

export const ItemContainer = styled.div`
  display: flex;
  border-radius: 20px;
  grid-column: 1/5;
  background-color: ${(props) => props.theme[1]};
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
    font: ${fontsVariable.normal_600_30};
    color: ${(props) => props.theme[19]};
  }
  p {
    font: ${fontsVariable.normal_400_14};
    color: ${(props) => props.theme[12]};
  }
`;
export const SecondaryContainer = styled.div`
  display: flex;
  border-bottom: ${(props) =>
    props.border ? `solid 3px ${props.theme[6]}` : "none"};
  padding-bottom: ${(props) => (props.padding ? "20px" : "0")};
  div {
    width: 50%;
  }
`;
export const Subtitle = styled.p`
  font: ${fontsVariable.normal_400_14};
  color: ${(props) => props.theme[9]};
  padding: 5px 0;
`;
export const DetailSmaller = styled.p`
  font: ${fontsVariable.normal_600_16};
  color: ${(props) => props.theme[19]};
  padding: 5px 0;
`;
export const DetailBigger = styled.p`
  font: ${fontsVariable.normal_500_24};
  color: ${(props) => props.theme[19]};
  padding: 5px 0;
`;
export const TextContent = styled.p`
  font: ${fontsVariable.normal_400_14};
  color: ${(props) => props.theme[24]};
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
  background-color: ${(props) => (props.background ? props.theme[13] : "none")};
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
  color: ${(props) => props.theme[25]};
  font: ${fontsVariable.normal_600_14};
  position: absolute;
  top: 20px;
  right: -100px;
  transform: rotate(45deg);
  background-color: ${(props) =>
    props.children === "CHECK IN"
      ? props.theme[14]
      : props.children === "CHECK OUT"
      ? props.theme[11]
      : props.theme[16]};
`;

export const DetailImg = styled.div`
  width: 25%;
  border-radius: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
