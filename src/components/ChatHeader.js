import React from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import useMenuCollapsed from "hooks/useMenuCollapsed";

const ChatHeader = () => {
  const { data, mutate } = useMenuCollapsed();

  const handleMenuClick = () => {
    mutate(!data);
  };

  return (
    <Header>
      <Button type="button">
        <IoIosArrowBack />
        <span className="visually_hidden">나가기</span>
      </Button>

      <h1>User</h1>

      <Button type="button" onClick={handleMenuClick}>
        <BsThreeDots />
        <span className="visually_hidden">메뉴</span>
      </Button>
    </Header>
  );
};

export default React.memo(ChatHeader);

const Header = styled.header`
  display: flex;
  height: 60px;
  color: #fff;
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
    fill: #fff;
    width: 20px;
    height: 20px;
    margin: 20px 0;
  }

  @media only screen and (min-width: 768px) {
    max-width: 60px;
  }
`;
