import LoadingImg from "images/Fading circles.gif";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrap>
      <img src={LoadingImg} alt="Loading..." />
    </LoadingWrap>
  );
};

export default Loading;

const LoadingWrap = styled.div`
  position: fixed;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  opacity: 0.7;
  background-color: #fff;
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
