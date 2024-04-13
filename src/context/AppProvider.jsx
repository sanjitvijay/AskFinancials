import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

function AppProvider({children}) {
    const [files, setFiles] = useState([]);

    const onFileChange = e => {
        setFiles([...e.target.files])
    }

    return (
        <AppContext.Provider value={{files, onFileChange}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;