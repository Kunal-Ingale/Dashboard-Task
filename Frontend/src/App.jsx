import React, { useState } from 'react';
import './App.css';
import useTransactionData from '../Hooks/useTransactionData';
import TransactionsTable from './Components/TransactionsTable';
import Barchart from './Components/Barchart';
import Stats from './Components/Stats';
import Piechart from './Components/Piechart';
import '../src/index.css';

function App() {
    const [month, setMonth] = useState('March');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const { transactions, statistics, barChartData, pieChartData, loading, error, totalPages } = useTransactionData(month, currentPage, itemsPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="app-container">
            <h1>Transaction Dashboard</h1>
            <div className="top-container">
                <div className="stats">
                    <Stats 
                        statistics={statistics} 
                        month={month}
                        setMonth={setMonth}
                    />
                </div>
                <div className="chart-box">
                    <h2>Bar Chart (Price Range) - {month}</h2>
                    <Barchart data={barChartData} />
                </div>
            </div>
            
            <div className="bottom-container">
                <TransactionsTable
                    transactions={transactions}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <div className="chart-box">
                    <h2>Pie Chart (by Category)</h2>
                    <Piechart pieChartData={pieChartData} month={month} />
                </div>
            </div>
        </div>
    );
}

export default App;
