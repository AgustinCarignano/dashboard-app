import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  DateInput,
} from "../../components/FormComponents";
import { themeContext } from "../../context/ThemeContext";
import { getRoomsData, selectRooms } from "../../store/slices/roomSlice";
import Loader from "../../components/Loader";
import { formatDate } from "../../utils";

function FormBooking(props) {
  const { initialState, extraRoom, onSubmitAction } = props;
  const roomsData = useSelector(selectRooms);
  const [booking, setBooking] = useState({});
  const [availableRooms, setAvailableRooms] = useState([]);
  const { theme } = useContext(themeContext);
  const dispatch = useDispatch();
  const today = formatDate(new Date().getTime())[2];

  function handleInputsChange(e) {
    const copyOfData = { ...booking };
    const key = e.target.name;
    const value = e.target.value;
    copyOfData[key] = value;
    if (key === "roomId") {
      const room = availableRooms.find((item) => item.id === value);
      copyOfData["roomNumber"] = room.roomNumber;
      copyOfData["roomType"] = room.roomType;
    }
    setBooking(copyOfData);
  }

  function verifyForm(data) {
    let isValid = true;
    for (const key in data) {
      if (key === "id" || key === "specialRequest") continue;
      if (!data[key]) isValid = false;
    }
    return isValid;
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const copyOfData = { ...booking };
    const correctForm = verifyForm(copyOfData);
    if (correctForm) {
      copyOfData.checkIn = new Date(copyOfData.checkIn).getTime();
      copyOfData.checkOut = new Date(copyOfData.checkOut).getTime();
      onSubmitAction(copyOfData);
    } else {
      console.log("Something was wrong");
    }
  }

  /* useEffect(() => {
    const availableRooms = roomsData.filter(
      (item) => item.status === "Available"
    );
    if (extraRoom) availableRooms.push(extraRoom);
    availableRooms.sort((a, b) => {
      if (a.roomType > b.roomType) return 1;
      else if (a.roomType < b.roomType) return -1;
      else return 0;
    });
    setAvailableRooms(availableRooms);
  }, [roomsData]); */

  useEffect(() => {
    setBooking(initialState);
    dispatch(getRoomsData())
      .unwrap()
      .then((payload) => {
        const availableRooms = payload.data.filter(
          (item) => item.status === "Available"
        );
        if (extraRoom) availableRooms.push(extraRoom);
        availableRooms.sort((a, b) => {
          if (a.roomType > b.roomType) return 1;
          else if (a.roomType < b.roomType) return -1;
          else return 0;
        });
        setAvailableRooms(availableRooms);
      });
  }, [dispatch]);

  if (!booking.orderDate)
    return (
      <MainContainer>
        <Loader />
      </MainContainer>
    );

  return (
    <MainContainer>
      <Container theme={theme}>
        <Title theme={theme}>
          {extraRoom ? "Edit Booking" : "New Booking"}
        </Title>
        <FormContainer>
          <Column>
            <Field>
              <Label theme={theme}>Guest Full Name</Label>
              <Input
                autoComplete="off"
                theme={theme}
                type="text"
                name="guest"
                value={booking.guest}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Check In</Label>
              <DateInput
                autoComplete="off"
                min={today}
                theme={theme}
                type="date"
                name="checkIn"
                value={booking.checkIn}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Check Out</Label>
              <DateInput
                autoComplete="off"
                min={booking.checkIn || today}
                theme={theme}
                type="date"
                name="checkOut"
                value={booking.checkOut}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Column>
            <Field>
              <Label theme={theme}>Room</Label>
              <Select
                theme={theme}
                name="roomId"
                value={booking.roomId}
                onChange={handleInputsChange}
              >
                <option value="" hidden>
                  (Select from the list)
                </option>
                {availableRooms.length !== 0 &&
                  availableRooms.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.roomNumber} - {item.roomType}
                      </option>
                    );
                  })}
              </Select>
            </Field>
            <Field>
              <Label theme={theme}>Special Request</Label>
              <TextArea
                theme={theme}
                name="specialRequest"
                value={booking.specialRequest}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              {extraRoom ? "SAVE" : "CREATE"}
            </Button>
          </Submit>
        </FormContainer>
      </Container>
    </MainContainer>
  );
}

export default FormBooking;
