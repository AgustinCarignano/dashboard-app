import styled from "styled-components";
//import calendar from "../images/calendarIcon.svg";
const calendar = require("../images/calendarIcon.svg") as string;

export const Container = styled.div`
  background-color: ${(props) => props.theme[1]};
  grid-column: 1/5;
  text-align: center;
  font-family: "Poppins", sans-serif;
  padding: 40px;
  border-radius: 20px;
`;
export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${(props) => props.theme[21]};
`;
export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
`;
export const Field = styled.div`
  display: flex;
  gap: 20px;
`;
export const Label = styled.label<{ hasError?: boolean }>`
  font-size: 24px;
  text-align: right;
  width: 40%;
  padding: 10px;
  color: ${(props) => (props.hasError ? props.theme[11] : props.theme[21])};
`;
export const Input = styled.input<{ hasError: boolean }>`
  font-size: 20px;
  color: ${(props) => props.theme[17]};
  background-color: ${(props) => props.theme[1]};
  font-family: "Poppins", sans-serif;
  width: 60%;
  max-width: 300px;
  padding: 10px;
  border-radius: 8px;
  border: solid 1px
    ${(props) => (props.hasError ? props.theme[11] : props.theme[7])};
  outline: none;
`;
export const Select = styled.select<{ hasError: boolean }>`
  font-size: 20px;
  color: ${(props) => props.theme[17]};
  background-color: ${(props) => props.theme[1]};
  font-family: "Poppins", sans-serif;
  width: 70%;
  max-width: 300px;
  padding: 10px;
  border-radius: 8px;
  border: solid 1px
    ${(props) => (props.hasError ? props.theme[11] : props.theme[7])};
  outline: none;
  option {
    font-size: 10px;
  }
`;
export const PhotoInput = styled(Input)`
  min-height: 56.8px;
  width: 100%;
  max-width: unset;
  margin-left: 5px;
`;
export const DateInput = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    background-image: url(${calendar});
    transform: scale(1.3);
    cursor: pointer;
  }
`;
export const ExtraContainer = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: wrap;
  gap: 10px;
  width: 70%;
`;
export const TextArea = styled.textarea<{ hasError: boolean }>`
  font-size: 20px;
  color: ${(props) => props.theme[17]};
  background-color: ${(props) => props.theme[1]};
  font-family: "Poppins", sans-serif;
  width: 55%;
  padding: 10px;
  border-radius: 8px;
  border: solid 1px
    ${(props) => (props.hasError ? props.theme[11] : props.theme[7])};
  outline: none;
  height: 150px;
  resize: none;
`;
export const Submit = styled.div`
  text-align: center;
  margin: 50px auto 0;
`;
