import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const BorderCountriesList = ({ borderCountriesCodes }) => {
  const [countriesNames, setCountriesNames] = useState([]);

  const fetchCountriesNames = useCallback(
    async function () {
      try {
        const requests = borderCountriesCodes.map((code) => {
          return fetch(
            `https://restcountries.com/v3.1/alpha/${code}?fields=name`
          ).then((res) => res.json());
        });
        const allData = Promise.all(requests);
        allData.then((res) => setCountriesNames(res));
      } catch (error) {
        console.error(error);
      }
    },
    [setCountriesNames, borderCountriesCodes]
  );

  useEffect(() => {
    if (borderCountriesCodes && borderCountriesCodes.length) {
      fetchCountriesNames();
    }
  }, [fetchCountriesNames, borderCountriesCodes]);

  let borderCountriesList = [];
  if (countriesNames.length) {
    borderCountriesList = countriesNames.map((nameObj, index) => {
      return (
        <li key={index}>
          <Link to={`/country/${nameObj.name.common}`}>
            {nameObj.name.common}
          </Link>
        </li>
      );
    });
  }

  return borderCountriesList.length ? (
    <section>
      <h1>Border Countries</h1>
      <ul>{borderCountriesList}</ul>
    </section>
  ) : (
    <section>
      <h1>Border countries</h1>
      <p>No info</p>
    </section>
  );
};

export default BorderCountriesList;
