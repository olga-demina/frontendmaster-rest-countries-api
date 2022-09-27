import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";

const Layout = () => {
  return (
    <>
      <MainHeader></MainHeader>
      <Outlet></Outlet>
    </>
  )
  
};

export default Layout;
