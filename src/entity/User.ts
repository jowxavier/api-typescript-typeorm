import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    age: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}
