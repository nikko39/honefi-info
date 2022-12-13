const {Router} = require('express')
const postController = require('./postController.js')
const router = Router()


router.get('/price/:id',postController.price)
router.get('/createLaunch', postController.createLaunch)
router.get('/getLaunchs', postController.getLaunch)
router.get('/getLaunch/:id', postController.getLaunchId)

module.exports = router;