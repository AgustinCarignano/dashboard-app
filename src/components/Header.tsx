import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginContext } from "../context/LoginContext";
import {
  getAllContacts,
  selectUnreadContacts,
} from "../store/slices/contactSlice";
import { getBookingsData, selectBookings } from "../store/slices/bookingSlice";
import { themeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faEnvelope,
  faBell,
  faArrowRightFromBracket,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

const StyleHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme[1]};
  padding: 40px 50px;
  min-height: 145px;
  box-shadow: 0px 3px 10px ${(props) => props.theme[20]};
`;

const Title = styled.h1`
  font: normal 600 28px "Poppins", sans-serif;
  color: ${(props) => props.theme[21]};
  margin: 0;
`;

const Breadcrumb = styled.p`
  font: normal 400 14px/21px "Poppins", sans-serif;
`;
const BreadcrumbLink = styled.span`
  color: ${(props) => (props.onClick ? props.theme[15] : props.theme[9])};
  cursor: ${(props) => (props.onClick ? "Pointer" : "auto")};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const shakeNotif = keyframes`
  0%{
    transform:translateX(0px) translateY(0px);
  }
  50%{
    transform:translateX(3px) translateY(-3px);
  }
  100%{
    transform:translateX(0px) translateY(0px);
  }
`;

const IconContainer = styled.div<{ hasAction?: boolean }>`
  color: ${(props) => props.theme[15]};
  position: relative;
  cursor: ${(props) => (props.hasAction ? "Pointer" : "default")};
  span {
    background-color: ${(props) => props.theme[11]};
    border-radius: 8px;
    color: ${(props) => props.theme[25]};
    font-size: 14px;
    width: 30px;
    padding: 6px 0;
    text-align: center;
    position: absolute;
    top: -70%;
    right: -100%;
  }
  &:hover span {
    animation: ${shakeNotif} 0.2s linear 0s 2;
  }
`;

const TitleList = {
  "": "Dashboard",
  bookings: "Bookings",
  rooms: "Rooms",
  contact: "Contact",
  users: "Users",
  login: "Login",
};

function Header(props: { handleSidebarVisibility: () => void }) {
  const { handleSidebarVisibility } = props;
  const { loginState, loginActionTypes, dispatchLogin } =
    useContext(loginContext) || {};
  const [breadcrumb, setBreadcrumb] = useState("");
  const [pathArray, setPathArray] = useState<string[]>([]);
  const { theme, handleThemeChange } = useContext(themeContext);
  const messages = useAppSelector(selectUnreadContacts);
  const bookings = useAppSelector(selectBookings);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleNavigate() {
    const path = `/dashboard-app/${pathArray[2]}/`;
    navigate(path);
  }

  const notifications = bookings.filter(
    (book) =>
      book.orderDate &&
      new Date(book.orderDate).getMonth() === new Date().getMonth()
  ).length;

  useEffect(() => {
    const array = pathname.split("/");
    if (array[3]) {
      if (array[3] === "create") {
        setBreadcrumb(`New ${TitleList[array[2] as keyof typeof TitleList]}`);
      } else if (array[3] === "update") {
        setBreadcrumb(
          `Update ${TitleList[array[2] as keyof typeof TitleList]} / ${
            array[4]
          }`
        );
      } else {
        setBreadcrumb(array[3]);
      }
    } else {
      setBreadcrumb("");
    }
    setPathArray(array);
  }, [pathname]);

  useEffect(() => {
    if (!loginState?.auth) return;
    if (messages === 0) dispatch(getAllContacts());
    if (bookings.length === 0) dispatch(getBookingsData());
  }, [pathname]);

  return (
    <StyleHeader theme={theme}>
      <Container>
        <IconContainer theme={theme}>
          <FontAwesomeIcon
            icon={faArrowRightArrowLeft}
            size="lg"
            onClick={handleSidebarVisibility}
            style={{ cursor: "Pointer" }}
          />
        </IconContainer>
        <TitleContainer>
          <Title theme={theme}>
            {TitleList[pathArray[2] as keyof typeof TitleList] || "Dashboard"}
          </Title>
          {breadcrumb && (
            <Breadcrumb>
              <BreadcrumbLink onClick={handleNavigate} theme={theme}>
                {TitleList[pathArray[2] as keyof typeof TitleList]} /
              </BreadcrumbLink>
              <BreadcrumbLink theme={theme}> {breadcrumb}</BreadcrumbLink>
            </Breadcrumb>
          )}
        </TitleContainer>
      </Container>
      {!loginState?.auth ? (
        <IconContainer theme={theme}>
          <FontAwesomeIcon
            icon={faCircleHalfStroke}
            size="lg"
            onClick={handleThemeChange}
            style={{ cursor: "Pointer" }}
          />
        </IconContainer>
      ) : (
        <Container>
          <IconContainer theme={theme}>
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
            {messages && <span>{messages}</span>}
          </IconContainer>
          <IconContainer theme={theme}>
            <FontAwesomeIcon icon={faBell} size="lg" />
            {notifications !== 0 && <span>{notifications}</span>}
          </IconContainer>
          <IconContainer theme={theme}>
            <FontAwesomeIcon
              icon={faCircleHalfStroke}
              size="lg"
              onClick={handleThemeChange}
              style={{ cursor: "Pointer" }}
            />
          </IconContainer>
          <IconContainer hasAction theme={theme}>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="lg"
              data-cy="logoutBtn"
              onClick={
                dispatchLogin && loginActionTypes
                  ? () => dispatchLogin({ type: loginActionTypes.LOGOUT })
                  : undefined
              }
            />
          </IconContainer>
        </Container>
      )}
    </StyleHeader>
  );
}

export default Header;
