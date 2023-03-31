import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1/5;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  .links {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font: normal 400 16px/25px Poppins, sans-serif;
    color: #6e6e6e;
    .link {
      border-bottom: solid 1px #6e6e6e8d;
      padding: 13px 26px;
      cursor: pointer;
    }
    .active {
      color: #135846;
      border-bottom: solid 2px #135846;
    }
  }
  .buttons {
    display: flex;
    gap: 20px;
  }
`;

const MyTable = styled.table`
  width: 100%;
  margin: 30px 0;
  border-radius: 20px;
  font: normal 400 16px/25px Poppins, sans-serif;
  color: #393939;
  text-align: left;
  background-color: #fff;
  th {
    font-weight: 600;
  }
  tr {
    transition: all 0.3s;
  }
  td,
  th {
    padding: 20px 30px;
    max-width: 400px;
  }
  tbody {
    tr :first-child {
      cursor: pointer;
    }
    tr:nth-child(odd) {
      background-color: #fdfdfd;
    }
    tr:hover {
      box-shadow: 0px 4px 30px #0000001a;
    }
  }
  .firstColumn {
    display: flex;
    flex-direction: column;
    font-weight: 500;
  }
  .idField {
    color: #799283;
    font-size: 14px;
    font-weight: 300;
  }
  .rooms_firstColumn {
    display: flex;
    gap: 10px;
    min-width: 170px;
    align-items: center;
    .idField {
      margin-top: 5px;
    }
    .img {
      width: 100px;
    }
    img {
      width: 100%;
      border-radius: 8px;
    }
  }
`;

const PaginateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font: normal 400 16px/25px Poppins, sans-serif;
  color: #393939;
  align-items: center;
`;

const Paginate = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
`;

const PaginateNumbers = styled(Paginate)`
  gap: 0;
  background-color: #f5f5f5;
  color: #393939;
  span {
    width: 50px;
    padding: 13px 0;
    text-align: center;
    border-radius: 12px;
  }
  .active {
    background-color: #135846;
    color: #fff;
  }
`;

const tableOptions = {
  bookings: [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
  ],
  rooms: ["Room", "Room Type", "Amenities", "Price", "Offer Price", "Status"],
  contact: ["Date & ID", "Customer Dates", "Subject & Comment", "Action"],
  users: ["Name", "Start Date", "Description", "Contact", "Status"],
};

function Table(props) {
  const { data, option, tabs, activeTab, setActiveTab, rows, newBtn } = props;
  const [dataToRender, setDataToRender] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginateBar, setPaginateBar] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const navigate = useNavigate();

  function handlePaginate(direction) {
    switch (direction) {
      case "next":
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        break;
      case "prev":
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        break;
      default:
        break;
    }
  }

  function handleNewItem() {
    const path = `/dashboard-app/${option}/create`;
    navigate(path);
  }

  useEffect(() => {
    if (data.length > 10) {
      const filterData = data.slice(
        10 * (currentPage - 1),
        10 * (currentPage - 1) + 10
      );
      setDataToRender(filterData);
      setItemsPerPage(10);
    } else {
      setDataToRender(data.slice(0, data.length));
      setItemsPerPage(data.length);
    }
    const total = Math.ceil(data.length / 10);
    const pages = [];
    for (let index = 1; index <= total; index++) {
      pages.push(index);
    }
    setTotalPages(total);
    setPaginateBar(pages);
  }, [data, currentPage]);

  return (
    <TableContainer>
      <TableHeader>
        <div className="links">
          {tabs.map((item, index) => {
            return (
              <p
                key={index}
                className={activeTab === item ? "link active" : "link"}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </p>
            );
          })}
        </div>
        <div className="buttons">
          {newBtn && (
            <Button variant={1} onClick={handleNewItem}>
              + {newBtn}
            </Button>
          )}
          <Button variant={4}>Newest</Button>
        </div>
      </TableHeader>
      <MyTable>
        <thead>
          <tr>
            {tableOptions[option].map((item, index) => {
              return <th key={index}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {dataToRender.length > 0 &&
            dataToRender.map((item, index) => {
              return (
                <tr key={index} /* onClick={() => handleRedirect(item.id)} */>
                  {rows(item)}
                </tr>
              );
              /* return (
                <tr key={index} onClick={() => handleRedirect(item.id)}>
                  <td className="firstColumn">
                    <p>{item.guest}</p>
                    <p className="idField">#{item.id}</p>
                  </td>
                  <td>{item.orderDate}</td>
                  <td>
                    {new Date(item.checkIn).toDateString("en-us", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </td>
                  <td>{item.checkOut}</td>
                  <td>
                    <Button variant={item.specialRequest ? 3 : 4}>
                      View Notes
                    </Button>
                  </td>
                  <td>{item.roomType}</td>
                  <td>
                    <Button variant={availableStates[item.status]}>
                      {item.status}
                    </Button>
                  </td>
                </tr>
              ); */
            })}
        </tbody>
      </MyTable>
      <PaginateContainer>
        <p>
          Showing {itemsPerPage} of {data.length} Data
        </p>
        <Paginate>
          <Button variant={5} onClick={() => handlePaginate("prev")}>
            Prev
          </Button>
          <PaginateNumbers>
            {paginateBar.map((item) => {
              return (
                <span
                  key={item}
                  className={item === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </span>
              );
            })}
          </PaginateNumbers>
          <Button variant={5} onClick={() => handlePaginate("next")}>
            Next
          </Button>
        </Paginate>
      </PaginateContainer>
    </TableContainer>
  );
}

export default Table;
