import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import GlobalState from "../contexts/GlobalState";

const Layout = () => {
  const [state, setState] = useState({
    countries: [],
    filteredCountries: [],
    needle: "",
    region: ""
  });

  return (
    <GlobalState.Provider value={[state, setState]}>
      <MainHeader></MainHeader>
      <Outlet></Outlet>
    </GlobalState.Provider>
  );
};

export default Layout;
