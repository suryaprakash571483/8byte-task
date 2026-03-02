
// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());


// const cache = {};
// const CACHE_TIME = 30000; // 30 seconds


// function isCacheFresh(key) {
//   if (!cache[key]) return false;
//   return Date.now() - cache[key].timestamp < CACHE_TIME;
// }

// //  Yahoo Finance 
// app.get('/api/stock/:symbol', async (req, res) => {
//   const symbol = req.params.symbol.toUpperCase();

//   // Return cached data if available
//   if (isCacheFresh(symbol)) {
//     return res.json(cache[symbol].data);
//   }

//   try {
//     // Yahoo Finance unofficial API
//     const url = ``;
//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0'
//       },
//       timeout: 8000
//     });

//     const result = response.data.chart.result[0];
//     const price = result.meta.regularMarketPrice;

//     const data = {
//       symbol: symbol,
//       cmp: price,
//       source: 'Yahoo Finance',
//       timestamp: new Date().toISOString()
//     };

//     // Save to cache
//     cache[symbol] = { data, timestamp: Date.now() };

//     res.json(data);
//   } catch (error) {
//     console.error(`Error fetching CMP for ${symbol}:`, error.message);
//     res.status(500).json({
//       error: 'Could not fetch stock price',
//       symbol: symbol,
//       cmp: null
//     });
//   }
// });

