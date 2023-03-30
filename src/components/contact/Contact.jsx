import React, { useEffect, useState } from "react";
import { getAllData } from "../../mockService/service";
import Button from "../sharedComponents/Button";
import ContactCard from "../sharedComponents/ContactCard";
import ContactContainer from "../sharedComponents/ContactContainer";
import ContactPreview from "../sharedComponents/ContactPreview";
import MainContainer from "../sharedComponents/MainContainer";
import Table from "../sharedComponents/Table";

function Contact() {
  const [data, setData] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);
  const [activeTab, setActiveTab] = useState("All Contacts");
  const tabs = ["All Contacts", "Archived"];

  async function getData() {
    const newData = await getAllData("mockData/contact_data.json");
    setData(newData);
  }

  function handleAction(id, type) {
    const copyOfData = structuredClone(data);
    const item = copyOfData.find((el) => el.id === id);
    item.archived = type === "archived";
    setData(copyOfData);
  }

  const rowsToRender = (item) => {
    return (
      <>
        <td>
          <div>
            <p>{item.date}</p>
            <p>{item.id}</p>
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
            <p>{item.message}</p>
          </div>
        </td>
        <td>
          {item.archived ? (
            <Button
              variant={1}
              onClick={() => handleAction(item.id, "restore")}
            >
              RESTORE
            </Button>
          ) : (
            <Button
              variant={7}
              onClick={() => handleAction(item.id, "archived")}
            >
              ARCHIVE
            </Button>
          )}
        </td>
      </>
    );
  };

  useEffect(() => {
    const copyOfData = structuredClone(data);
    const filterData =
      activeTab === "Archived"
        ? copyOfData.filter((item) => item.archived)
        : copyOfData.filter((item) => !item.archived);
    setDataToRender(filterData);
  }, [activeTab, data]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainContainer>
      <ContactPreview data={data} bg_color="none" shadow={false} />
      <Table
        data={dataToRender}
        option="contact"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rows={rowsToRender}
      />
    </MainContainer>
  );
}

export default Contact;
