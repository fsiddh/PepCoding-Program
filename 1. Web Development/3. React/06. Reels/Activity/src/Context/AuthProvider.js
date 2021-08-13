import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

// Create context
export const AuthContext = React.createContext(); // AuthContext = {} <- Empty Object

function AuthProvider({ children }) {
	// Our States -> "currentUser" - track of logged user, "loading" - load whenever fetching data.
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	// Creates new user in Authentication
	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	// Log In, provided email and password
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	// ------ADD COMMENT TO IT--------
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{loading == false ? children : <CircularProgress />}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
