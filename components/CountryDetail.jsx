import { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CountryDetailShimmer from './CountryDetailShimmer'
import './CountryDetail.css'
import { useTheme } from '../hooks/useTheme'
export default function CountryDetail() {
  const [isDark] = useTheme()
  const navigate = useNavigate()
  const params = useParams()
  const { state } = useLocation()
  const countryName = params.country
  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital,
      tld: data.tld,
      flag: data.flags.svg,
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(', '),
      language: Object.values(data.languages || {}).join(', '),
      borders: [],
    })
    if (!data.borders) {
      data.borders = []
    }
    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common)
      })
    ).then((borders) => {
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      )
    })
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state)
      return
    }
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data)
      })
      .catch((error) => {
        setNotFound(true)
      })
  }, [countryName])
  if (notFound) {
    return <div>Country not found</div>
  }

  return (
    <>
      <main className={`${isDark ? 'dark' : ''}`}>
        <div className="country-details-container">
          <span className="back-button" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left-long"></i>&nbsp;&nbsp;Back
          </span>
          {countryData === null ? (
            <CountryDetailShimmer />
          ) : (
            <div className="country-details">
              <img src={countryData.flag} alt={countryData.name} />
              <div>
                <h1>{countryData.name}</h1>
                <div className="details-text">
                  <div className="details-text-left">
                    <p>
                      <b>Native Name: </b>
                      <span className="native-name">
                        {countryData.nativeName || countryData.name}
                      </span>
                    </p>

                    <p>
                      <b>Population: </b>
                      <span className="population">
                        {countryData.population.toLocaleString('en-IN')}
                      </span>
                    </p>
                    <p>
                      <b>Region: </b>
                      <span className="region">{countryData.region}</span>
                    </p>
                    <p>
                      <b>Sub Region: </b>
                      <span className="sub-region">
                        {countryData.subRegion}
                      </span>
                    </p>
                    <p>
                      <b>Capital: </b>
                      <span className="capital">
                        {countryData.capital?.join(', ')}
                      </span>
                    </p>
                  </div>
                  <div className="details-text-right">
                    <p>
                      <b>Top Level Domain: </b>
                      <span className="toplevel-domain">{countryData.tld}</span>
                    </p>
                    <p>
                      <b>Currencies: </b>
                      <span className="currencies">
                        {countryData.currencies}
                      </span>
                    </p>
                    <p>
                      <b>Languages: </b>
                      <span className="languages">{countryData.language}</span>
                    </p>
                  </div>
                </div>
                {countryData.borders.length !== 0 && (
                  <div className="border-countries">
                    <div>
                      <b>Border Countries: </b>
                    </div>
                    <div className="country-borders-name">
                      {countryData.borders.map((border) => (
                        <Link key={border} to={`/${border}`}>
                          {border}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
