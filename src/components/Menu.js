import React from "react";
import styled from "styled-components";

const Menu = ({ show }) => {
  return (
    <MenuWrap className={show ? "" : "menu_hidden"} show={show}>
      <nav aria-labelledby="aside_menu">
        <MenuTitle id="aside_menu">MENU</MenuTitle>
        <MenuList>
          <MenuItem data-name="Menu1" tabIndex="0">
            Menu1
          </MenuItem>
          <MenuItem data-name="Menu2" tabIndex="0">
            Menu2
          </MenuItem>
        </MenuList>
      </nav>
    </MenuWrap>
  );
};

export default Menu;

const MenuWrap = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  z-index: 101;
  transition: transform 0.3s ease;
  background-color: #fff;
  margin: 0;
  top: 0;
  right: 0;
  box-shadow: ${(props) =>
    props.show ? "-5px 5px 10px rgba(0, 0, 0, 0.2)" : "0"};
`;

const MenuTitle = styled.h2`
  height: 80px;
  line-height: 80px;
  padding: 30px 20px;
  font-size: 35px;
  font-weight: bold;
  text-shadow: 2px 2px 2px grey;
`;

const MenuList = styled.ul``;

const MenuItem = styled.li`
  height: 50px;
  line-height: 50px;
  padding: 20px 30px;
  vertical-align: middle;
  border: 2px solid #efefef;
  border-left: 0;
  border-right: 0;

  & + & {
    border-top: 0;
  }

  &:active {
    font-weight: bold;
    color: green;
  }
`;
