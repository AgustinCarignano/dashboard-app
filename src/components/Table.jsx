import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { themeContext } from "../context/ThemeContext";
import StaticRow from "./StaticRow";
import DraggableRow from "./DraggableRow";

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
  grid-template-columns: ${(props) => `repeat(${props.columns},1fr)`};
  font: normal 400 16px/25px Poppins, sans-serif;
  color: ${(props) => props.theme[9]};
`;
const Link = styled.p`
  color: ${(props) => (props.active ? props.theme[15] : props.theme[9])};
  border-bottom: ${(props) =>
    props.active
      ? `solid 2px ${props.theme[15]}`
      : `solid 1px ${props.theme[7]}`};
  padding: 13px 26px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: solid 1px ${(props) => props.theme[7]};
  color: ${(props) => props.theme[9]};
`;
const Search = styled.input`
  border: none;
  outline: none;
  font: normal 400 16px/25px Poppins, sans-serif;
  background-color: transparent;
  color: ${(props) => props.theme[9]};
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
  color: ${(props) => props.theme[17]};
  text-align: left;
  background-color: ${(props) => props.theme[1]};
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
      background-color: ${(props) => props.theme[29]};
    }
    tr:hover {
      box-shadow: 0px 4px 30px ${(props) => props.theme[28]};
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
  color: ${(props) => props.theme[12]};
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
  color: ${(props) => props.theme[17]};
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
  background-color: ${(props) =>
    props.active ? props.theme[15] : props.theme[6]};
  color: ${(props) => (props.active ? props.theme[25] : props.theme[9])};
  cursor: pointer;
`;

function Table(props) {
  const {
    data,
    option,
    tableHeader,
    tabs,
    activeTab,
    setActiveTab,
    setSearchTerms,
    rowsGenerator,
    newBtn,
    newestAction,
    paginate,
    draggableRow,
  } = props;
  const [rows, setRows] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginateBar, setPaginateBar] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const { theme } = useContext(themeContext);
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

  useEffect(() => {
    const rows = dataToRender.map((item) => rowsGenerator(item));
    setRows(rows);
  }, [dataToRender, rowsGenerator]);

  const moveRow = useCallback((dragIndex, hoverIndex) => {
    setRows((prevRows) =>
      update(prevRows, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevRows[dragIndex]],
        ],
      })
    );
  }, []);

  const renderRow = useCallback((row, index) => {
    if (draggableRow) {
      return (
        <DraggableRow
          key={row.id}
          index={index}
          id={row.id}
          rowData={row.rowData}
          moveRow={moveRow}
        />
      );
    } else {
      return <StaticRow key={row.id} rowData={row.rowData} />;
    }
  }, []);

  return (
    <TableContainer>
      {tabs && (
        <TabList>
          <TabLinks columns={tabs.length} theme={theme}>
            {tabs.map((item, index) => {
              return (
                <Link
                  key={index}
                  active={activeTab === item}
                  theme={theme}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </Link>
              );
            })}
          </TabLinks>
          {setSearchTerms && (
            <SearchContainer theme={theme}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <Search
                theme={theme}
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
      <DndProvider backend={HTML5Backend}>
        <MyTable theme={theme}>
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
          <tbody>{rows.map((row, i) => renderRow(row, i))}</tbody>
        </MyTable>
      </DndProvider>
      {paginate && (
        <PaginateContainer theme={theme}>
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
                  theme={theme}
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
