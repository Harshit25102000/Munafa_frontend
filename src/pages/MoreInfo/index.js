import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoreInfo.css';  
import PriceGraph from '../../components/PriceGraph';

const SpreadInfo = ({ spread }) => (
  <div className="spread-info">
    <h2>Spread</h2>
    <p>{spread.toFixed(2)}</p>
  </div>
);

const CurrentPrice = ({ price }) => (
  <div className="current-price">
    <h2>Current Price</h2>
    <p>${price.toFixed(2)}</p>
  </div>
);

const FinancialFundamentals = ({ fundamentals }) => (
  <div className="financial-fundamentals">
    <h2>Financial Fundamentals</h2>
    <ul>
      <li>P/E Ratio: {fundamentals.pe}</li>
      <li>EPS: ${fundamentals.eps}</li>
      <li>Market Cap: ${fundamentals.marketCap}</li>
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
    const location = useLocation();
    const [stock, setStock] = useState(null);
  
    useEffect(() => {
      const symbol = location.state?.stock;

      // For now, some dummy data
      setStock({
        symbol: symbol || 'AAPL',
        name: symbol === 'GOOGL' ? 'Alphabet Inc.' : 'Apple Inc.',
        spread: 0.05,
        currentPrice: symbol === 'GOOGL' ? 2800.75 : 150.25,
        fundamentals: {
          pe: 28.5,
          eps: 5.27,
          marketCap: '2.45T',
        },
        description: `${symbol === 'GOOGL' ? 'Alphabet Inc.' : 'Apple Inc.'} is a leading technology company.`,
      });
    }, [location]);
  
    if (!stock) return <div>Loading...</div>;
  
    return (
      <div className="more-info">
        <h1>{stock.name} ({stock.symbol})</h1>
        <CompanyDescription description={stock.description} />
        <PriceGraph symbol={stock.symbol} currentPrice={stock.currentPrice} />
        <FinancialFundamentals fundamentals={stock.fundamentals} />


        <SpreadInfo spread={stock.spread} />
        <CurrentPrice price={stock.currentPrice} />
      </div>
    );
  };
  
  export default MoreInfo;