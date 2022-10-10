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
          <Link
            to={`/${nameObj.name.common}`}
            className="text-center shadow-md py-2 bg-white w-full inline-block dark:bg-slate-600"
          >
            {nameObj.name.common}
          </Link>
        </li>
      );
    });
  }

  return borderCountriesList.length ? (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
      <h2 className="mb-2 lg:mb-0 lg:mr-4 text-lg font-semibold">
        Border Countries:{" "}
      </h2>
      <ul className="grid grid-cols-3 gap-4 lg:col-span-2">
        {borderCountriesList}
      </ul>
    </div>
  ) : (
    <div>
      <h2>Border countries</h2>
      <p>No info</p>
    </div>
  );
};

export default BorderCountriesList;
