import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllContacts,
  updateContact,
  selectContacts,
  selectIsLoading,
} from "./contactSlice.js";
import Button from "../../components/Button";
import ContactPreview from "../../components/ContactPreview";
import MainContainer from "../../components/MainContainer";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { formatDate } from "../../utils";
import { RowDataSmaller } from "../../components/Table";
import Loader from "../../components/Loader.jsx";
import { themeContext } from "../../context/ThemeContext.jsx";

function Contact() {
  const data = useSelector(selectContacts) || [];
  const isLoadingData = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [dataToRender, setDataToRender] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Contacts");
  const { theme } = useContext(themeContext);
  const tabs = ["All Contacts", "Archived"];

  function handleAction(id, type) {
    const copyOfData = structuredClone(data);
    const item = copyOfData.find((el) => el.id === id);
    item.archived = type === "archived";
  }

  const tableHeader = [
    { label: "Date & ID" },
    { label: "Customer Dates" },
    { label: "Subject & Comment" },
    { label: "Action" },
  ];

  const rowsToRender = (item) => {
    const [contactDate] = formatDate(item.date);
    return (
      <>
        <td>
          <div>
            <p>{contactDate}</p>
            <RowDataSmaller theme={theme}>#{item.id}</RowDataSmaller>
          </div>
        </td>
        <td>
          <div>
            <p>{item.fullName}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
          </div>
        </td>
        <td>
          <div>
            <p>{item.subject}</p>
            <Modal
              title={item.fullName}
              content={item.message}
              preview={
                item.message.length > 100
                  ? item.message.slice(0, 100) + "..."
                  : item.message
              }
              previewStyle={{ cursor: "Pointer" }}
              changeToOpen={
                !item.read &&
                (() =>
                  dispatch(
                    updateContact({
                      body: { read: !item.read },
                      id: item.id,
                    })
                  ))
              }
            />
          </div>
        </td>
        <td>
          {item.archived ? (
            <Button
              variant={1}
              onClick={() =>
                dispatch(
                  updateContact({
                    body: { archived: !item.archived },
                    id: item.id,
                  })
                )
              }
            >
              RESTORE
            </Button>
          ) : (
            <Button
              variant={7}
              onClick={() =>
                dispatch(
                  updateContact({
                    body: { archived: !item.archived },
                    id: item.id,
                  })
                )
              }
            >
              ARCHIVE
            </Button>
          )}
        </td>
      </>
    );
  };

  useEffect(() => {
    const orderedList = data
      .map((item) => item)
      .sort((a, b) => {
        if (a["date"] > b["date"]) return 1;
        else if (a["date"] < b["date"]) return -1;
        else return 0;
      });
    setPreviewData(orderedList);
  }, [data]);

  useEffect(() => {
    const copyOfData = structuredClone(data);
    const filterData =
      activeTab === "Archived"
        ? copyOfData.filter((item) => item.archived)
        : copyOfData;
    filterData.sort((a, b) => {
      if (a["date"] > b["date"]) return 1;
      else if (a["date"] < b["date"]) return -1;
      else return 0;
    });
    setDataToRender(filterData);
  }, [activeTab, data]);
  /* useEffect(() => {
    const copyOfData = structuredClone(data);
    const filterData =
      activeTab === "Archived"
        ? copyOfData.filter((item) => item.archived)
        : copyOfData.filter((item) => !item.archived);
    filterData.sort((a, b) => {
      if (a["date"] > b["date"]) return 1;
      else if (a["date"] < b["date"]) return -1;
      else return 0;
    });
    setDataToRender(filterData);
  }, [activeTab, data]); */

  useEffect(() => {
    dispatch(getAllContacts());
  }, []);

  return (
    <MainContainer>
      {isLoadingData ? (
        <Loader />
      ) : (
        <>
          <ContactPreview data={previewData} />
          <Table
            data={dataToRender}
            option="contact"
            tableHeader={tableHeader}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            rows={rowsToRender}
            paginate={true}
          />
        </>
      )}
    </MainContainer>
  );
}

export default Contact;
