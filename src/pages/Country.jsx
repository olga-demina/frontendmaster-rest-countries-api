import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import BorderCountriesList from "../components/BorderCountriesList";
import ErrorBoundry from "../components/ErrorBoundry";

const Country = () => {
  const [country, setCountry] = useState({});
  const { countryName } = useParams();

  useEffect(() => {
    fetchCountryDetails();
  }, [countryName, fetchCountryDetails]);

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

  const nativeNames = name ? Object.values(name.nativeName) : [];

  const content =
    Object.keys(country).length === 0 ? (
      <h2>Loading...</h2>
    ) : (
      <div className="min-h-screen">
        <Link to="/" className="py-1 px-6 shadow-md bg-white dark:bg-slate-600">
          <FontAwesomeIcon className="mr-3" icon={faArrowLeft}></FontAwesomeIcon>
          Back
        </Link>
        <ErrorBoundry>
          <section className="grid grid-cols-1 lg:grid-cols-2 mt-8">
            <div className="lg:pr-36">
              <img className="w-full" src={flags.png} alt="" />
            </div>
            <div className="mt-8">
              <h1 className="font-bold text-xl mb-4">{name.common}</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <ul className="mb-10">
                  <li className="mb-2">
                    <strong className="font-semibold">Native Name: </strong>
                    <span>
                      {nativeNames.map((nativeNameObj, index) => {
                        return (
                          nativeNameObj.common +
                          (index < nativeNames.length - 1 ? ", " : "")
                        );
                      })}
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong className="font-semibold">Population: </strong>
                    <span>{population}</span>
                  </li>
                  <li className="mb-2">
                    <strong className="font-semibold">Region: </strong>
                    <span>{region}</span>
                  </li>
                  <li className="mb-2">
                    <strong className="font-semibold">Sub Region: </strong>
                    <span>{subregion}</span>
                  </li>
                  <li className="mb-2">
                    <strong className="font-semibold">Capital: </strong>
                    <span>{capital[0]}</span>
                  </li>
                </ul>

                <ul className="mb-10">
                  <li className="mb-2">
                    <strong className="font-semibold">
                      Top level domain:{" "}
                    </strong>
                    <span>{tld}</span>
                  </li>
                  <li className="mb-2">
                    <strong className="font-semibold">Currencies: </strong>
                    <span>
                      {Object.values(currencies).map(
                        (currencyObj) => currencyObj.name + " "
                      )}
                    </span>
                  </li>
                  <li className="mb-2">
                    <strong className="font-semibold">Languages: </strong>
                    <span>{Object.values(languages).join(", ")}</span>
                  </li>
                </ul>
              </div>
              <div className="mb-16">
                <BorderCountriesList borderCountriesCodes={borders} />
              </div>
            </div>
          </section>
        </ErrorBoundry>
      </div>
    );

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">{content}</div>
    </main>
  );
};

export default Country;
