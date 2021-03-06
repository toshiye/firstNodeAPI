const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const mentionsController = require('../controllers/mentions-controller')

router.get('/', mentionsController.listMentions)
router.post('/', [
        check('friend').isLength({min: 7}).withMessage('O nome precisa ter no mínimo 7 caracteres.'),
        check('mention').isLength({min: 20, max: 280}).withMessage('A menção precisa ter no mínimo 20 caracteres e no máximo 280.')
    ], 
    mentionsController.createMentions
)

module.exports = router