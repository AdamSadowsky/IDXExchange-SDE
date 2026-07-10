const express = require('express');
const cors = require('cors');
const app = express();

const pool = require('./db')
const port = 5000
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    const start = Date.now()
    const timestamp = new Date().toISOString()

    res.on("finish", () => {
        const duration = Date.now() - start
        console.log(req.method, req.originalUrl, res.statusCode, timestamp, duration + "ms")
    })
    next()
})

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

app.get("/api/properties/:id/openhouses", async (req, res) => {
    try {
        const openhouse_id = req.params.id

        if(!/^\d{10}$/.test(openhouse_id)) {
            return res.status(400).json({
                message: "ID is either too long or malformed"
            })
        }

        const [ exists ] = await pool.query(
            `SELECT 1
            FROM rets_property
            WHERE L_ListingID = ?;`, [openhouse_id]
        ) 

        if(exists.length == 0) {
            return res.status(404).json({
                message: "ID does not exist"
            })
        }

        const [ openhouses ] = await pool.query(
            `SELECT id,
            L_ListingID,
            L_DisplayId,
            OpenHouseDate,
            OH_StartTime,
            OH_EndTime
            FROM rets_openhouse
            WHERE L_ListingID = ?
            ORDER BY OpenHouseDate, OH_StartTime;`, [openhouse_id])

        return res.status(200).json({
            status: "ok",
            database: "connected",
            result: openhouses
        })

    } catch(err) {
        return res.status(500).json({
            status: "error",
            database: "not ok",
            message: err.message
        })
    }
})

app.get("/api/properties/:id", async (req, res) => {
    try {
        const property_id = req.params.id
        if(!/^\d{10}$/.test(property_id)) {
            return res.status(400).json({
                message: "ID is either too long or malformed"
            })
        }
        const [ property ] = await pool.query(
            `SELECT *
            FROM rets_property 
            WHERE L_ListingID = ?;`, [property_id])

        if(property.length == 0) {
            return res.status(404).json({
                message: "ID could not be found"
            })
        } 

        return res.status(200).json({
            status: "ok",
            database: "connected",
            result: property[0]
        })

    } catch (err) {
        return res.status(500).json({
            status: "error",
            database: "not ok",
            message: err.message
        })
    }
})

app.use("/api/properties", require("./routes/properties"))

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})
