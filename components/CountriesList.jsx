import React, { useEffect, useState } from 'react'
import CountriesListShimmer from './CountriesListShimmer'
import CountryCard from './CountryCard'

export default function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([])
  
//const [filteredDat, setQuery] = useFilter(data, () => '')

  useEffect(() => {
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,flags,currencies,languages,borders'
    )
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data)
      })
  }, [])

  if (!countriesData.length) {
    return <CountriesListShimmer />
  }
  return (
    <>
      <div className="country-container">
        {countriesData
          .filter((country) =>
            country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
          )
          .map((country) => {
            return (
              <CountryCard
                key={country.name.common}
                name={country.name.common}
                flag={country.flags.svg}
                population={country.population}
                region={country.region}
                capital={country.capital}
                data = {country}
              />
            )
          })}
      </div>
    </>
  )
}
