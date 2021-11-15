const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const wasteRoutes = require("./routes/wasteRoutes");

//middleware
app.use(express.json());

//connect to database
connectDB();

//routes
app.use("/api/users", userRoutes);
app.use("/api/wastes", wasteRoutes);

//listen to PORT
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
