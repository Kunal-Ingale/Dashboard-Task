const express = require('express')
const Transaction = require('../Models/Transaction')
const axios = require('axios')

const router = express.Router()
const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
};

router.get('/init', async (req, res) => {
    try {
        const response = await axios.get(process.env.API_URL);
        
        await Transaction.insertMany(res.data);
        res.status(200).json({ message: "Data initialized successfully" });
    } catch (error) {
        console.error('Error initializing data:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const { month, search = '', page = 1, perPage = 10 } = req.query;
       

        if (!month) {
            return res.status(400).json({ error: ' month is required.' });
        }
        const monthNum = monthMap[month];
        if (monthNum === undefined) {
            return res.status(400).json({ error: 'Invalid month. Please provide a valid month name (e.g., January, February, etc.).' });
        }
        const searchQuery = search
            ? {
                  $or: [
                      { title: { $regex: search, $options: 'i' } },
                      { description: { $regex: search, $options: 'i' } },
                      { price: { $regex: search, $options: 'i' } }
                  ]
              }
            : {};

        const limit = parseInt(perPage);
        const skip = (parseInt(page) - 1) * limit;

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum + 1] }, 
        })
            .skip(skip)
            .limit(limit);

        const totalTransactions = await Transaction.countDocuments({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum + 1] },
            ...searchQuery
        });

        res.status(200).json({
            data: transactions,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalTransactions / limit),
            totalTransactions
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/statistics', async (req, res) => {
    const { month } = req.query;
    const monthNum = monthMap[month];
  
    if (monthNum === undefined) {
      return res.status(400).json({ error: 'Invalid month. Please provide a valid month name (e.g., January).' });
    }
  
    try {
     
      const totalSold = await Transaction.countDocuments({
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, monthNum], 
        },
        sold: true,
      });
  
      const totalNotSold = await Transaction.countDocuments({
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, monthNum], 
        },
        sold: false,
      });
  
      const totalSaleAmount = await Transaction.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: "$dateOfSale" }, monthNum], 
            },
            sold: true,
          },
        },
        { $group: { _id: null, totalAmount: { $sum: "$price" } } },
      ]);
  
      res.status(200).json({
        totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
        totalSold,
        totalNotSold,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching statistics', details: error.message });
    }
  });

router.get('/bar-chart', async (req, res) => {
    const { month } = req.query;
    const priceRanges = [
        { range: '0-100', min: 0, max: 100 },
        { range: '101-200', min: 101, max: 200 },
        { range: '201-300', min: 201, max: 300 },
        { range: '301-400', min: 301, max: 400 },
        { range: '401-500', min: 401, max: 500 },
        { range: '501-600', min: 501, max: 600 },
        { range: '601-700', min: 601, max: 700 },
        { range: '701-800', min: 701, max: 800 },
        { range: '801-900', min: 801, max: 900 },
        { range: '901-above', min: 901, max: Infinity }
    ];

    try {
        const monthNum = monthMap[month];
        if (monthNum === undefined) {
            return res.status(400).json({ error: 'Invalid month.' });
        }
        const barChartData = await Promise.all(
            priceRanges.map(async ({ range, min, max }) => {
                const count = await Transaction.countDocuments({
                    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum + 1] }, 
                    price: { $gte: min, $lt: max }
                });
                return { range, count };
            })
        );
       
        res.status(200).json(barChartData);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Error fetching bar chart data' });
    }
});

router.get('/pie-chart', async (req, res) => {
    const { month} = req.query;
    try {
        const monthNum = monthMap[month];
        if (monthNum === undefined) {
            return res.status(400).json({ error: 'Invalid month.' });
        }
        const startOfMonth = new Date( monthNum, 1);
        const endOfMonth = new Date( monthNum + 1, 0);

        const pieChartData = await Transaction.aggregate([
            {
              $match: {
                $expr: { $eq: [{ $month: "$dateOfSale" }, monthNum] }, 
              },
            },
            {
              $group: {
                _id: "$category",
                count: { $sum: 1 }, 
              },
            },
          ]);


        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).json({ error: 'Error fetching pie chart data' });
    }
});

module.exports = router;
