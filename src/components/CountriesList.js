import CountryCard from "./CountryCard";

const CountriesList = ({ countries }) => {
  const countriesComponents = countries.map((country, i) => {
    return (
        <CountryCard
            key={i}
            commonName={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital}
            flag={country.flags.png}

        />
    );
  });
  return <div>{ countriesComponents }</div>
};

export default CountriesList;
