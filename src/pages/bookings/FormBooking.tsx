import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
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
import { formatDate } from "../../utils/dateUtils";
import ErrorAlert from "../../components/ErrorAlert";
import {
  BookingInitialState,
  BookingType,
  ExtraRoom,
} from "../../@types/bookings";
import { RoomType } from "../../@types/rooms";

const emptyRoom = {
  photos: [""],
  roomType: "string",
  description: "string",
  roomNumber: 0,
  id: "",
  offer: false,
  price: 0,
  discount: 0,
  cancellation: "",
  status: "",
  amenities: [""],
};

type PropsType = {
  initialState: BookingInitialState;
  extraRoom?: ExtraRoom;
  onSubmitAction: (data: BookingType) => Promise<void>;
};

function FormBooking(props: PropsType) {
  const { initialState, extraRoom, onSubmitAction } = props;
  const roomsData = useAppSelector(selectRooms);
  const dispatch = useAppDispatch();
  const [booking, setBooking] = useState({} as BookingInitialState);
  const [submitError, setSubmitError] = useState({
    hasError: false,
    guest: false,
    checkIn: false,
    checkOut: false,
    roomId: false,
  });
  const [availableRooms, setAvailableRooms] = useState<RoomType[]>([]);
  const { theme } = useContext(themeContext);
  const today = formatDate(new Date().getTime())[2];

  function handleInputsChange(e: React.BaseSyntheticEvent) {
    const copyOfData = { ...booking };
    const copyOfSubmitError = { ...submitError };
    const key: keyof BookingInitialState = e.target.name;
    const value = e.target.value;
    if (key !== "roomNumber") copyOfData[key] = value;
    else copyOfData["roomNumber"] = Number(value);
    copyOfSubmitError[key as keyof typeof submitError] = false;
    if (key === "roomId") {
      const room = availableRooms.find((item) => item._id === value);
      if (room) {
        copyOfData["roomNumber"] = room.roomNumber;
        copyOfData["roomType"] = room.roomType;
        copyOfData["roomImg"] = room.photos[0];
      }
    }
    setSubmitError(copyOfSubmitError);
    setBooking(copyOfData);
  }

  function verifyForm(data: BookingInitialState) {
    let isValid = true;
    const errorObj = { ...submitError };
    for (const key in data) {
      if (key === "_id" || key === "specialRequest" || key === "__v") continue;
      if (!data[key as keyof BookingInitialState]) {
        errorObj[key as keyof typeof submitError] = true;
        isValid = false;
      }
    }
    if (!isValid) errorObj.hasError = true;
    setSubmitError(errorObj);
    return isValid;
  }

  function handleOnSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const copyOfData = { ...booking };
    const correctForm = verifyForm(copyOfData);
    if (correctForm) {
      const newCheckIn = new Date(copyOfData.checkIn).getTime();
      const newCheckOut = new Date(copyOfData.checkOut).getTime();
      const newOrderDate = new Date(copyOfData.orderDate).getTime() + 3600 * 8;
      onSubmitAction({
        ...copyOfData,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        orderDate: newOrderDate,
      });
    } else {
      console.log("Something was wrong");
    }
  }

  useEffect(() => {
    const availableRooms = roomsData.filter(
      (item) => item.status === "Available"
    );
    if (extraRoom) {
      const { roomId, roomType, roomNumber } = extraRoom;
      availableRooms.push({
        ...emptyRoom,
        _id: roomId,
        roomType,
        roomNumber,
      });
    }
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
                      <option key={index} value={item._id}>
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
                hasError={false}
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
