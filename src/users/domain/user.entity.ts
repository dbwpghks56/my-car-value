import { BaseEntity } from 'src/common/domain/base.entity';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
    name: 'tb_user'
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}