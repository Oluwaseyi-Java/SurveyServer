const express = require("express")
const router = express.Router()
// const Survey = require("../models/survey")
const mongoose = require("mongoose")

router.get("/", (req, res) => {
    console.log(req.body)
})

router.post("/", (req, res) => {
    console.log(req.body)
})

module.exports = router