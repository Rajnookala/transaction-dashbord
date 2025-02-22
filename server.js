const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const initializeRoutes = require("./routes/initialize");
const transactionRoutes = require("./routes/transactions");
const statisticsRoutes = require("./routes/statistics");
const barChartRoutes = require("./routes/barChart");
const pieChartRoutes = require("./routes/pieChart");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api", initializeRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/bar-chart", barChartRoutes);
app.use("/api/pie-chart", pieChartRoutes);
app.use("/api/combined-data", require("./routes/combinedData"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
