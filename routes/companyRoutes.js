const express = require("express")
const company = require("../company")
const router = express.Router()
const companies  = require("../company")


router.post("/" ,  async(req , res)=>{
    try {
        const {email , name } = req.body
        const company = new Company({
            email,
            name
        })
    } catch (error) {
        console.log(error.message)
    }
})


router.get("/:name" , async(req , res)=>{
    try {

        const company  = companies.filter((c)=>c.name==req.params.name)
        return res.json(company)

    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router