import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="fixed top-0 right-0 left-0 bg-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-md md:text-2xl font-bold">Where in the world?</h1>
        <div>
          <span>Dark Mode</span>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
 