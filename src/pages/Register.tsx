import styled from "styled-components";
import axios from "axios";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import ButtonField from "../components/ButtonField";
import React from "react";
import MessageBox from "./../components/MessageBox";
import { Link } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const URL = "https://mywallet-api-nrrz.onrender.com/register";

  const [addUser, setAddUser] = React.useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [messageVisible, setMessageVisible] = React.useState(false);
  const [messageText, setMessageText] = React.useState("");

  async function handleRegister() {
    try {
      const res = await axios.post(URL, addUser);
      console.log("Resposta:", res.data);

      setMessageText("User registered successfully!");
      setMessageVisible(true);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("Erro da API", err.response?.data);
        setMessageText(`Erro: ${err.response?.data}`);
        setMessageVisible(true);
      } else {
        console.error("Erro desconhecido", err);
        setMessageText("Erro desconhecido, tente novamente.");
        setMessageVisible(true);
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { placeholder, value } = e.target;
    setAddUser((prev) => ({
      ...prev,
      [placeholder === "Name"
        ? "name"
        : placeholder === "E-mail"
        ? "email"
        : placeholder === "Password"
        ? "password"
        : "confirmPassword"]: value,
    }));
  }

  return (
    <section>
      <Div>
        <div className="logo">
          <Logo />
        </div>

        <div className="inputs">
          <InputField
            type="name"
            placeholder="Name"
            value={addUser.name}
            onChange={handleChange}
          ></InputField>
          <InputField
            type="email"
            placeholder="E-mail"
            value={addUser.email}
            onChange={handleChange}
          ></InputField>
          <InputField
            type="password"
            placeholder="Password"
            value={addUser.password}
            onChange={handleChange}
          ></InputField>
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={addUser.confirmPassword}
            onChange={handleChange}
          ></InputField>
        </div>
        <p className="password">
          The password must have 8 characters, one number and one special
          character
        </p>

        <div className="button">
          <ButtonField text="Register" onClick={handleRegister} />
        </div>
        <Link to="/">
          <div className="login">
            <p>You alredy have an account? login now</p>
          </div>
        </Link>

        {messageVisible && (
          <MessageBox
            message={messageText}
            onClose={() => setMessageVisible(false)}
          />
        )}
      </Div>
    </section>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 100px;

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .login {
    font-size: 15px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    color: #ffffff;
  }

  .password {
    font-size: 10px;
    color: #ffffff;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
  }
`;
