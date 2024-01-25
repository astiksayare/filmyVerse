
import Header from "./component/Header/Header";
import { Outlet } from "react-router-dom";
import { ContextProvider } from "./context";
import { useState } from "react";

const App = () => {

  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <ContextProvider value={{login, setLogin, userName, setUserName}}>
      <Header />
      <Outlet />
    </ContextProvider>
  )
}

export default App;