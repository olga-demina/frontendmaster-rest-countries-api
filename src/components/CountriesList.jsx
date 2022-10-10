import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";

const CountriesList = ({ countries }) => {
  const countriesComponents = countries.map((country, i) => {
    return (
      <div key={country.name.common} className="mx-auto">
        <Link to={`/${country.name.common.split(" ").join("_")}`}>
          <CountryCard
            commonName={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital}
            flag={country.flags.png}
          />
        </Link>
      </div>
    );
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
      {countriesComponents}
    </div>
  );
};

export default CountriesList;
