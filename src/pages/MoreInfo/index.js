import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoreInfo.css';  
import NavbarComponent from '../../components/Navbar';
import { BACKEND_URL } from "../../config";
import PriceGraph from '../../components/PriceGraph';
import { useNavigate } from "react-router-dom"
// const SpreadInfo = ({ spread }) => (
//   <div className="spread-info">
//     <h2>Spread</h2>
//     <p>{spread.toFixed(2)}</p>
//   </div>
// );

// const CurrentPrice = ({ price }) => (
//   <div className="current-price">
//     <h2>Current Price</h2>
//     <p>${price.toFixed(2)}</p>
//   </div>
// );

const Avgs = ({ Averages }) => (
  <div className="financial-fundamentals">
    <h2>Moving Averages</h2>
    <ul>
      <li>50 Day Moving Average: {Averages.twoHundredDay}</li>
      <li>200 Hundred Day Moving Average: {Averages.fiftyDay}</li>
      
    </ul>
  </div>
);

const HighLow = ({ highLow }) => (
  <div className="financial-fundamentals">
    <h2>High and Low</h2>
    <ul>
      <li>52 Week High: 191.89</li>
      <li>52 Week Low: 172.98</li>
 
    </ul>
  </div>
);
const FinancialFundamentals = ({ fundamentals }) => (
  <div className="financial-fundamentals">
    <h2>Financial Fundamentals</h2>
    <ul>
      <li>P/E Ratio: {fundamentals.pe}</li>
      <li>EBITDA: {fundamentals.ebitda}</li>
      <li>Market Cap:  {fundamentals.marketCap}</li>
    </ul>
  </div>
);

const CompanyDescription = ({ description }) => (
  <div className="company-description">
    <h2>Company Description</h2>
    <p>{description}</p>
  </div>
);

const MoreInfo = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const [stock, setStock] = useState(null);
    // const [data,setData]=useState([])
    
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      
    const symbol=queryParams.get('infoSymbol')
    
    console.log(symbol)
      fetch(BACKEND_URL + '/get_fundamentals', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            withCredentials: true
        },
        body: JSON.stringify({ symbol })


    })

        .then(async (response) => {
            const data = await response.json();
            if (data.success && data.data && data.data.status === 'SUCCESS') {
              // setData(data.data.data)
              console.log(data.data)
              setStock({
                symbol: symbol ,
                
                
                Averages:{
                  twoHundredDay:data.data.TwoHundredDayMovingAvg,
                  fiftyDay:data.data.FityDayMovingAvg,

                },
                fundamentals: {
                  pe: data.data.peratio,
                  ebitda: data.data.ebitda,
                  marketCap: data.data.market_cap,
                },
                highLow:{
                    low:data.data.fifty_two_week_low,
                    high:data.data.fifty_two_week_high
                },
                description: data.data.description
              });


            } else {
                console.log(data.data)

            }
        })
        .catch((error) => {
            console.log(error)

        });



      
      
      
      
    }, [location]);
  
    if (!stock) return <div>Loading...</div>;
  
    return (
      <div>
      <NavbarComponent/>
      <div className="more-info">
        <h1>{stock.name} ({stock.symbol})</h1>
        <CompanyDescription description={stock.description} />
        <PriceGraph symbol={stock.symbol} currentPrice={stock.currentPrice} />
        <FinancialFundamentals fundamentals={stock.fundamentals} />


        <Avgs Averages={stock.Averages} />
        <HighLow price={stock.highLow} />
      </div>
      </div>
    );
  };
  
  export default MoreInfo;