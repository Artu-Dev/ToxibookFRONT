import {FaArrowRight, FaLock, FaUser} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

import "./Login.css"
import InputComponent from "../../components/Layout/InputComponent/InputComponent";

import toxibookLogo1 from "../../img/toxibookLogo2.webp"
import backgroundImg from "../../img/bg2.webp"
import { Button } from "../../components/Layout/Button/Button";

import { useUserContext } from "../../contexts/AuthUser";
import Message from "../../components/Layout/Message/Message";

const Login = () => {
  const [message, setMessage] = useState(false);
  const [isLaoding, setIsLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  
  const {signInUser, createUser, signed} = useUserContext();

  async function handleSignUp() {
    await createUser(email, password)
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
      await signInUser(email, password);
    } catch (error) {
        console.log(error);
        setIsLoading(false);
        
        if(error.response) setMessage(String(error.response.data.message));

        if(error.message === "Network Error"){
          setMessage("Erro de conexão! verifique sua conexão com a internet!!");
          return
        }
        
        removeMessage();
    }
  }
  
  if(signed) return <Navigate to={"/"}/>
  return (
    <main className="login-container">
      {
        message && <Message text={message} hideMessage={() => setMessage(null)}></Message>
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
            <a className="cadastro" onClick={() => redirect("/signin")}>Criar uma conta</a>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login