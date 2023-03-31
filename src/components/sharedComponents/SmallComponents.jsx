import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
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
export const Label = styled.label`
  font-size: 24px;
  text-align: right;
  width: 40%;
  padding: 10px;
`;
export const Input = styled.input`
  font-size: 20px;
  color: #393939;
  width: 60%;
  max-width: 300px;
  padding: 10px;
  border-radius: 8px;
  border: solid 1px #c5c5c5;
  outline: none;
`;
export const Select = styled.select`
  font-size: 20px;
  color: #393939;
  font-family: "Poppins", sans-serif;
  width: 70%;
  max-width: 300px;
  padding: 10px;
  border-radius: 8px;
  border: solid 1px #c5c5c5;
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
export const ExtraContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: wrap;
  gap: 10px;
  width: 70%;
`;
export const TextArea = styled.textarea`
  font-size: 20px;
  color: #393939;
  width: 55%;
  padding: 10px;
  border-radius: 8px;
  border: solid 1px #c5c5c5;
  outline: none;
  height: 150px;
  resize: none;
`;
export const Submit = styled.div`
  text-align: center;
  margin: 50px auto 0;
`;

/* 
const toCapitalCase = (string) => {
  const newStr = string.split(/(?=[A-Z])/).join(" ");
  return `${newStr[0].toUpperCase()}${newStr.slice(1, newStr.length)}`;
};
*/