const Item = require('../models/Item')

module.exports = {
    async index(req, res){
        const products = await Item.find()

        return res.json(products)
    },

    async store(req, res) {

        const product = await Item.create(req.body)

        return res.json(product)
    },

    async show(req, res) {
        const product = await Item.findById(req.params.id)

        return res.json(product)
    },

    async update(req, res) {
        const product = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true})

        return res.json(product)
    },

    async destroy(req, res) {
        await Item.findByIdAndRemove(req.params.id)

        return res.send()
    }
    
}