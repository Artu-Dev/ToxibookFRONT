import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthUserContext = createContext({});
export const UserContext = createContext({})


export const AuthUserProvider = ({children}) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loadStoreAuth = () => {
			const storageToken = localStorage.getItem("@AuthFirebase:token");
			const storageUser = localStorage.getItem("@AuthFirebase:user");
			if(storageToken && storageUser) {
				setUser(storageUser);
			}
		}
		loadStoreAuth();
	}, [])
	

	function createUser(email, password) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				const token = userCredential.user.accessToken;

				localStorage.setItem("@AuthFirebase:token", token);
				localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
				
				setUser(user);
				console.log(userCredential);
			})
			.catch((error) => {
				localStorage.clear();
				console.log(error);
			});
	}
	
	function signInUser(email, password) {
		signInWithEmailAndPassword(auth, email, password)  
			.then((userCredential) => {
				const user = userCredential.user;
				const token = userCredential.user.accessToken;
				
				localStorage.setItem("@AuthFirebase:token", token);
				localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

				setUser(user);
				console.log(userCredential);
			})
			.catch((error) => {
				localStorage.clear();
				console.log(error);
			});
	}

	function signOut(){
		localStorage.clear();
		setUser(null);
		return <Navigate to={"/"}/>
	}

	return (
		<AuthUserContext.Provider value={{signInUser, createUser, signOut, signed: !!user}}>
			{children}
		</AuthUserContext.Provider>
	)
}