import React from "react";
import { useParams } from "react-router-dom";
import Aside from "../sharedComponents/Aside";
import SmallCard from "../sharedComponents/SmallCard";
import Header from "../sharedComponents/Header";
import Layout from "../sharedComponents/Layout";
import MainContainer from "../sharedComponents/MainContainer";
import ContactContainer from "../sharedComponents/ContactContainer";
import ContactCard from "../sharedComponents/ContactCard";

const fakeContacts = [
  {
    name: "Juan Perez",
    email: "juanperez@mail.com",
    phone: "4567892",
    subject: "Rooms service",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    name: "Esteban Gutierrez",
    email: "estebangutierrez@mail.com",
    phone: "4567892",
    subject: "Rooms service",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
  {
    name: "Elena Juncos",
    email: "elenajuncos@mail.com",
    phone: "4567892",
    subject: "Rooms service",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
];

function Dashboard() {
  const { id } = useParams();
  return (
    <Layout>
      <Header title="Dashboard" />
      <Aside activeLink="dashboard" />
      <MainContainer>
        <SmallCard type="newBooking" number={8461} active={false} />
        <SmallCard type="schedule" number={963} active={true} />
        <SmallCard type="checkIn" number={753} active={false} />
        <SmallCard type="checkOut" number={516} active={false} />
        <ContactContainer>
          <h2 className="title">Latest Contacts</h2>
          <div className="cards">
            {fakeContacts.map((item) => {
              return (
                <ContactCard
                  name={item.name}
                  email={item.email}
                  phone={item.phone}
                  subject={item.subject}
                  message={item.message}
                />
              );
            })}
          </div>
        </ContactContainer>
      </MainContainer>
    </Layout>
  );
}

export default Dashboard;
