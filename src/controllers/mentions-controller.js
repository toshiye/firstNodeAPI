const mongoose = require('mongoose')
const Mentions = mongoose.model('Mentions')
const { validationResult } = require('express-validator')
const repository = require('../repositories/mentions-repository')

exports.listMentions = async (req, res) => {
    try{
        const data = await repository.listMentions()
        res.status(200).send(data)
    } catch(e){
        res.status(500).send({message: 'Falha ao carregar menções.'})
    }
}

exports.createMentions = async (req, res) => {
    const {errors} = validationResult(req)

    if(errors.length > 0){
        return res.status(400).send({message: errors})
    }
    
    try{
        await repository.createMention({
            friend: req.body.friend,
            mention: req.body.mention
        })
        res.status(201).send({message: 'Menção cadastrada com sucesso!'})
    } catch(e){
        res.status(500).send({message: 'Falha ao cadastrar menção.'})
    }
}