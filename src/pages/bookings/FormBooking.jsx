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
import ErrorAlert from "../../components/ErrorAlert";

function FormBooking(props) {
  const { initialState, extraRoom, onSubmitAction } = props;
  const roomsData = useSelector(selectRooms);
  const [booking, setBooking] = useState({});
  const [submitError, setSubmitError] = useState({
    hasError: false,
    guest: false,
    checkIn: false,
    checkOut: false,
    roomId: false,
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const { theme } = useContext(themeContext);
  const dispatch = useDispatch();
  const today = formatDate(new Date().getTime())[2];

  function handleInputsChange(e) {
    const copyOfData = { ...booking };
    const copyOfSubmitError = { ...submitError };
    const key = e.target.name;
    const value = e.target.value;
    copyOfData[key] = value;
    copyOfSubmitError[key] = false;
    if (key === "roomId") {
      const room = availableRooms.find((item) => item.id === value);
      copyOfData["roomNumber"] = room.roomNumber;
      copyOfData["roomType"] = room.roomType;
    }
    setSubmitError(copyOfSubmitError);
    setBooking(copyOfData);
  }

  function verifyForm(data) {
    let isValid = true;
    const errorObj = { ...submitError };
    for (const key in data) {
      if (key === "id" || key === "specialRequest") continue;
      if (!data[key]) {
        errorObj[key] = true;
        isValid = false;
      }
    }
    if (!isValid) errorObj.hasError = true;
    setSubmitError(errorObj);
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

  useEffect(() => {
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
  }, [roomsData]);

  useEffect(() => {
    setBooking(initialState);
    dispatch(getRoomsData());
  }, [dispatch, initialState]);

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
                hasError={submitError.guest}
                onChange={handleInputsChange}
                data-cy="bookingFormGuest"
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
                hasError={submitError.checkIn}
                onChange={handleInputsChange}
                data-cy="bookingFormCheckIn"
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
                hasError={submitError.checkOut}
                onChange={handleInputsChange}
                data-cy="bookingFormCheckOut"
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
                hasError={submitError.roomId}
                onChange={handleInputsChange}
                data-cy="bookingFormRoom"
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
                data-cy="bookingFormRequest"
              />
            </Field>
          </Column>
          <Submit>
            <Button variant={1} onClick={handleOnSubmit}>
              {extraRoom ? "SAVE" : "CREATE"}
            </Button>
          </Submit>
          {submitError.hasError && (
            <ErrorAlert
              toggleVisibility={() =>
                setSubmitError({ ...submitError, hasError: false })
              }
              message="Error: check the remark inputs"
              dataCy="bookingFormError"
              textBtn="OK"
            />
          )}
        </FormContainer>
      </Container>
    </MainContainer>
  );
}

export default FormBooking;
