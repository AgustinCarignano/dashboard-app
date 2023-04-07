import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllData, getItemData } from "../../mockService/service";
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
  const [newBooking, setNewBooking] = useState(initialState);
  const [availableRooms, setAvailableRooms] = useState([]);
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

  function handleOnSubmit(e) {
    e.preventDefault();
    const copyOfData = { ...newBooking };
    const correctForm = verifyForm(copyOfData);
    console.log(copyOfData);
    if (correctForm) {
      const randomNumber = Math.round(Math.random() * 10000);
      if (!id) copyOfData.id = `newBookingId-${randomNumber}`;
      copyOfData.checkIn = new Date(copyOfData.checkIn).getTime();
      copyOfData.checkOut = new Date(copyOfData.checkOut).getTime();
      console.log(copyOfData);
      setNewBooking(initialState);
      if (id) navigate(`/dashboard-app/bookings/${id}`);
    } else {
      console.log("Something was wrong");
    }
  }

  async function getBookingData() {
    const data = await getItemData("bookings_data.json", id);
    const [checkInDate, checkInTime, checkInCalendarDate] = formatDate(
      data.checkIn
    );
    const [checkOutDate, checkOutTime, checkOutCalendarDate] = formatDate(
      data.checkOut
    );
    data.checkIn = checkInCalendarDate;
    data.checkOut = checkOutCalendarDate;
    setNewBooking(data);
  }

  async function getRoomsData() {
    const data = await getAllData("rooms_data.json");
    const availables = data
      .filter((item) => item.status === "Available")
      .sort((a, b) => {
        if (a.roomType > b.roomType) return 1;
        else if (a.roomType < b.roomType) return -1;
        else return 0;
      });
    setAvailableRooms(availables);
  }

  useEffect(() => {
    getRoomsData();
    if (!id) return;
    getBookingData();
  }, []);

  return (
    <MainContainer>
      <Container>
        <Title>{id ? "Edit Booking" : "New Booking"}</Title>
        <FormContainer>
          <Column>
            <Field>
              <Label>Guest Full Name</Label>
              <Input
                type="text"
                name="guest"
                value={newBooking.guest}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Check In</Label>
              <Input
                type="date"
                name="checkIn"
                value={newBooking.checkIn}
                onChange={handleInputsChange}
              />
            </Field>
            <Field>
              <Label>Check Out</Label>
              <Input
                type="date"
                name="checkOut"
                value={newBooking.checkOut}
                onChange={handleInputsChange}
              />
            </Field>
          </Column>
          <Column>
            <Field>
              <Label>Room</Label>
              <Select
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
              <Label>Special Request</Label>
              <TextArea
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
