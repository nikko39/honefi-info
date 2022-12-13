const {Schema, model} = require('mongoose')

const Graphic = new Schema({
    rows: {type: [], require:true}
})

module.exports = model('Graphic', Graphic)