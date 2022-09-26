import { useCallback, useEffect, useRef, useState } from "react";
import CountriesList from "../components/CountriesList";
import SearchField from "../components/SearchField";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";
import RegionSelect from "../components/RegionSelect";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Function to get all countries from api
  const fetchAllCountries = async function () {
    try {
      const fetchedCountries = await (
        await fetch("https://restcountries.com/v3.1/all")
      ).json();
      setCountries(fetchedCountries);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get countries by region
  const fetchCountriesByRegion = useCallback(async function () {
    try {
      const fetchedCountries = await (
        await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
      ).json();
      setCountries(fetchedCountries);
    } catch (error) {
      console.log(error);
    }
  }, [selectedRegion]);

  // Effect that loads all countries when app starts
  // We use useRef to ensure that the callback is called once
  const isFetchedRef = useRef(false);
  useEffect(() => {
    if (!isFetchedRef.current) {
      isFetchedRef.current = true;
      fetchAllCountries();
    }
  }, [fetchAllCountries]);

  // Function that updates searchField State
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  // FilteredCountries based on csearchField
  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(searchField.toLocaleLowerCase());
  });

  // Function that fetches countries on region change or all if "all" is selected
  const onSelectChange = (event) => {
    const region = event.target.value;
    if (region === selectedRegion) return;
    setSelectedRegion(region);
  };

  useEffect(() => {
    if (!selectedRegion) {
      fetchAllCountries();
    } else {
      console.log("calling by region");
      fetchCountriesByRegion();
    }
  }, [selectedRegion, fetchAllCountries, fetchCountriesByRegion]);

  return !countries.length ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <SearchField searchChange={onSearchChange} />
      <RegionSelect selectChange={onSelectChange} />
      <ErrorBoundry>
        <CountriesList countries={filteredCountries}></CountriesList>
      </ErrorBoundry>
    </div>
  );
};

export default App;
