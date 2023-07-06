import {FaArrowRight, FaLock, FaUser} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css"
import InputComponent from "../../components/Layout/InputComponent/InputComponent";

import toxibookLogo1 from "../../img/toxibookLogo2.webp"
import backgroundImg from "../../img/pexels-codioful-(formerly-gradienta)-6984989.webp"
import { Button } from "../../components/Layout/Button/Button";
import { isLoggedInService, loginAuthService } from "../../services/user.services";

const Login = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const redirect = useNavigate();

  const [message, setMessage] = useState(false);
  const [isLaoding, setIsLoading] = useState(false);

  function removeMessage() {
    setTimeout(() => {
      setMessage(false);
    }, 5000);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    setIsLoading(true);

    try {
      const response = await loginAuthService(email, password);
      console.log(response);

      localStorage.setItem("AuthToken", response.token);
      localStorage.setItem("User", JSON.stringify(response.userData));
      redirect("/");
    } catch (error) {
        console.log(error);
        setIsLoading(false);
        
        if(error.response) setMessage(String(error.response.data.message));

        if(error.message === "Network Error"){
          setMessage("Erro de conexão!");
        }
        
        removeMessage();
    }
  }

  useEffect(() => {
    async function checkLogin() {      
      try {
        const token = localStorage.getItem("AuthToken");
        const user = JSON.parse(localStorage.getItem("User"));
        if(!user || !token) return

        await isLoggedInService(token);
        redirect("/");
      } catch (error) {
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("User");
        setMessage(error.message);
        removeMessage();
      }
    }
    checkLogin();
  }, [])

  return (
    <main className="login-container">
      {
        message && <p>{message}</p>
      }
      <section>
        <div className="login-secondary">
          <img className="background-secondary" src={backgroundImg} alt="logo Toxibook" />
          <img className="logo" src={toxibookLogo1} alt="logo toxibook" />
        </div>
        <div className="login-primary">
          <h1>Entrar</h1>
          <form onSubmit={handleSubmit}>
            <InputComponent 
              type="email"
              text="Email"
              ref={emailInput}
              icon={<FaUser/>}
              required={true}
            />
            <InputComponent 
              type="password"
              text="Senha"
              ref={passwordInput}
              icon={<FaLock/>}
              required={true}
            />
            <Button
              text="Entrar"
              type="enterBtn"
              icon={<FaArrowRight/>}
              loading={isLaoding}
            />
            <a className="cadastro">Criar uma conta</a>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login