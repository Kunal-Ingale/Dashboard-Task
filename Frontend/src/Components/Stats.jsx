
import React from 'react';
import SaleIcon from '../assets/icons/Sales.png'
import SoldIcon from '../assets/icons/sold.png';
import UnsoldIcon from '../assets/icons/unsold1.jpg';


const Stats = ({ statistics,month, setMonth}) => {
  
  if (!statistics) {
    return <div>No statistics available</div>;
  }

  return (
    <>
    
    <div className="dropdown-container">
<label className='label-month'>
    Select Month : 
    <select value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
    </select>
</label>
</div>
    

    <div className='statistics-container'>
      <h2>Statistics - {month}</h2>
      <div className="statistics-summary">
      <div className="statistics-item">
      <img src={SoldIcon} alt="Total Sold Icon" className="stats-icon" />
        <p>Total Sold Items:</p>
        <strong>{statistics.totalSold || 0}</strong>
      </div>
      
      <div className="statistics-item">
      <img src={UnsoldIcon} alt="Total Unsold Icon" className="stats-icon" />
        <p>Total Unsold Items:</p>
        <strong>{statistics.totalNotSold || 0}</strong>
      </div>

      <div className="statistics-item">
      <img src={SaleIcon} alt="Total Sale Icon" className="stats-icon" />
        <p>Total Sale:  </p>
        <strong >${Math.round(statistics.totalSaleAmount) || 0}</strong>
      </div>
      </div>
    </div>
    </>
  );
}

export default Stats;
