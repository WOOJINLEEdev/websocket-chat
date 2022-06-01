import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

import { menuState } from "components/Menu";

const ChatHeader = () => {
  const setMenuShow = useSetRecoilState(menuState);

  const handleMenuClick = () => {
    setMenuShow((prev) => !prev);
  };

  return (
    <Header>
      <Button type="button" aria-label="Go Back">
        <IoIosArrowBack />
      </Button>

      <h1>User</h1>

      <Button type="button" onClick={handleMenuClick} aria-label="Menu">
        <BsThreeDots />
      </Button>
    </Header>
  );
};

export default ChatHeader;

const Header = styled.header`
  display: flex;
  height: 60px;
  color: #ffffff;
  background: green;
  border: 0;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.3);

  & h1 {
    width: 70%;
    line-height: 60px;

    @media only screen and (min-width: 768px) {
      width: calc(100% - 120px);
    }
  }
`;

const Button = styled.button`
  width: 15%;
  height: 100%;
  background: green;
  border: 0;
  padding: 0;

  & svg {
    fill: #ffffff;
    width: 20px;
    height: 20px;
    margin: 20px 0;
  }

  @media only screen and (min-width: 768px) {
    max-width: 60px;
  }
`;
