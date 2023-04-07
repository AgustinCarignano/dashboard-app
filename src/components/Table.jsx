import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1/5;
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabLinks = styled.div`
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: ${(props) => `repeat(${props.columns},1fr)`};
  font: normal 400 16px/25px Poppins, sans-serif;
  color: #6e6e6e;
`;
const Link = styled.p`
  color: ${(props) => (props.active ? "#135846" : "#6e6e6e")};
  border-bottom: ${(props) =>
    props.active ? "solid 2px #135846" : "solid 1px #6e6e6e8d"};
  padding: 13px 26px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: solid 1px #6e6e6e8d;
  color: #6e6e6e;
`;
const Search = styled.input`
  border: none;
  outline: none;
  font: normal 400 16px/25px Poppins, sans-serif;
  background-color: transparent;
  color: #6e6e6e;
`;

const BtnsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const MyTable = styled.table`
  width: 100%;
  margin: 30px 0;
  border-radius: 20px;
  font: normal 400 16px/25px Poppins, sans-serif;
  color: #393939;
  text-align: left;
  background-color: #fff;
  tr {
    transition: all 0.3s;
  }
  td,
  th {
    padding: 20px 30px;
    max-width: 400px;
  }
  tbody {
    tr > :first-child {
      cursor: pointer;
    }
    tr:nth-child(odd) {
      background-color: #fdfdfd;
    }
    tr:hover {
      box-shadow: 0px 4px 30px #0000001a;
    }
  }
`;
const TableHeader = styled.th`
  font-weight: 600;
  cursor: ${(props) => (props.onClick ? "Pointer" : "normal")};
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 10px;
  min-width: 170px;
  align-items: center;
  justify-content: ${(props) => props.justify};
`;
export const RowDataBigger = styled.p`
  font-weight: 500;
`;
export const RowDataSmaller = styled.p`
  color: #799283;
  font-size: 14px;
  font-weight: 300;
`;
export const ImgRowContainer = styled.div`
  width: 100px;
  img {
    width: 100%;
    border-radius: 8px;
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
`;
const PaginateItem = styled.span`
  width: 50px;
  padding: 13px 0;
  text-align: center;
  border-radius: 12px;
  background-color: ${(props) => (props.active ? "#135846" : "#f5f5f5")};
  color: ${(props) => (props.active ? "#ffffff" : "#393939")};
  cursor: pointer;
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
  dashboard: ["Room", "Guest", "Check In", "Check Out"],
};

function Table(props) {
  const {
    data,
    option,
    tableHeader,
    tabs,
    activeTab,
    setActiveTab,
    setSearchTerms,
    rows,
    newBtn,
    newestAction,
    paginate,
  } = props;
  const [dataToRender, setDataToRender] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginateBar, setPaginateBar] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const navigate = useNavigate();

  function MoveNextPage() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }
  function MovePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
      {tabs && (
        <TabList>
          <TabLinks columns={tabs.length}>
            {tabs.map((item, index) => {
              return (
                <Link
                  key={index}
                  active={activeTab === item}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </Link>
              );
            })}
          </TabLinks>
          {setSearchTerms && (
            <SearchContainer>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <Search
                placeholder="Search by name..."
                onChange={(e) => setSearchTerms(e.target.value)}
              />
            </SearchContainer>
          )}
          <BtnsContainer>
            {newBtn && (
              <Button variant={1} onClick={handleNewItem}>
                + {newBtn}
              </Button>
            )}
            {newestAction && (
              <Button variant={4} onClick={newestAction}>
                Newest
              </Button>
            )}
          </BtnsContainer>
        </TabList>
      )}
      <MyTable>
        <thead>
          <tr>
            {tableHeader.map((item, index) => (
              <TableHeader
                key={index}
                onClick={item.action ? item.action : null}
              >
                {item.label}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataToRender.length > 0 &&
            dataToRender.map((item, index) => {
              return <tr key={index}>{rows(item)}</tr>;
            })}
        </tbody>
      </MyTable>
      {paginate && (
        <PaginateContainer>
          <p>
            Showing {itemsPerPage} of {data.length} Data
          </p>
          <Paginate>
            <Button variant={5} onClick={MovePrevPage}>
              Prev
            </Button>
            <PaginateNumbers>
              {paginateBar.map((item) => (
                <PaginateItem
                  key={item}
                  active={item === currentPage}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </PaginateItem>
              ))}
            </PaginateNumbers>
            <Button variant={5} onClick={MoveNextPage}>
              Next
            </Button>
          </Paginate>
        </PaginateContainer>
      )}
    </TableContainer>
  );
}

export default Table;
