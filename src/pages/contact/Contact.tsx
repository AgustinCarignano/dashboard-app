import { useContext, useEffect, useState } from "react";
import {
  getAllContacts,
  updateContact,
  selectContacts,
  selectIsLoading,
} from "../../store/slices/contactSlice";
import Button from "../../components/Button";
import ContactPreview from "../../components/ContactPreview";
import MainContainer from "../../components/MainContainer";
import Modal from "../../components/Modal";
import Table, { IRowItem } from "../../components/Table";
import { formatDate } from "../../utils/dateUtils";
import { RowDataSmaller } from "../../components/Table";
import Loader from "../../components/Loader";
import { themeContext } from "../../context/ThemeContext";
import {
  useAppDispatch,
  useAppSelector,
  useFetchWrapp,
} from "../../hooks/hooks";
import { ContactType } from "../../@types/contacts";

function Contact() {
  const data = useAppSelector(selectContacts);
  const isLoadingData = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const wrappedDispatch = useFetchWrapp(getAllContacts);
  const [dataToRender, setDataToRender] = useState<ContactType[]>([]);
  const [previewData, setPreviewData] = useState<ContactType[]>([]);
  const [activeTab, setActiveTab] = useState("All Contacts");
  const { theme } = useContext(themeContext);
  const tabs = ["All Contacts", "Archived"];

  const tableHeader = [
    { label: "Date & ID" },
    { label: "Customer Dates" },
    { label: "Subject & Comment" },
    { label: "Action" },
  ];

  const rowsToRender = (item: ContactType): IRowItem => {
    const [contactDate] = formatDate(item.date);
    return {
      id: item._id,
      rowData: [
        <div>
          <p>{contactDate}</p>
          <RowDataSmaller theme={theme}>#{item._id}</RowDataSmaller>
        </div>,
        <div>
          <p>{item.fullName}</p>
          <p>{item.email}</p>
          <p>{item.phone}</p>
        </div>,
        <div style={!item._read ? { fontWeight: "500" } : {}}>
          <p style={{ fontStyle: "italic", fontSize: "14px" }}>
            {item.subject}
          </p>
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
              !item._read
                ? () =>
                    dispatch(
                      updateContact({
                        body: { ...item, _read: !item._read },
                        id: item._id,
                      })
                    )
                : undefined
            }
          />
        </div>,
        <Button
          variant={item.archived ? 1 : 7}
          onClick={() =>
            dispatch(
              updateContact({
                body: { ...item, archived: !item.archived },
                id: item._id,
              })
            )
          }
        >
          {item.archived ? "RESTORE" : "ARCHIVE"}
        </Button>,
      ],
    };
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

  useEffect(() => {
    //dispatch(getAllContacts());
    wrappedDispatch();
  }, [dispatch]);

  return (
    <MainContainer>
      {isLoadingData ? (
        <Loader />
      ) : (
        <>
          <ContactPreview data={previewData} variant={0} />
          <Table
            data={dataToRender}
            option="contact"
            tableHeader={tableHeader}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            rowsGenerator={rowsToRender}
            paginate={true}
            draggableRow={false}
          />
        </>
      )}
    </MainContainer>
  );
}

export default Contact;
