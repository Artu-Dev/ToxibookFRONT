import {FaArrowRight, FaLock, FaUser} from "react-icons/fa";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "./Signin.css"
import InputComponent from "../../components/Layout/InputComponent/InputComponent";

import toxibookLogo1 from "../../img/toxibookLogo.webp"
import backgroundImg from "../../img/bg1.webp"
import { Button } from "../../components/Layout/Button/Button";

import { useUserContext } from "../../contexts/AuthUser";
import Message from "../../components/Layout/Message/Message";

const Signin = () => {
  const redirect = useNavigate();

  const [signinState, setSigninState] = useState({
    password: null,
    confirmPassword: null,
    email: null,
    confirmEmail: null,
    tag: null,
    username: null
  })
  
  const [message, setMessage] = useState(false);
  const [isLaoding, setIsLoading] = useState(false);
  
  const {createUser, signed} = useUserContext();

  async function handleSignUp() {
    await createUser(signinState.username, signinState.email, signinState.password, signinState.tag);  
  } 

  function removeMessage() {
    setTimeout(() => {
      setMessage(false);
    }, 5000);
  }

  function isValidDatas() {
    if(signinState.password.indexOf(" ") !== -1) {
      alert("A senha não pode conter espaços em branco!");
      throw new Error("A senha não pode conter espaços em branco!");
    }
    if(signinState.tag.indexOf(" ") !== -1) {
      alert("A tag não pode conter espaços em branco!");
      throw new Error("A tag não pode conter espaços em branco!");
    }
    if(signinState.email.indexOf(" ") !== -1) {
      alert("O email não pode conter espaços em branco!");
      throw new Error("O email não pode conter espaços em branco!");
    }


    if(signinState.password !== signinState.confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
      throw new Error("As senhas não coincidem. Por favor, verifique e tente novamente.");
    }
    if(signinState.email !== signinState.confirmEmail) {
      alert("Os email's não coincidem. Por favor, verifique e tente novamente.");
      throw new Error("Os email's não coincidem. Por favor, verifique e tente novamente.") 
    }
    if(!signinState.tag) {
      alert("Por favor, insira uma tag antes de prosseguir.");
      throw new Error("Por favor, insira uma tag antes de prosseguir.") 
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      isValidDatas();
      handleSignUp();
      
      setIsLoading(false);
      redirect("/login");
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

  const updateSigninState = {
    email: (newEmail) => {
      setSigninState(prevState => ({
        ...prevState,
        email: newEmail
      }));
    },
    
    confirmEmail: (newConfirmEmail) => {
      setSigninState(prevState => ({
        ...prevState,
        confirmEmail: newConfirmEmail
      }));
    },
  
    password: (newPassword) => {
      setSigninState(prevState => ({
        ...prevState,
        password: newPassword
      }));
    },
  
    confirmPassword: (newConfirmPassword) => {
      setSigninState(prevState => ({
        ...prevState,
        confirmPassword: newConfirmPassword
      }));
    },
  
    tag: (newTag) => {
      setSigninState(prevState => ({
        ...prevState,
        tag: newTag
      }));
    },
  
    username: (newUsername) => {
      setSigninState(prevState => ({
        ...prevState,
        username: newUsername
      }));
    }
  };
  
  if(signed) return <Navigate to={"/"}/>
  return (
    <main className="signin-container">
      {
        message && <Message text={message} hideMessage={() => setMessage(null)}></Message>
      }
      <section>
        <div className="signin-secondary">
          <img className="background-secondary" src={backgroundImg} alt="logo Toxibook" />
          <img className="logo" src={toxibookLogo1} alt="logo toxibook" />
        </div>
        <div className="signin-primary">
          <h1>CRIAR CONTA</h1>
          <form onSubmit={handleSubmit}>
            <fieldset className="loginDatas">
              <InputComponent 
                onInput={(e) => updateSigninState.email(e.target.value)}
                type="email"
                text="Email"
                name="email"
                icon={<FaUser/>}
                required={true}
                />
              <InputComponent 
                onInput={(e) => updateSigninState.confirmEmail(e.target.value)}
                type="email"
                name="confirmEmail"
                text="Confirmar Email"
                icon={<FaUser/>}
                required={true}
                />
              <InputComponent 
                onInput={(e) => updateSigninState.password(e.target.value)}
                type="password"
                text="Senha"
                name="password"
                icon={<FaLock/>}
                required={true}
              />
              <InputComponent 
                onInput={(e) => updateSigninState.confirmPassword(e.target.value)}
                type="password"
                text="Confirmar Senha"
                name="confirmPassword"
                icon={<FaLock/>}
                required={true}
              />
            </fieldset>

            <InputComponent 
              onInput={(e) => updateSigninState.tag(e.target.value)}
              type="text"
              text="Tag"
              name="tag"
              icon={<FaUser/>}
              required={true}
              />
            <InputComponent 
              onInput={(e) => updateSigninState.username(e.target.value)}
              type="text"
              text="username"
              name="user"
              icon={<FaUser/>}
              required={true}
              />
            <Button
              text="Criar"
              type="enterBtn"
              icon={<FaArrowRight/>}
              loading={isLaoding}
            />
            <a className="cadastro" onClick={() => redirect("/login")}>Ja tenho uma conta?</a>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Signin