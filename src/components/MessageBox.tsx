import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

type MessageBoxProps = {
  message: string;
  onClose: () => void;
};

export default function MessageBox({ message, onClose }: MessageBoxProps) {
  return (
    <Overlay>
      <Box>
        <p>{message}</p>
        <Link to="/">
          <button onClick={onClose}>Ir para o login</button>
        </Link>
      </Box>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  p {
    margin-bottom: 20px;
    font-weight: 700;
  }
  button {
    padding: 10px 20px;
    background-color: rgb(163, 40, 214);
    color: #fff;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    cursor: pointer;
  }
`;
