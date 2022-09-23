import { useCallback, useEffect, useRef, useState } from "react";
import CountriesList from "../components/CountriesList";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);

  // Fnction to get countries from api
  const fetchCountries = useCallback(async function () {
    try {
      const fetchedCountries = await (
        await fetch("https://restcountries.com/v3.1/all")
      ).json();
      setCountries(fetchedCountries);
    } catch (error) {
      console.log(error);
    }
  }, [setCountries]);

  // Effect that loads all countries when app starts
  // We use useRef to ensure that the callback is called once
  const isFetchedRef = useRef(false);
  useEffect(() => {
    if (!isFetchedRef.current) {
      isFetchedRef.current = true;
      fetchCountries();
    }
  }, [fetchCountries]);

  return !countries.length ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <ErrorBoundry>
        <CountriesList countries={countries}></CountriesList>
      </ErrorBoundry>
    </div>
  );
};

export default App;
