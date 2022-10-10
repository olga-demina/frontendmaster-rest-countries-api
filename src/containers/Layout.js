import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import GlobalState from "../contexts/GlobalState";

const Layout = () => {
  const [state, setState] = useState({
    countries: [],
    filteredCountries: [],
    needle: "",
    region: null,
  });

  return (
    <GlobalState.Provider value={[state, setState]}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-700 dark:text-white">
        <MainHeader></MainHeader>
        <Outlet></Outlet>
      </div>
    </GlobalState.Provider>
  );
};

export default Layout;
