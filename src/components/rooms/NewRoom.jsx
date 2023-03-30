import React, { useState } from "react";
import Button from "../sharedComponents/Button";
import MainContainer from "../sharedComponents/MainContainer";
import {
  Container,
  Title,
  FormContainer,
  Column,
  Field,
  Label,
  Input,
  Select,
  TextArea,
  Submit,
  PhotoInput,
  ExtraContainer,
} from "../sharedComponents/SmallComponents";

const availableAmenities = [
  "Air Conditioner",
  "High speed WiFi",
  "Breakfast",
  "Kitchen",
  "Cleaning",
  "Single Bed",
  "Shower",
  "Grocery",
  "Shop near",
  "Towels",
];
const availableTypeRoom = [
  "(Select from the list)",
  "Single Bed",
  "Double Bed",
  "Double Superior",
  "Suite",
];

const initialState = {
  roomType: "",
  roomNumber: "",
  offer: false,
  price: "",
  discount: "",
  amenities: [],
  photos: ["", "", ""],
  description: "",
  cancellation: "",
};

function NewRoom() {
  const [newRoom, setNewRoom] = useState(initialState);

  function handleInputsChange(e) {
    const copyOfData = structuredClone(newRoom);
    const key = e.target.name;
    const value = e.target.value;
    if (key === "offer") {
      copyOfData[key] = value === "true";
      if (value === "false") copyOfData.discount = "";
    } else if (key.includes("photo")) {
      const index = key.split("_")[1];
      copyOfData["photos"][index] = value;
    } else {
      copyOfData[key] = value;
    }
    setNewRoom(copyOfData);
  }

  function handlePhotosQuantity(action) {
    const copyOfData = structuredClone(newRoom);
    if (action === "add" && copyOfData.photos.length < 5) {
      copyOfData.photos.push("");
    } else if (action === "remove" && copyOfData.photos.length > 3) {
      copyOfData.photos.pop();
    }
    setNewRoom(copyOfData);
  }

  function toggleAmenity(amenity) {
    const copyOfData = structuredClone(newRoom);
    const index = copyOfData.amenities.findIndex((item) => item === amenity);
    if (index === -1) {
      copyOfData.amenities.push(amenity);
    } else {
      copyOfData.amenities.splice(index, 1);
    }
    setNewRoom(copyOfData);
  }

  function verifyForm(data) {
    for (const key in data) {
      if (key === "offer") {
        if (data[key] && !data["discount"]) return false;
      }
      if (key === "discount") continue;
      if (key === "photos") {
        if (data[key].includes("")) return false;
      }
      if (key === "amenities") {
        if (data[key].length === 0) return false;
      }
      if (data[key] === "") return false;
    }
    return true;
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const copyOfData = structuredClone(newRoom);
    const correctForm = verifyForm(copyOfData);
    console.log(correctForm);
    if (correctForm) {
      console.log(newRoom);
      setNewRoom(initialState);
    } else {
      console.log("Something was wrong");
    }
  }

  return (
    <MainContainer style={{ minHeight: "calc(100vh - 145px)" }}>
      <Container>
        <Title>Add a New Room</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label>Room Type</Label>
              <Select
                name="roomType"
                value={newRoom.roomType}
                onChange={handleInputsChange}
              >
                {availableTypeRoom.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={index === 0 ? "" : availableTypeRoom[index]}
                      hidden={index === 0}
                    >
                      {item}
                    </option>
                  );
                })}
              </Select>
            </Field>
            <Field>
              <Label>Room Number</Label>
              <Input
                name="roomNumber"
                value={newRoom.roomNumber}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Offer</Label>
              <Button
                variant={newRoom.offer ? 1 : 4}
                name="offer"
                value={true}
                onClick={handleInputsChange}
              >
                YES
              </Button>
              <Button
                variant={newRoom.offer ? 4 : 1}
                name="offer"
                value={false}
                onClick={handleInputsChange}
              >
                NO
              </Button>
            </Field>
            <Field>
              <Label>Price</Label>
              <Input
                name="price"
                value={newRoom.price}
                onChange={handleInputsChange}
                type="number"
              />
            </Field>
            <Field>
              <Label>Discount</Label>
              <Input
                name="discount"
                onChange={handleInputsChange}
                disabled={!newRoom.offer}
                value={!newRoom.offer ? "" : newRoom.discount}
              />
            </Field>
            <Field>
              <Label>Amenities</Label>
              <ExtraContainer direction="row">
                {availableAmenities.map((item, index) => {
                  let variant = newRoom.amenities.includes(item) ? 1 : 4;
                  return (
                    <Button
                      key={index}
                      variant={variant}
                      onClick={() => toggleAmenity(item)}
                    >
                      {item}
                    </Button>
                  );
                })}
              </ExtraContainer>
            </Field>
          </Column>
          <Column>
            <Field>
              <Label>Photos</Label>
              <ExtraContainer direction="column" style={{ width: "60%" }}>
                {newRoom.photos.map((item, index) => (
                  <PhotoInput
                    name={`photo_${index}`}
                    value={newRoom.photos[index]}
                    onChange={handleInputsChange}
                  />
                ))}
              </ExtraContainer>
              <ExtraContainer
                direction="column"
                style={{ marginLeft: "0px", width: "10%" }}
              >
                <Button
                  variant={1}
                  style={{ padding: "13px 5px" }}
                  onClick={() => handlePhotosQuantity("add")}
                >
                  +
                </Button>
                <Button
                  variant={1}
                  style={{ padding: "13px 5px" }}
                  onClick={() => handlePhotosQuantity("remove")}
                >
                  -
                </Button>
              </ExtraContainer>
            </Field>
            <Field>
              <Label>Description</Label>
              <TextArea
                name="description"
                style={{ width: "70%" }}
                value={newRoom.description}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Cancellation</Label>
              <TextArea
                name="cancellation"
                style={{ width: "70%" }}
                value={newRoom.cancellation}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              CREATE
            </Button>
          </Submit>
        </FormContainer>
      </Container>
    </MainContainer>
  );
}

export default NewRoom;
