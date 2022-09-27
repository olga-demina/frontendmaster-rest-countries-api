import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";

const CountriesList = ({ countries }) => {
  const countriesComponents = countries.map((country, i) => {
    return (
      <Link key={i} to={`country/${country.name.common}`}>
        <CountryCard
          commonName={country.name.common}
          population={country.population}
          region={country.region}
          capital={country.capital}
          flag={country.flags.png}
        />
      </Link>
    );
  });
  return <div>{countriesComponents}</div>;
};

export default CountriesList;
