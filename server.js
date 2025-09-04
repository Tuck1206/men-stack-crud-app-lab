require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require("mongoose")


const Planet = require("./models/planets.js")

const methodOverride = require("method-override")
const morgan = require("morgan")
const planet = require('./models/planets.js')


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))


mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})


app.get("/", async (req, res) => {
  res.render("home.ejs")
})

app.get("/planets/new", (req, res) => {
  res.render("planets/new.ejs")
})

app.get("/planets", async (req, res) => {
  const allPlanets = await Planet.find()
  res.render("planets/index.ejs", { planets: allPlanets })
})


app.get("/planets/:planetId", async (req, res) => {
  const foundPlanet = await Planet.findById(req.params.planetId)
  res.render("planets/show.ejs", { planet: foundPlanet })
})

app.get("/planets/:planetId/edit", async (req, res) => {
  const foundPlanet = await Planet.findById(req.params.planetId)
  res.render("planets/edit.ejs", {
    planet: foundPlanet,
  })
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

// server.js

app.put("/planets/:planetId", async (req, res) => {
  if (req.body.isRealPlanet === "on") {
    req.body.isRealPlanet = true
  } else {
    req.body.isRealPlanet = false
  }
  await Planet.findByIdAndUpdate(req.params.planetId, req.body)
  res.redirect(`/planets/${req.params.planetId}`)
})

app.delete("/planets/:planetId", async (req, res) => {
  await Planet.findByIdAndDelete(req.params.planetId)
  res.redirect("/planets")
})





app.listen(3000, () => {
  console.log('Listening on port 3000')
})
