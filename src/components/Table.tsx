import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import update from "immutability-helper";
//import type { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { themeContext } from "../context/ThemeContext";
import StaticRow from "./StaticRow";
import DraggableRow from "./DraggableRow";
import { BookingType } from "../@types/bookings";
import { ContactType } from "../@types/contacts";
import { RoomType } from "../@types/rooms";
import { UserType } from "../@types/users";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1/5;
`;

const TabList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabLinks = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.columns},1fr)`};
  font: normal 400 16px/25px Poppins, sans-serif;
  color: ${(props) => props.theme[9]};
`;
const Link = styled.p<{ active: boolean }>`
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

export const RowContainer = styled.div<{ justify: string }>`
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
export const ImgRowContainer = styled.div<{ aspectRatio: string }>`
  width: 100px;
  img {
    width: 100%;
    border-radius: 8px;
    aspect-ratio: ${(props) => props.aspectRatio};
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
  & :first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  & :last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;
const PaginateItem = styled.span<{ active: boolean }>`
  width: 50px;
  padding: 13px 0;
  text-align: center;
  //border-radius: 12px;
  background-color: ${(props) =>
    props.active ? props.theme[15] : props.theme[6]};
  color: ${(props) => (props.active ? props.theme[25] : props.theme[9])};
  cursor: pointer;
`;

export interface IRowItem {
  id: string;
  rowData: React.ReactElement[];
}

type UnionType = BookingType & ContactType & RoomType & UserType;

export type PropsType = {
  data: any[];
  option: string;
  tableHeader: { label: string; action?: () => void }[];
  tabs?: string[];
  activeTab?: string;
  setActiveTab?: (item: string) => void;
  setSearchTerms?: (terms: string) => void;
  rowsGenerator: (item: UnionType) => IRowItem;
  newBtn?: string;
  newestAction?: () => void;
  paginate: boolean;
  draggableRow: boolean;
};

function Table(props: PropsType) {
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
  const [rows, setRows] = useState<
    { id: string; rowData: React.ReactElement[] }[]
  >([]);
  const [dataToRender, setDataToRender] = useState<UnionType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginateBar, setPaginateBar] = useState<number[]>([]);
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
    const pages: number[] = [];
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

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setRows((prevRows) =>
      update(prevRows, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevRows[dragIndex]],
        ],
      })
    );
  }, []);

  const renderRow = useCallback((row: IRowItem, index: number) => {
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
                  onClick={setActiveTab ? () => setActiveTab(item) : undefined}
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
                data-cy="searchBar"
                theme={theme}
                placeholder="Search by name..."
                onChange={(e) => setSearchTerms(e.target.value)}
              />
            </SearchContainer>
          )}
          <BtnsContainer>
            {newBtn && (
              <Button variant={1} onClick={handleNewItem}>
                {"+  " + newBtn}
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
        <MyTable theme={theme} data-cy="dataTable">
          <thead>
            <tr>
              {tableHeader.map((item, index) => (
                <TableHeader
                  key={index}
                  onClick={item.action ? item.action : undefined}
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
