import { useCallback, useEffect, useState } from "react";
import CountriesList from "../components/CountriesList";
import SearchField from "../components/SearchField";
import ErrorBoundry from "../components/ErrorBoundry";
import RegionSelect from "../components/RegionSelect";
import GlobalState from "../contexts/GlobalState";
import { useContext } from "react";

const Home = () => {
  const [state, setState] = useContext(GlobalState);

  // Function to get all countries from api
  useEffect(() => {
    if (state.countries.length === 0) {
      fetchAllCountries();
    }
  }, []);

  // Function that updates searchField State
  const onSearchChange = (event) => {
    setState({ ...state, needle: event.target.value });
  };

  // FilteredCountries based on searchField
  useEffect(() => {
    if (state.countries) {
      const filteredCountries = state.countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(state.needle.toLocaleLowerCase());
      });
      setState({ ...state, filteredCountries: filteredCountries });
    }
  }, [state.needle, state.countries]);

  const fetchAllCountries = useCallback(
    async function fetchAllCountries() {
      console.log("fetching all countries");
      try {
        const fetchedCountries = await (
          await fetch("https://restcountries.com/v3.1/all")
        ).json();
        setState({ ...state, countries: fetchedCountries });
      } catch (error) {
        console.error(error);
      }
    },
    [state, setState]
  );

  // Function to get countries by region
  const fetchCountriesByRegion = useCallback(
    async function () {
      try {
        const fetchedCountries = await (
          await fetch(`https://restcountries.com/v3.1/region/${state.region}`)
        ).json();
        setState({ ...state, countries: fetchedCountries });
      } catch (error) {
        console.error(error);
      }
    },
    [state.region]
  );

  // Function that fetches countries on region change or all if "all" is selected
  const onSelectChange = (event) => {
    setState({ ...state, region: event.target.value });
  };

  useEffect(() => {
    if (!state.region) {
      fetchAllCountries();
    } else {
      fetchCountriesByRegion();
    }
  }, [state.region]);

  return !state.countries || !state.countries.length ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <SearchField searchChange={onSearchChange} needle={state.needle} />
      <RegionSelect
        selectChange={onSelectChange}
        selectedRegion={state.region}
      />
      <ErrorBoundry>
        <CountriesList countries={state.filteredCountries}></CountriesList>
      </ErrorBoundry>
    </div>
  );
};

export default Home;
