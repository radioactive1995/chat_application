import React, {useState, createContext, useContext, useEffect } from 'react'
import {auth} from '../Firebase'

const Authcontext = createContext();
export const useAuth = () => useContext(Authcontext);

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const signup = (email, password) =>  auth.createUserWithEmailAndPassword(email, password)
    const login = (email, password) => auth.signInWithEmailAndPassword(email, password)
    const logout = () => auth.signOut();

    


    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <Authcontext.Provider value={value}>
            {!loading && children}
        </Authcontext.Provider>
    )
}