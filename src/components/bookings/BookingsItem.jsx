import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemData } from "../../mockService/service.js";
import styled from "styled-components";
import MainContainer from "../sharedComponents/MainContainer.jsx";
import Button from "../sharedComponents/Button.jsx";

const fonts = {
  style1: {
    font: "normal 600 30px/46px Poppins, sans-serif;",
    color: "#212121",
  },
  style2: {
    font: "normal 500 24px/35px Poppins, sans-serif;",
    color: "#212121",
  },
  style3: {
    font: "normal 600 16px/25px Poppins, sans-serif;",
    color: "#212121",
  },
  style4: {
    font: "normal 400 14px/21px Poppins, sans-serif;",
    color: "#799283",
  },
  style5: {
    font: "normal 400 14px/21px Poppins, sans-serif;",
    color: "#6E6E6E",
  },
  style6: {
    font: "normal 400 14px/21px Poppins, sans-serif;",
    color: "#363636",
  },
};

const ItemContainer = styled.div`
  display: flex;
  border-radius: 20px;
  grid-column: 1/5;
  background-color: #fff;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 50%;
  margin: 40px;
  .guest {
    display: flex;
    gap: 50px;
    &_img {
      width: 25%;
      border-radius: 12px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    &_detail {
      h1 {
        font: ${fonts["style1"].font};
        color: ${fonts["style1"].color};
      }
      p {
        font: ${fonts["style4"].font};
        color: ${fonts["style4"].color};
      }
    }
  }
  .dates {
    display: flex;
    border-bottom: solid 3px #f5f5f5;
    padding-bottom: 20px;
    div {
      width: 50%;
    }
    &_type {
      font: ${fonts["style5"].font};
      color: ${fonts["style5"].color};
      padding: 5px 0;
    }
    &_value {
      font: ${fonts["style3"].font};
      color: ${fonts["style3"].color};
      padding: 5px 0;
    }
  }
  .room {
    display: flex;
    div {
      width: 50%;
    }
    &_type {
      font: ${fonts["style5"].font};
      color: ${fonts["style5"].color};
      padding: 5px 0;
    }
    &_value {
      font: ${fonts["style2"].font};
      color: ${fonts["style2"].color};
      padding: 5px 0;
    }
  }
  .amenities {
    &_title {
      font: ${fonts["style5"].font};
      color: ${fonts["style5"].color};
    }
    &_items {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      .remark {
        transform: scale(1.2);
        margin: 15px 15px 0;
      }
    }
  }
`;
const availableStates = {
  "Check In": 6,
  "Check Out": 7,
  "In Progress": 8,
};

const RightColumn = styled.div`
  width: 50%;
  background-color: #c5c5c5;
  .status {
  }
`;

function BookingsItem() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  let formatCheckIn = new Date(item.checkIn)
    .toLocaleDateString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace("at", "|");
  let formatCheckOut = new Date(item.checkOut).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  async function getData(path, itemId) {
    const data = await getItemData(path, itemId);
    setItem(data);
  }

  useEffect(() => {
    getData("../mockData/bookings_data.json", id);
  }, []);

  return (
    <MainContainer>
      <ItemContainer>
        <LeftColumn>
          <div className="guest">
            {/* <div className="guest_img">
              <img src="https://i.imgur.com/wcT5ydV.jpg" alt="" />
            </div> */}
            <div className="guest_detail">
              <h1>{item.guest}</h1>
              <p>ID {item.id}</p>
            </div>
          </div>
          <div className="dates">
            <div>
              <p className="dates_type">Check In</p>
              <p className="dates_value">{formatCheckIn}</p>
            </div>
            <div>
              <p className="dates_type">Check Out</p>
              <p className="dates_value">{formatCheckOut}</p>
            </div>
          </div>
          <div className="room">
            <div>
              <p className="room_type">Rooms Info</p>
              <p className="room_value">{item.roomType}</p>
            </div>
            <div>
              <p className="room_type">Price</p>
              <p className="room_value">$875</p>
            </div>
          </div>
          <div>{item.specialRequest && <p>{item.specialRequest}</p>}</div>
          <div className="amenities">
            <h4 className="amenities_title">Amenities</h4>
            <div className="amenities_items">
              <Button variant={2} className="remark">
                3 Bed Space
              </Button>
              <Button variant={2} className="remark">
                24 Hours Guard
              </Button>
              <Button variant={2} className="remark">
                Free WiFi
              </Button>
              <Button variant={2}>2 Bathroom</Button>
              <Button variant={2}>air Conditioner</Button>
              <Button variant={2}>Television</Button>
            </div>
          </div>
        </LeftColumn>
        <RightColumn>
          <img src="" alt="" />
        </RightColumn>
      </ItemContainer>
    </MainContainer>
  );
}

export default BookingsItem;
