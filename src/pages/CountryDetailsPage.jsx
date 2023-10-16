import { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import api from '../services/api';

function CountryDetails() {
  const [country, setCountry] = useState(null);
  const { countryCode } = useParams();
  const location = useLocation();
  const countries = location.state.countries;

  const findCountryNameByCode = (code) => {
    const currentCountry = countries.find(
      (country) => country.alpha3Code === code
    );

    return currentCountry.name.common;
  };

  const findCountryCodeForFlag = (code) => {
    const currentCountry = countries.find(
      (country) => country.alpha3Code === code
    );

    return currentCountry.alpha2Code.toLowerCase();
  };

  const fetchCountry = async () => {
    try {
      const data = await api.fetchCountryByCode(countryCode);
      setCountry(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [countryCode]);

  if (!country || !countries) {
    return <p>Loading...</p>;
  } else {
    const code = findCountryCodeForFlag(countryCode);
    const flagUrl = `https://flagpedia.net/data/flags/icon/72x54/${code}.png`;

    return (
      <div className="container">
        <p style={{ fontSize: 24, fontWeight: 'bold' }}>Country Details</p>
        <div>
          <img src={flagUrl} alt={country.name.common} height="50vh" />
        </div>
        <h1>{country.name.common}</h1>
        <table className="table">
          <thead />
          <tbody>
            <tr>
              <td style={{ width: '30%' }}>Capital</td>
              <td>{country.capital}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
                {country.area} km
                <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {country.borders.map((border) => {
                    return (
                      <Link
                        to={`/${border}`}
                        key={border}
                        state={{ countries: countries }}
                      >
                        <li>{findCountryNameByCode(border)}</li>
                      </Link>
                    );
                  })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CountryDetails;
