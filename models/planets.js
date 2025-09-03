const mongoose = require("mongoose")

const planetSchema = new mongoose.Schema({
  name: String,
  isRealPlanet: Boolean,
})

const planet = mongoose.model("planet", planetSchema)

module.exports = planet

