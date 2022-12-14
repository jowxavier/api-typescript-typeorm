import {Request, Response, Router} from 'express'
import User from '@/controllers/User'

const routes = Router()

routes.post('/api/users', User.create)
routes.get('/api/users', User.findAll)
routes.get('/api/users/:id', User.find)
routes.put('/api/users/:id', User.update)
routes.delete('/api/users/:id', User.delete)
routes.get('/', (_: Request, response: Response) => {
    response.status(200).send({
        success: true
    })
})
routes.get("*", (_: Request, response: Response) => {
    response.status(200).send({
        error: "Not Found"
    })
})



export default routes