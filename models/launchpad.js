const {Schema, model} = require('mongoose')

const Launchpad = new Schema({
    id: {type: Number, require: true},
    header: {type: String, require: true},
    logo: {type: String, require: true},
    header_p: {type: String, require: true},

    description_img: {type: String, require: true},
    description_header_p: {type: String, require: true},
    description_img_1: {type: String, require: true},
    description_img_2: {type: String, require: true},
    description_p_2: {type: String, require: true},
})

module.exports = model('Launchpad', Launchpad) 