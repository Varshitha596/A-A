import {useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import { BeatLoader } from 'react-spinners'
import ProductCard from '../ProductCard'
import './index.css'

const apiStatusConstants ={
  initial :'INITIAL',
  inProgress :'IN_PROGRESS',
  success :'SUCCESS',
  failure :'FAILURE',
}
const PrimeDealsSection = () => {
  const [apiResponse,setApiResponse]=useState({
    status:apiStatusConstants.inProgress,
    data:null,
    errorMsg:null,
    })
 // const [primeDealsData,setPrimeDealsData]=useState([])
  useEffect(() => {
    const getPrimeDeals = async () => {
      setApiResponse({
         status:apiStatusConstants.inProgress,
    data:null,
    errorMsg:null,
      })
      const apiUrl = 'https://apis.ccbp.in/prime-deals'
      const jwtToken = Cookies.get('jwt_token')
      const options = {
       
        method: 'GET',
        headers:{
          Authorization:`Bearer ${jwtToken}`,
        },

      }
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const formattedData = fetchedData.prime_deals.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))
       // setPrimeDealsData(formattedData)
        setApiResponse((prevApiResponse)=>({
          ...prevApiResponse,
          status:apiStatusConstants.success,
          data:formattedData,
        }))       
      }
      else{
        setApiResponse(prevApiResponse=>({
          ...prevApiResponse,
          status:apiStatusConstants.failure,
       
      }))
      }
      }
    
    getPrimeDeals()
  }, [])


console.log(apiResponse)
  const renderPrimeDealsList = () => {
    const {data}=apiResponse
    return (
      <div className="products-list-container">
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {data.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }


const renderPrimeDealsFailureView =()=>{
  return (
    <img src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png" alt="exclusive deals banner" 
    className="register-prime-image"/>
  )
}

const renderLoadingView = ()=>
 (
  <div className='loading-container'>
    <BeatLoader color="#7032a5"/>
  </div>
)

const renderPrimeDeals =()=>{
  const {status}=apiResponse 
  switch (status){
    case apiStatusConstants.success:
      return renderPrimeDealsList()
      case apiStatusConstants.failure:
        return renderPrimeDealsFailureView()
        case apiStatusConstants.inProgress:
          return renderLoadingView()
          default:
            return null
  }
}
  return <>{renderPrimeDeals()}</>

}

export default PrimeDealsSection
