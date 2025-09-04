require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require("mongoose")

const Planet = require("./models/planets.js")
const planet = require('./models/planets.js')


app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})


app.get("/", async (req, res) => {
  res.render("home.ejs")
})

app.get("/planets", async (req, res) => {
  const allPlanets = await Planet.find()
  res.render("planets/index.ejs", { planets: allPlanets })
})




app.get("/planets/new", (req, res) => {
  res.render("planets/new.ejs")
})










app.post("/planets", async (req, res) => {
  if (req.body.isRealPlanet === "on") {
    req.body.isRealPlanet = true
  } else {
    req.body.isRealPlanet = false
  }
  await planet.create(req.body)
  res.redirect("/planets")
})




app.listen(3000, () => {
  console.log('Listening on port 3000')
})
