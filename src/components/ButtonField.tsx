import styled from "styled-components";

type buttonProps = {
  text: string;
  onClick?: () => void;
};

export default function ButtonField({ text, onClick }: buttonProps) {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
}

const StyledButton = styled.button`
  width: 336px;
  height: 46px;
  background-color: #a328d6;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 20px;
  font-family: "Raleway", sans-serif;
  font-weight: 700;

  cursor: pointer;
`;
