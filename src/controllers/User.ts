import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { UserRepository } from '@/repositories/User'
import { CreateUserDTO, UpdateUserDTO } from '@/dto/User'

class UserController {
    private repository: UserRepository

    constructor() {
        this.repository = new UserRepository
    }

    findAll = async (_: Request, response: Response): Promise<Response> => {
        const users = await this.repository.findAll()

        try {
            return response.status(200).send({
                data: users
            })
        } catch (error) {
            return response.status(404).send({
                error: 'Users Not Found'
            })
        }
    }

    create = async (request: Request, response: Response): Promise<Response> => {
        const {name, lastname, age} = request.body

        const createUserDTO = new CreateUserDTO
        createUserDTO.name = name
        createUserDTO.lastname = lastname
        createUserDTO.age = age

        const errors = await validate(createUserDTO)
        if (errors.length > 0) {
            return response.status(422).send({
                error: errors
            })
        }

        try {
            const user = await this.repository.create(createUserDTO)
            return response.status(201).send({
                data: user
            })
        } catch (error) {
            return response.status(500).send({
                error: 'Internal error'
            })
        }
    }

    find = async (request: Request, response: Response): Promise<Response> => {
        const id: string = request.params.id

        try {
            const user = await this.repository.find(id)
            if (!user) {
                return response.status(404).send({
                    error: 'User not found'
                })
            }

            return response.status(200).send({
                data: user
            })
        } catch (error) {
            return response.status(500).send({
                error: 'Internal error'
            })
        }
    }

    update = async(request: Request, response: Response): Promise<Response> => {
        const id: string = request.params.id
        const {name, lastname, age} = request.body

        const updateDto = new UpdateUserDTO
        updateDto.id = id
        updateDto.name = name
        updateDto.lastname = lastname
        updateDto.age = age

        const errors = await validate(updateDto)
        if (errors.length > 0) {
            return response.status(422).send({
                errors
            })
        }

        try {
            const user = await this.repository.update(updateDto)
            if (!user) {
                return response.status(404).send({
                    error: 'User Not Found'
                })
            }

            return response.status(200).send({
                data: user
            })
        } catch (error) {
            return response.status(500).send({
                error: 'Internal error'
            })
        }
    }

    delete = async (request: Request, response: Response): Promise<Response> => {
        const id: string = request.params.id

        try {
            await this.repository.delete(id)

            return response.status(204).send({})
        } catch (error) {
            return response.status(400).send({
                error: 'Error deleting'
            })
        }
    }
}

export default new UserController