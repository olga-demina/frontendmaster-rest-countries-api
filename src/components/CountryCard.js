const CountryCard = ({ commonName, population, region, capital, flag }) => {
    return (
        <div>
            <img src={flag} alt="{`${commonName} flag`}"/>
            <h3>{commonName}</h3>
            <ul>
                <li>
                    <strong>Population: </strong>
                    {population}
                </li>
                <li>
                    <strong>Region: </strong>
                    {region}
                </li>
                <li>
                    <strong>Capital: </strong>
                    {capital}
                </li>
            </ul>
        </div>
    );
}

export default CountryCard;