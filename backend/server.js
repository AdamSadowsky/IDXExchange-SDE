const express = require('express');
const cors = require('cors');
const app = express();

const pool = require('./db')
const port = 5000
app.use(cors())
app.use(express.json())

app.use("/api/properties", require("./routes/properties"))

app.get("/api/health", async (req, res) => {
    try {
        await pool.query('SELECT 1')
        return res.json({
            status: "ok",
            database: "connected"
        })
    } catch (err) {
        return res.status(500).json({
            status: "error",
            database: "not ok",
            message: err.message
        })
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})
