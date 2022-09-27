import { useCallback, useEffect, useRef, useState } from "react";
import CountriesList from "../components/CountriesList";
import SearchField from "../components/SearchField";
import ErrorBoundry from "../components/ErrorBoundry";
import RegionSelect from "../components/RegionSelect";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Function to get all countries from api
  const fetchAllCountries = useCallback(
    async function () {
      console.log("fetching all countries");
      try {
        const fetchedCountries = await (
          await fetch("https://restcountries.com/v3.1/all")
        ).json();
        setCountries(fetchedCountries);
      } catch (error) {
        console.log(error);
      }
    },
    [setCountries]
  );

  // Function to get countries by region
  const fetchCountriesByRegion = useCallback(
    async function () {
      try {
        const fetchedCountries = await (
          await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        ).json();
        setCountries(fetchedCountries);
      } catch (error) {
        console.log(error);
      }
    },
    [selectedRegion]
  );

  const countriesFetched = useRef(false);
  useEffect(() => {
    if(!countriesFetched.current) {
      countriesFetched.current = true;
      fetchAllCountries();
    }
  }, [fetchAllCountries, countriesFetched]);

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
    setSelectedRegion(event.target.value);
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

export default Home;
