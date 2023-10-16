import { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import api from '../services/api';

function HomePage() {
  const [countries, setCountries] = useState(null);

  const fetchAllCountries = async () => {
    try {
      const data = await api.fetchCountries();
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  if (!countries) {
    return <p>Loading...</p>;
  } else {
    const sortedCountries = countries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    return (
      <div
        className="container"
        style={{ maxHeight: '90vh', overflow: 'scroll' }}
      >
        <h1 style={{ fontSize: 24 }}>WikiCountries: Your Guide to the World</h1>
        <div className="list-group">
          {sortedCountries.map((country) => {
            return (
              <CountryCard
                name={country.name.common}
                key={country._id}
                code={country.alpha2Code}
                alpha3Code={country.alpha3Code}
                countries={countries}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
