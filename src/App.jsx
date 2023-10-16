import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CountryDetails from './pages/CountryDetailsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="/:countryCode" element={<CountryDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
