import { Link, useParams } from "react-router-dom";

const Country = ({ match, location }) => {
  const { countryName } = useParams();
  return (
    <main>
      <Link to="/">Back</Link>
      <h1>Dettagli del paese {countryName}</h1>
    </main>
  );
};

export default Country;
