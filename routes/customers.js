const { Costumers, validate } = require('../models/customers')
const express = require('express');
const router = express.Router();


router.get('/', async(req, res) => {
    const costumer = await Costumers.find().sort('name');
    res.send(costumer);
})

router.post('/', async(req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let costumer = new Costumers (
        {
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        }
    )
    costumer = await costumer.save();
    res.send(costumer);
})

router.put('/:id', async(req, res)=> {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const costumer = await Costumers.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone

        }, {
        new: true
      });

    if(!costumer) return res.status(404).send('The costumer with the given ID dose not existed');

    res.send(costumer);
});

router.delete('/:id', async(req, res) => {
    const costumer = await Costumers.findByIdAndRemove(req.params.id);

    if(!costumer) return res.status(404).send('The costumer with the given ID dose not existed');

    res.send(costumer);
});

router.get('/:id', async(req, res) => {
    const costumer = await Costumers.findById(req.params.id);

    if(!costumer) return res.status(404).send('The costumer with the given ID dose not existed');
    res.send(costumer);
})

module.exports = router;