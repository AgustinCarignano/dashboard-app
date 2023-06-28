import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoom } from "../../store/slices/roomSlice";
import FormRoom from "./FormRoom";

function NewRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    photos: ["", "", ""],
    roomType: "",
    description: "",
    roomNumber: "",
    id: "",
    offer: false,
    price: "",
    discount: "",
    cancellation: "",
    status: "Available",
    amenities: [],
  };

  async function onSubmitAction(data) {
    const payload = await dispatch(createRoom(data)).unwrap();
    navigate(`/rooms/${payload.data.id}`);
  }

  return (
    <FormRoom initialState={initialState} onSubmitAction={onSubmitAction} />
  );
}

export default NewRoom;

/* 
return (
    <MainContainer style={{ minHeight: "calc(100vh - 145px)" }}>
      <Container theme={theme}>
        <Title theme={theme}>{id ? "Edit Room" : "New Room"}</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label theme={theme}>Room Type</Label>
              <Select
                theme={theme}
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
              <Label theme={theme}>Room Number</Label>
              <Input
                theme={theme}
                autoComplete="off"
                name="roomNumber"
                value={newRoom.roomNumber}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Offer</Label>
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
              <Label theme={theme}>Price</Label>
              <Input
                theme={theme}
                name="price"
                value={newRoom.price}
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
                disabled={!newRoom.offer}
                value={!newRoom.offer ? "" : newRoom.discount}
              />
            </Field>
            <Field>
              <Label theme={theme}>Amenities</Label>
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
              <Label theme={theme}>Photos</Label>
              <ExtraContainer direction="column" style={{ width: "60%" }}>
                {newRoom.photos.map((item, index) => (
                  <PhotoInput
                    theme={theme}
                    key={index}
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
              <Label theme={theme}>Description</Label>
              <TextArea
                theme={theme}
                name="description"
                style={{ width: "70%" }}
                value={newRoom.description}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Cancellation</Label>
              <TextArea
                theme={theme}
                name="cancellation"
                style={{ width: "70%" }}
                value={newRoom.cancellation}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              {id ? "SAVE" : "CREATE"}
            </Button>
          </Submit>
        </FormContainer>
      </Container>
    </MainContainer>
  );
*/
