import React from "react";
import CountryList from "../components/CountryList";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <main>
      <SearchForm />
      <CountryList />
    </main>
  );
};

export default Home;
