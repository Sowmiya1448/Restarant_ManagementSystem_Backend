import express from 'express'
import { image } from './imageuploadmodel.js'


const ImageRouter = express.Router()

ImageRouter.post('/upload/', async (request, response) => {

    const new_image = new image(request.body)

    await new_image.save()

    response.json(new_image)
})

ImageRouter.get('/:id/', async (request, response) => {

    const images = await image.findById(request.params.id);

    response.json(images)

})

export default ImageRouter