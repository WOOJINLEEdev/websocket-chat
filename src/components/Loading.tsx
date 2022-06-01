import styled from "styled-components";

const Loading = () => {
  return (
    <DivContainer>
      <img src="assets/images/fading-circles.gif" alt="Loading..." />
    </DivContainer>
  );
};

export default Loading;

const DivContainer = styled.div`
  position: fixed;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  opacity: 0.7;
  background-color: #ffffff;
  text-align: center;
  z-index: 99;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
`;
