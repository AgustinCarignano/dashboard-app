import { useContext, useEffect, useState } from "react";
import {
  getAllContacts,
  selectContacts,
  selectIsLoading as selectLoadingBookings,
} from "../../store/slices/contactSlice";
import {
  getBookingsData,
  selectBookings,
  selectIsLoading as selectLoadingContacts,
} from "../../store/slices/bookingSlice";
import SmallCard from "../../components/SmallCard";
import MainContainer from "../../components/MainContainer";
import ContactPreview from "../../components/ContactPreview";
import { formatDate } from "../../utils/dateUtils";
import Table, { IRowItem } from "../../components/Table";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { themeContext } from "../../context/ThemeContext";
import {
  useAppSelector,
  useAppDispatch,
  useFetchWrapp,
} from "../../hooks/hooks";
import { BookingType } from "../../@types/bookings";
import { ContactType } from "../../@types/contacts";
import { useNavigate } from "react-router-dom";

const FirstColumn = styled.div`
  display: flex;
  gap: 20px;
  margin-right: -80px;
  img {
    width: 50%;
    max-width: 150px;
    aspect-ratio: 16/9;
    border-radius: 8px;
  }
  div {
    width: 50%;
    h4 {
      font: normal 500 20px/30px "Poppins", Sans-Serif;
      color: ${(props) => props.theme[17]};
    }
    p {
      font: normal 400 14px/21px "Poppins", Sans-Serif;
      color: ${(props) => props.theme[23]};
    }
  }
`;

const cardsInfo = [
  { type: "newBooking", number: 8461 },
  { type: "schedule", number: "63%" },
  { type: "checkIn", number: 753 },
  { type: "checkOut", number: 516 },
];

function Dashboard() {
  const bookingsData = useAppSelector(selectBookings);
  const isLoadingBookings = useAppSelector(selectLoadingBookings);
  const contacts = useAppSelector(selectContacts);
  const isLoadingContacts = useAppSelector(selectLoadingContacts);
  const theme = useContext(themeContext);
  const dispatch = useAppDispatch();
  const wrappedDispatchBookings = useFetchWrapp(getBookingsData);
  const navigate = useNavigate();
  const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);
  const [latestContacts, setLatestContacts] = useState<ContactType[]>([]);

  const tableHeader = [
    { label: "Room" },
    { label: "Guest" },
    { label: "Check In" },
    { label: "Check Out" },
  ];

  const rowsToRender = (item: BookingType): IRowItem => {
    let [checkInDate, checkInTime] = item.checkIn
      ? formatDate(item.checkIn)
      : "";
    let [checkOutDate, checkOutTime] = item.checkOut
      ? formatDate(item.checkOut)
      : "";
    return {
      id: item._id,
      rowData: [
        <FirstColumn
          theme={theme}
          onClick={() => navigate(`/dashboard-app/bookings/${item._id}`)}
        >
          <img src={item.roomImg} alt={"room" + item.roomNumber} />
          <div>
            <h4>{item.roomType}</h4>
            <p>{item.roomNumber}</p>
          </div>
        </FirstColumn>,
        <div>{item.guest}</div>,
        <div>
          <p>{checkInDate}</p>
          <p>{checkInTime}</p>
        </div>,
        <div>
          <p>{checkOutDate}</p>
          <p>{checkOutTime}</p>
        </div>,
      ],
    };
  };

  useEffect(() => {
    dispatch(getAllContacts());
    wrappedDispatchBookings();
  }, [dispatch]);

  useEffect(() => {
    const period = {
      start: 1680307200000,
      end: 1685577600000,
    };
    if (bookingsData.length > 0) {
      const filterData = bookingsData.filter((item) => {
        if (item.orderDate) {
          return item.orderDate > period.start && item.orderDate < period.end;
        }
      });
      setFilteredBookings(filterData);
    }
  }, [bookingsData]);

  useEffect(() => {
    const latest = contacts.filter((item) => !item._read);
    setLatestContacts(latest);
  }, [contacts]);

  if (isLoadingBookings || isLoadingContacts) return <Loader />;

  return (
    <MainContainer>
      <>
        {cardsInfo.map((item, index) => (
          <SmallCard type={item.type} number={item.number} key={index} />
        ))}
        {filteredBookings.length !== 0 && (
          <Table
            data={filteredBookings}
            option="dashboard"
            tableHeader={tableHeader}
            rowsGenerator={rowsToRender}
            paginate={false}
            draggableRow={false}
          />
        )}
        {
          <ContactPreview
            title="Latest Contacts"
            data={latestContacts}
            variant={1}
          />
        }
      </>
    </MainContainer>
  );
}

export default Dashboard;
