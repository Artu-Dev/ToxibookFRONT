import {FaArrowRight, FaLock, FaUser} from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "./Login.css"
import InputComponent from "../../components/Layout/InputComponent/InputComponent";

import toxibookLogo1 from "../../img/toxibookLogo2.webp"
import backgroundImg from "../../img/pexels-codioful-(formerly-gradienta)-6984989.webp"
import { Button } from "../../components/Layout/Button/Button";
import { isLoggedInService, loginAuthService } from "../../services/user.services";

// import { createUser,  } from "../../functions/LoginFunctions";
import { AuthUserContext } from "../../contexts/AuthUser";

const Login = () => {
  const redirect = useNavigate();

  const [message, setMessage] = useState(false);
  const [isLaoding, setIsLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  
  
  const {signInUser, createUser, signed} = useContext(AuthUserContext);

  async function handleSignUp() {
    await createUser(email, password)
  } 
  async function handleLogIn() {
    await signInUser(email, password)
  } 

  function removeMessage() {
    setTimeout(() => {
      setMessage(false);
    }, 5000);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const responseToken = await loginAuthService(email, password);
      localStorage.setItem("AuthToken", responseToken);
    } catch (error) {
        console.log(error);
        localStorage.clear();
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

  if(signed) return <Navigate to={"/"}/>
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
              onInput={(e) => setEmail(e.target.value)}
              type="email"
              text="Email"
              icon={<FaUser/>}
              required={true}
              />
            <InputComponent 
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              text="Senha"
              icon={<FaLock/>}
              required={true}
            />
            <Button
              text="Entrar"
              type="enterBtn"
              icon={<FaArrowRight/>}
              loading={isLaoding}
            />
            <a className="cadastro" onClick={handleSignUp}>Criar uma conta</a>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login