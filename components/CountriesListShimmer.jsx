import './CountriesListShimmer.css'
export default function CountriesListShimmer() {
  // const array = new Array(10).fill('')

  return (
    <div className="country-container">
      {Array.from({ length: 12 }).map((el, i) => {
        return <div key={i} className="country-card shimmer-card">
          <div className='flag-container'></div>
          <div className='card-text'>
          <h3 className='card-title'></h3>
          <p></p>
          <p></p>
          <p></p>

          </div>
        </div>
      })}
    </div>
  )
}
