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
        if(!token) {
					setUser(null);
					return
				}
        const userData = await isLoggedInService(token);
				localStorage.setItem("User", JSON.stringify(userData));
				setUser(userData);
      } catch (error) {
				console.log(error)
				if(error.response.status === 401) {
					localStorage.clear()
				}
      }
    }
    checkLogin();
  }, [])
	

	async function createUser(username, email, password, bio, tag, profileImg, bannerImg) {
		try {
			const {token, user} = await loginAuthService(email, password);
			localStorage.setItem("token", token);
			localStorage.setItem("User", user);
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