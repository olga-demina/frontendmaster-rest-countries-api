import { useCallback, useEffect, useRef } from "react";
import CountriesList from "../components/CountriesList";
import SearchField from "../components/SearchField";
import ErrorBoundry from "../components/ErrorBoundry";
import RegionSelect from "../components/RegionSelect";
import GlobalState from "../contexts/GlobalState";
import { useContext } from "react";
import useDidMount from "../hooks/useDidMount";

const Home = () => {
  const [state, setState] = useContext(GlobalState);
  const countriesLoaded = useRef(false);
  const didMount = useDidMount();

  // Function to get all countries from api on page load
  useEffect(() => {
    if (!countriesLoaded.current && state.countries.length === 0) {
      countriesLoaded.current = true;
      fetchAllCountries();
    }
  }, []);

  // Effect to handle region select change
  useEffect(() => {
    if (didMount && state.region !== null) {
      if (state.region === "") {
        console.log("fetching countries");
        fetchAllCountries();
      } else {
        fetchCountriesByRegion();
      }
    }
  }, [state.region]);

  // FilteredCountries based on searchField
  useEffect(() => {
    console.log("Filtering");
    if (state.countries) {
      const filteredCountries = state.countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(state.needle.toLocaleLowerCase());
      });
      setState({ ...state, filteredCountries: filteredCountries });
    }
  }, [state.needle, state.countries]);

  // Function that updates searchField State
  const onSearchChange = (event) => {
    setState({ ...state, needle: event.target.value });
  };

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

  const content =
    !state.countries || !state.countries.length ? (
      <h2>Loading...</h2>
    ) : (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 pt-6 gap-6">
          <SearchField searchChange={onSearchChange} needle={state.needle} />
          <RegionSelect
            selectChange={onSelectChange}
            selectedRegion={state.region}
          />
        </div>
        <ErrorBoundry>
          <CountriesList countries={state.filteredCountries}></CountriesList>
        </ErrorBoundry>
      </div>
    );

  return (
    <main className="bg-slate-50">
      <div className="container mx-auto px-4">{content}</div>;
    </main>
  );
};

export default Home;
