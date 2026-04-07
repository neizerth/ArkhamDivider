import styled from "@emotion/styled";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #eeeef1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`;

export const Image = styled.img`
  object-fit: contain;
  max-width: 500px;
  width: 100%;
  height: 100%;
`;
