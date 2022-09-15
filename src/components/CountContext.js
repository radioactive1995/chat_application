import React, { createContext, useContext, useState } from "react"

const countContext = createContext();

export const useCountContext = () => useContext(countContext) 

export function CountTheme({children}) {

    const [count, setCount] = useState(0);
    const onClickHandler = () => setCount(prevValue => prevValue + 1)

    return(
        <countContext.Provider value={{count, onClickHandler}}>
            {children}
        </countContext.Provider>
    )
}