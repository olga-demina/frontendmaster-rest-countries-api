import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import BorderCountriesList from "../components/BorderCountriesList";
import ErrorBoundry from "../components/ErrorBoundry";

const Country = ({ match, location }) => {
  const [country, setCountry] = useState({});
  const { countryName } = useParams();

  const fetchCountryDetails = useCallback(
    async function () {
      console.log("Fetching country details");
      try {
        const countries = await (
          await fetch(
            `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
          )
        ).json();
        setCountry(countries[0]);
      } catch (error) {
        console.error(error);
      }
    },
    [setCountry, countryName]
  );

  useEffect(() => {
    fetchCountryDetails();
  }, [fetchCountryDetails]);

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = country;

  return Object.keys(country).length === 0 ? (
    <main>
      <h2>Loading...</h2>
    </main>
  ) : (
    <main>
      <Link to="/">Back</Link>
      <ErrorBoundry>
        <section>
          <img src={flags.png} alt="" />
          <h1>{name.common}</h1>

          <ul>
            <li>
              <strong>Native Name: </strong>
              <span>
                {Object.values(name.nativeName).map(
                  (nativeNameObj) => nativeNameObj.common + " "
                )}
              </span>
            </li>
            <li>
              <strong>Population: </strong>
              <span>{population}</span>
            </li>
            <li>
              <strong>Region: </strong>
              <span>{region}</span>
            </li>
            <li>
              <strong>Sub Region: </strong>
              <span>{subregion}</span>
            </li>
            <li>
              <strong>Capital: </strong>
              <span>{capital[0]}</span>
            </li>
          </ul>

          <ul>
            <li>
              <strong>Top level domain: </strong>
              <span>{tld}</span>
            </li>
            <li>
              <strong>Currencies: </strong>
              <span>
                {Object.values(currencies).map(
                  (currencyObj) => currencyObj.name + " "
                )}
              </span>
            </li>
            <li>
              <strong>Languages: </strong>
              <span>{Object.values(languages).join(", ")}</span>
            </li>
          </ul>
        </section>
        <BorderCountriesList borderCountriesCodes={borders} />
      </ErrorBoundry>
    </main>
  );
};

export default Country;
