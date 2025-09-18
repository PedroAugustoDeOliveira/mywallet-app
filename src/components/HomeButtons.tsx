import styled from "styled-components";

type buttonHome = {
  text: string;
  onClick?: () => void;
};

export default function HomeButtons({ text, onClick }: buttonHome) {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
}

const StyledButton = styled.button`
  width: 155px;
  height: 114px;
  background-color: rgb(163, 40, 214);
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  font-family: "Raleway", sans-serif;
`;
