import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @Column({
        default: false
    })
    status: boolean;

    @CreateDateColumn()
    createdTime: Date;

    @UpdateDateColumn()
    updatedTime: Date;
}