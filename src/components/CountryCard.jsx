import { Link } from 'react-router-dom';

function CountryCard({ name, code, alpha3Code, countries }) {
  const countryCode = code.toLowerCase();

  const flagUrl = `https://flagpedia.net/data/flags/icon/72x54/${countryCode}.png`;

  return (
    <Link
      className="list-group-item list-group-item-action"
      to={`/${alpha3Code}`}
      state={{ countries: countries }}
    >
      <div>
        <img src={flagUrl} alt={name} width="30vw" />
      </div>
      {name}
    </Link>
  );
}

export default CountryCard;
