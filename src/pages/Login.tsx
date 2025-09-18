import React from "react";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import ButtonField from "../components/ButtonField";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}
export default function Login() {
  const URL = "https://mywallet-api-nrrz.onrender.com/login";
  const navigate = useNavigate();

  const [loginUser, setLoginUser] = React.useState<User>({
    email: "",
    password: "",
  });

  async function handleLogin() {
    try {
      const res = await axios.post(URL, loginUser);

      localStorage.setItem("token", res.data.token);

      navigate("/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("API error", err.response?.data);
        alert(`Erro: ${err.response?.data}`);
      } else {
        console.error("Unknown error", err);
        alert("Erro desconhecido, tente novamente.");
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { placeholder, value } = e.target;
    setLoginUser((prev) => ({
      ...prev,
      [placeholder === "E-mail" ? "email" : "password"]: value,
    }));
  }
  return (
    <section className="container">
      <Main>
        <div className="logo">
          <Logo />
        </div>

        <div className="inputs">
          <InputField
            type="email"
            placeholder="E-mail"
            value={loginUser.email}
            onChange={handleChange}
          ></InputField>
          <InputField
            type="password"
            placeholder="Password"
            value={loginUser.password}
            onChange={handleChange}
          ></InputField>
        </div>

        <div className="button">
          <ButtonField text="Login" onClick={handleLogin} />
        </div>

        <Link to="/register">
          <div className="register">
            <p>First time? register</p>
          </div>
        </Link>
      </Main>
    </section>
  );
}

const Main = styled.div`
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

  .register {
    font-size: 15px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    color: #ffffff;
  }
`;
