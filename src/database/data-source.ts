import "reflect-metadata"
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "typescript",
    synchronize: true,
    logging: true,
    entities: [
        __dirname + '/../entity/*.ts'
    ],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
             .then(() => console.log('connect success'))
             .catch((error) => console.log(error))

export default AppDataSource