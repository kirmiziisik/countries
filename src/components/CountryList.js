import React from "react";
import Country from "./Country";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CountryList = () => {
  const { countries, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (countries.length < 1) {
    return <h2 className="section-title">no country found</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">Countries</h2>
      <div className="countries-center">
        {countries.map((item) => {
          if (!item?.name) return;
          const countryName = item.name.common;
          return (
            <Country key={countryName} {...item} countryName={countryName} />
          );
        })}
      </div>
    </section>
  );
};

export default CountryList;
