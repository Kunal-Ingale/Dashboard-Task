import React, { useEffect, useState } from 'react'
import axios from 'axios';
import axiosInstance from './axiosInstance';

const useTransactionData = (month, currentPage, itemsPerPage) => {
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
  
    useEffect(()=>{
        const fetchData = async() =>{
            setLoading(true);
            setError(null);
            try {
                // console.log(`Fetching transactions for Month: ${month}, Page: ${currentPage}`);
                const transRes = await axiosInstance('/list', {
                    params : {
                        month,
                        page:currentPage,
                        perPage: itemsPerPage
                    }
                })
                setTransactions(transRes.data.data)
                setTotalPages(transRes.data.totalPages);

                const statsRes = await axiosInstance.get(`/statistics?month=${month}`)
                setStatistics(statsRes.data)

                const barRes = await axiosInstance.get(`/bar-chart?month=${month}`)
                setBarChartData(barRes.data)

                const pieRes = await axiosInstance.get(`/pie-chart?month=${month}`)
               
                setPieChartData(pieRes.data)

            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            }
            finally{
                setLoading(false);
            }
        }
     fetchData(); 
    },[month,currentPage, itemsPerPage])
  
 return { transactions, statistics, barChartData, pieChartData, loading, error , totalPages};
  
}

export default useTransactionData;
