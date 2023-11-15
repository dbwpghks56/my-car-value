import { BaseEntity } from "src/common/domain/base.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: 'tb_report'
})
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;
}