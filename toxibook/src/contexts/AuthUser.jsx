import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedInService, loginAuthService } from "../services/user.services";

export const AuthUserContext = createContext({});
export const UserContext = createContext({})

export const useUserContext = () => {
	return useContext(AuthUserContext)
}

export const AuthUserProvider = ({children}) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
    async function checkLogin() {      
      try {
				const token = localStorage.getItem("AuthToken");
        const user = JSON.parse(localStorage.getItem("User"));
        if(!user || !token) return
        await isLoggedInService(token);
				setUser(user);
      } catch (error) {;
				console.log(error);
				localStorage.clear()
      }
    }
    checkLogin();
  }, [])
	

	async function createUser(username, email, password, bio, tag, profileImg, bannerImg) {
		try {
			const {token, user} = await loginAuthService(email, password);
			localStorage.setItem("token", token);
			localStorage.setItem("user", user);
		} catch (error) {
			console.log(error);
			localStorage.clear();
		}
	}
	
	async function signInUser(email, password) {
		const {token, user} = await loginAuthService(email, password);
		localStorage.setItem("AuthToken", token);
		localStorage.setItem("User", JSON.stringify(user));
		setUser(user);
	}

	function logOut(){
		localStorage.clear();
		setUser(null);
		return <Navigate to={"/"}/>
	}

	return (
		<AuthUserContext.Provider value={{signInUser, createUser, logOut, signed: !!user}}>
			{children}
		</AuthUserContext.Provider>
	)
}