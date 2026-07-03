const express = require("express")
const router = express.Router()
const pool = require('../db')

router.get("/", async (req, res) => {
    try {
        const city = req.query.city ? req.query.city.toLowerCase().trim() : null
        const zipcode = req.query.zipcode ? req.query.zipcode.trim() : null
        const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null
        const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null
        const beds = req.query.beds ? Number(req.query.beds) : null
        const baths = req.query.baths ? Number(req.query.baths) : null
        const limit = req.query.limit ?  Number(req.query.limit) : 20
        const offset = req.query.offset ? Number(req.query.offset) : 0

        const conditions = []
        const values = []

        if(city) {
            if(/\d/.test(city)) {
                return errorHelper(res, "city")
            }
            conditions.push("LOWER(TRIM(L_City)) = ?")
            values.push(city)
        }
        
        if(zipcode) {
            if(!/^\d+$/.test(zipcode)) {
                return errorHelper(res, "zipcode")
            }
            conditions.push("TRIM(L_Zip) = ?")
            values.push(zipcode)
        }

        if(maxPrice !== null) {
            if(Number.isNaN(maxPrice)) {
                return errorHelper(res, "maxPrice")
            } else if(maxPrice <= 0) {
                return errorNumberHelper(res, "Minimum Price")
            }
            conditions.push("L_SystemPrice <= ?")
            values.push(maxPrice)
        }
        
        if(minPrice !== null) {
            if(Number.isNaN(minPrice)) {
                return errorHelper(res, "minPrice")
            } else if(minPrice <= 0) {
                return errorNumberHelper(res, "Minimum Price")
            } else if(maxPrice && minPrice > maxPrice) {
            return errorNumberHelper(res, minPrice)
        }
            conditions.push("L_SystemPrice >= ?")
            values.push(minPrice)
        }
        
        if(beds !== null) {
            if(Number.isNaN(beds) || !Number.isInteger(beds)) {
                return errorHelper(res, "beds")
            } else if(beds <= 0 || beds >= 50) {
                return errorNumberHelper(res, "beds")
            }
            conditions.push("L_Keyword2 = ?")
            values.push(beds)
        }
        
        if(baths !== null) {
            if(Number.isNaN(baths) || !Number.isInteger(baths)) {
                return errorHelper(res, "baths")
            } else if(baths < 0 || baths >= 50) {
                return errorNumberHelper(res, "baths")
            }
            conditions.push("LM_Dec_3 = ?")
            values.push(baths)
        }

        if(Number.isNaN(limit) || !Number.isInteger(limit)) {
            return errorHelper(res, "limit")
        }
        
        if(limit <= 0 || limit >= 50) {
            return errorNumberHelper(res, "limit")
        }
        
        if(Number.isNaN(offset) || !Number.isInteger(offset)) {
            return errorHelper(res, "offset")
        }
        
        if(offset < 0) {
            return errorNumberHelper(res, "Offset")
        }

        const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""
        const [ rows ] = await pool.query(`SELECT COUNT(*) AS total FROM rets_property ${where}`, values)
        const total = rows[0].total

        const [ results ] = await pool.query(`SELECT 
            id,
            L_ListingID,
            L_DisplayId,
            L_Address,
            L_City,
            L_State,
            L_Zip,
            L_SystemPrice,
            L_Keyword2,
            LM_Dec_3,
            LM_Int2_3,
            L_Photos
            FROM rets_property
            ${where} LIMIT ? OFFSET ?;`, [...values, limit, offset]
        )
        return res.json({
            total: total,
            limit: limit,
            offset: offset,
            results: results
        })

    } catch(err) {
        console.log(err.message)
        return res.status(500).json({
            status: 500,
            database: "Not Connected",
            message: err.message
        })
    }
})

function errorHelper(res, name) {
    const type = name != "city" && name != 'minPrice' && name != 'maxPrice' 
    ? "letters or decimals" : name != 'city'? "letters" : "numbers"
    console.log(`${name} cannot contain ${type}`)
    return res.status(400).json({
        error: `${name} cannot contain ${type}`
    })
}

function errorNumberHelper(res, name) {
    console.log(`${name} input is either too low or exceeds max value`)
    return res.status(400).json({
        error: `${name} input is either too low or exceeds max value`
    })
}

module.exports = router