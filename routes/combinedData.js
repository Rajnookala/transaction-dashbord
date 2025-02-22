const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    try {
        const { month } = req.query;
        if (!month) return res.status(400).json({ error: "Month is required" });

        // Fetch data from different APIs
        const [statsRes, barChartRes, pieChartRes] = await Promise.all([
            axios.get(`http://localhost:5000/api/statistics?month=${month}`),
            axios.get(`http://localhost:5000/api/bar-chart?month=${month}`),
            axios.get(`http://localhost:5000/api/pie-chart?month=${month}`)
        ]);

        // Combine responses
        const combinedData = {
            statistics: statsRes.data,
            barChart: barChartRes.data,
            pieChart: pieChartRes.data
        };

        res.json(combinedData);
    } catch (error) {
        console.error("Error fetching combined data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
