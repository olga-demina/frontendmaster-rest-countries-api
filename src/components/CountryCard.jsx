const CountryCard = ({ commonName, population, region, capital, flag }) => {
  return (
    <div className="shadow-lg rounded-md overflow-hidden">
      <img src={flag} alt={`${commonName} flag`} />
      <div className="px-4 pt-4 pb-16">
        <h3 className="text-xl font-bold mb-4">{commonName}</h3>
        <ul>
          <li>
            <strong className="font-semibold">Population: </strong>
            {population}
          </li>
          <li>
            <strong className="font-semibold">Region: </strong>
            {region}
          </li>
          <li>
            <strong className="font-semibold">Capital: </strong>
            {capital}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CountryCard;
