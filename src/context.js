import React, { useEffect } from "react";
import { useContext, useState } from "react";

const url = "https://restcountries.com/v3.1/name/";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("t");
  const [countries, setCountries] = useState([]);

  const fetchCountry = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        searchTerm ? `${url}${searchTerm}` : `${url}t`
      );
      const data = await response.json();
      if (data.status === 404) {
        setCountries([]);
      } else {
        const newCountries = data.map((item) => {
          const {
            population,
            name,
            languages,
            continents,
            capital,
            flags: { png },
          } = item;
          if (!languages) return;
          const firstLang = Object.values(languages)[0];
          const continent = continents[0];
          const capitalCity = capital?.[0];
          return {
            population,
            name,
            firstLang,
            continent,
            capitalCity,
            flag: png,
          };
        });
        setCountries(newCountries);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ loading, setSearchTerm, countries }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
