// server.js
const express = require('express');
const db = require('./db'); 
const app = express();
const PORT = 3000;

// 1. Get All Produce Types 
// GET ALL PRODUCE
app.get('/produce', (req, res) => {
  db.query('SELECT * FROM produce', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET SINGLE PRODUCE
app.get('/produce/:id', (req, res) => {
  db.query('SELECT * FROM produce WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || { message: "Produce not found" });
  });
});

// 2. Get Price by Produce & Location 
// GET ALL PRICES
app.get('/prices', (req, res) => {
  const sql = `
    SELECT p.name as produce_name, m.location_name, pr.price_per_kg, pr.updated_at 
    FROM prices pr
    JOIN produce p ON pr.produce_id = p.id
    JOIN markets m ON pr.market_id = m.id`;
    
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET SINGLE PRICE
app.get('/price/:produce_id/:market_id', (req, res) => {
  const { produce_id, market_id } = req.params;
  const sql = 'SELECT price_per_kg, updated_at FROM prices WHERE produce_id = ? AND market_id = ?';
  
  db.query(sql, [produce_id, market_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || { message: "Price not found" });
  });
});

// 3. Get Logistical Costs 
// GET ALL LOGISTICS
app.get('/logistics', (req, res) => {
  db.query('SELECT * FROM markets', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET SINGLE LOGISTICS
app.get('/logistics/:market_id', (req, res) => {
  db.query('SELECT location_name, base_logistical_cost FROM markets WHERE id = ?', 
  [req.params.market_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || { message: "Market not found" });
  });
});

// 4. Get Market Demand & Stock 
//  GET ALL MARKETS
app.get('/markets', (req, res) => {
  db.query('SELECT * FROM markets', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); 
  });
});

//  GET SINGLE MARKET
app.get('/markets/:id', (req, res) => {
  const marketId = req.params.id;
  db.query('SELECT * FROM markets WHERE id = ?', [marketId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || { message: "Market not found" }); 
  });
});

// 5. Check Farmer Eligibility 
// GET ALL ELIGIBILITY
app.get('/eligibility', (req, res) => {
  db.query('SELECT id, name, is_eligible FROM farmers', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET SINGLE ELIGIBILITY
app.get('/eligibility/:farmer_id', (req, res) => {
  db.query('SELECT id, name, is_eligible FROM farmers WHERE id = ?', 
  [req.params.farmer_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || { message: "Farmer not found" });
  });
});

app.listen(PORT, () => {
  console.log(`AgriDirect API running on http://localhost:${PORT}`);
});