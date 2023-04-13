import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createBooking,
  getBookingDetails,
  selectBookingDetail,
  updateBooking,
} from "./bookingSlice";
import { getRoomsData, selectRooms } from "../rooms/roomSlice.js";
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
} from "../../components/FormComponents";
import { formatDate } from "../../utils";
import { themeContext } from "../../context/ThemeContext";

const initialState = {
  id: "",
  guest: "",
  specialRequest: "",
  orderDate: new Date().getTime(),
  roomType: "",
  roomNumber: "",
  status: "Check In",
  checkIn: "",
  checkOut: "",
  roomId: "",
};

function NewBooking() {
  const bookingData = useSelector(selectBookingDetail);
  const roomsData = useSelector(selectRooms);
  const dispatch = useDispatch();
  const [newBooking, setNewBooking] = useState(initialState);
  const [availableRooms, setAvailableRooms] = useState([]);
  const { theme } = useContext(themeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleInputsChange(e) {
    const copyOfData = { ...newBooking };
    const key = e.target.name;
    const value = e.target.value;
    copyOfData[key] = value;
    if (key === "roomId") {
      const room = availableRooms.find((item) => item.id === value);
      copyOfData["roomNumber"] = room.roomNumber;
      copyOfData["roomType"] = room.roomType;
    }
    setNewBooking(copyOfData);
  }

  function verifyForm(data) {
    for (const key in data) {
      if (key === "id" || key === "specialRequest") continue;
      if (!data[key]) return false;
    }
    return true;
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const copyOfData = { ...newBooking };
    const correctForm = verifyForm(copyOfData);
    if (correctForm) {
      copyOfData.checkIn = new Date(copyOfData.checkIn).getTime();
      copyOfData.checkOut = new Date(copyOfData.checkOut).getTime();
      if (id) {
        try {
          await dispatch(updateBooking({ body: copyOfData, id })).unwrap();
          navigate(`/dashboard-app/bookings/${id}`);
        } catch (error) {
          console.log("there has been an error", error);
        }
      } else {
        dispatch(createBooking(copyOfData));
      }
      setNewBooking(initialState);
    } else {
      console.log("Something was wrong");
    }
  }

  useEffect(() => {
    if (id) {
      const copyOfBooking = structuredClone(bookingData);
      copyOfBooking.checkIn = formatDate(bookingData.checkIn)[2];
      copyOfBooking.checkOut = formatDate(bookingData.checkOut)[2];
      setNewBooking(copyOfBooking);
    }
  }, [bookingData]);

  useEffect(() => {
    const availableRooms = roomsData
      .filter((item) => item.status === "Available")
      .sort((a, b) => {
        if (a.roomType > b.roomType) return 1;
        else if (a.roomType < b.roomType) return -1;
        else return 0;
      });
    setAvailableRooms(availableRooms);
  }, [roomsData]);

  useEffect(() => {
    dispatch(getRoomsData());
    if (id) dispatch(getBookingDetails(id));
  }, []);

  return (
    <MainContainer>
      <Container theme={theme}>
        <Title theme={theme}>{id ? "Edit Booking" : "New Booking"}</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label theme={theme}>Guest Full Name</Label>
              <Input
                autoComplete="off"
                theme={theme}
                type="text"
                name="guest"
                value={newBooking.guest}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Check In</Label>
              <Input
                autoComplete="off"
                theme={theme}
                type="date"
                name="checkIn"
                value={newBooking.checkIn}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label theme={theme}>Check Out</Label>
              <Input
                autoComplete="off"
                theme={theme}
                type="date"
                name="checkOut"
                value={newBooking.checkOut}
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
                value={newBooking.roomId}
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
                value={newBooking.specialRequest}
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
}

export default NewBooking;
