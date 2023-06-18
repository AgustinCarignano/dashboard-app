import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
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
} from "../../components/FormComponents";
import { themeContext } from "../../context/ThemeContext";
import Loader from "../../components/Loader";
import ErrorAlert from "../../components/ErrorAlert";
import { RoomType } from "../../@types/rooms";

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

type PropsType = {
  initialState: RoomType;
  onSubmitAction: (data: RoomType) => Promise<void>;
};

function FormRoom(props: PropsType) {
  const { initialState, onSubmitAction } = props;
  const [room, setRoom] = useState({} as RoomType);
  const [submitError, setSubmitError] = useState({
    hasError: false,
    photos: false,
    // photos: [false, false, false],
    roomType: false,
    description: false,
    roomNumber: false,
    offer: false,
    price: false,
    discount: false,
    cancellation: false,
    amenities: false,
  });
  const { theme } = useContext(themeContext);

  function handleInputsChange(e: React.BaseSyntheticEvent) {
    const copyOfData = structuredClone(room);
    const copyOfSubmitError = { ...submitError };
    const key = e.target.name;
    const value: string = e.target.value;
    if (key === "offer") {
      copyOfSubmitError.discount = false;
      copyOfData["offer"] = value === "true";
      if (value === "false") copyOfData.discount = 0;
    } else if (key.includes("photo")) {
      const index = parseInt(key.split("_")[1]);
      copyOfData["photos"][index] = value;
      copyOfSubmitError["photos"] = false;
      // copyOfSubmitError["photos"][index] = false;
    } else {
      if (key === "roomType") {
        copyOfData["roomType"] = value;
        copyOfSubmitError["roomType"] = false;
      }
      if (key === "description") {
        copyOfData["description"] = value;
        copyOfSubmitError["description"] = false;
      }
      if (key === "roomNumber") {
        copyOfData["roomNumber"] = parseInt(value);
        copyOfSubmitError["roomNumber"] = false;
      }
      if (key === "price") {
        copyOfData["price"] = parseInt(value);
        copyOfSubmitError["price"] = false;
      }
      if (key === "discount") {
        copyOfData["discount"] = Number(value);
        copyOfSubmitError["discount"] = false;
      }
      if (key === "cancellation") {
        copyOfData["cancellation"] = value;
        copyOfSubmitError["cancellation"] = false;
      }
      if (key === "status") {
        copyOfData["status"] = value;
      }
    }
    setRoom(copyOfData);
    setSubmitError(copyOfSubmitError);
  }
  /* 
  roomType: string;
  description: string;
  roomNumber: number;
price: number;
  discount: string;
  cancellation: string;
  status: string;
  */

  function handlePhotosQuantity(action: string) {
    const copyOfData = structuredClone(room);
    const copyOfSubmitError = { ...submitError };
    if (action === "add" && copyOfData.photos.length < 5) {
      copyOfData.photos.push("");
      //copyOfSubmitError.photos.push(false);
    } else if (action === "remove" && copyOfData.photos.length > 3) {
      copyOfData.photos.pop();
      //copyOfSubmitError.photos.pop();
    }
    setRoom(copyOfData);
    setSubmitError(copyOfSubmitError);
  }

  function toggleAmenity(amenity: string) {
    const copyOfData = structuredClone(room);
    const index = copyOfData.amenities.findIndex((item) => item === amenity);
    if (index === -1) {
      copyOfData.amenities.push(amenity);
    } else {
      copyOfData.amenities.splice(index, 1);
    }
    setSubmitError({ ...submitError, amenities: false });
    setRoom(copyOfData);
  }

  function verifyForm(data: RoomType) {
    let isValid = true;
    const errorObj = { ...submitError };
    for (const key in data) {
      if (key === "discount" || key === "_id") continue;
      else if (key === "offer") {
        if (data[key] && !data["discount"]) {
          errorObj.discount = true;
          isValid = false;
        }
        continue;
      } /* else if (key === "photos") {
        data.photos.forEach((item, _index) => {
          if (item === "") {
            // errorObj[key][index] = true;
            errorObj[key as keyof typeof submitError] = true;
            isValid = false;
          }
        });
        continue;
      } */ else if (key === "amenities") {
        if (data[key].length === 0) {
          errorObj[key] = true;
          isValid = false;
        }
        continue;
      } else {
        if (!data[key as keyof RoomType]) {
          errorObj[key as keyof typeof submitError] = true;
          isValid = false;
        }
        continue;
      }
    }
    if (!isValid) errorObj.hasError = true;
    setSubmitError(errorObj);
    return isValid;
  }

  async function handleOnSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const copyOfData = structuredClone(room);
    const correctForm = verifyForm(copyOfData);
    if (correctForm) {
      onSubmitAction(copyOfData);
    } else {
      console.log("Something was wrong");
    }
  }

  useEffect(() => {
    setRoom(initialState);
  }, [initialState]);

  if (!room.amenities)
    return (
      <MainContainer>
        <Loader />
      </MainContainer>
    );

  return (
    <MainContainer>
      <Container theme={theme}>
        <Title theme={theme}>
          {initialState._id ? "Edit Room" : "New Room"}
        </Title>
        <FormContainer>
          <Column>
            <Field>
              <Label theme={theme}>Room Type</Label>
              <Select
                theme={theme}
                name="roomType"
                value={room.roomType}
                hasError={submitError.roomType}
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
              <Label theme={theme}>Room Number</Label>
              <Input
                theme={theme}
                autoComplete="off"
                name="roomNumber"
                value={room.roomNumber || ""}
                hasError={submitError.roomNumber}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Offer</Label>
              <Button
                variant={room.offer ? 1 : 4}
                name="offer"
                value="true"
                onClick={handleInputsChange}
              >
                YES
              </Button>
              <Button
                variant={room.offer ? 4 : 1}
                name="offer"
                value="false"
                onClick={handleInputsChange}
              >
                NO
              </Button>
            </Field>
            <Field>
              <Label theme={theme}>Price</Label>
              <Input
                theme={theme}
                name="price"
                value={room.price || ""}
                hasError={submitError.price}
                onChange={handleInputsChange}
                type="number"
              />
            </Field>
            <Field>
              <Label theme={theme}>Discount</Label>
              <Input
                theme={theme}
                name="discount"
                onChange={handleInputsChange}
                disabled={!room.offer}
                hasError={submitError.discount}
                value={!room.offer ? "" : room.discount}
              />
            </Field>
            <Field>
              <Label theme={theme} hasError={submitError.amenities}>
                Amenities
              </Label>
              <ExtraContainer direction="row">
                {availableAmenities.map((item, index) => {
                  let variant = room.amenities.includes(item) ? 1 : 4;
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
              <Label theme={theme}>Photos</Label>
              <ExtraContainer direction="column" style={{ width: "60%" }}>
                {room.photos.map((item, index) => (
                  <PhotoInput
                    theme={theme}
                    key={index}
                    name={`photo_${index}`}
                    value={room.photos[index]}
                    // hasError={submitError.photos[index]}
                    hasError={submitError.photos}
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
              <Label theme={theme}>Description</Label>
              <TextArea
                theme={theme}
                name="description"
                style={{ width: "70%" }}
                value={room.description}
                hasError={submitError.description}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Cancellation</Label>
              <TextArea
                theme={theme}
                name="cancellation"
                style={{ width: "70%" }}
                value={room.cancellation}
                hasError={submitError.cancellation}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              {initialState._id ? "SAVE" : "CREATE"}
            </Button>
          </Submit>
          {submitError.hasError && (
            <ErrorAlert
              toggleVisibility={() =>
                setSubmitError({ ...submitError, hasError: false })
              }
              message="Error: check the remark inputs"
              dataCy="rooms_form"
              textBtn="OK"
            />
          )}
        </FormContainer>
      </Container>
    </MainContainer>
  );
}

export default FormRoom;
