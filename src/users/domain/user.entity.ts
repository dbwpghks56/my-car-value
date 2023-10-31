import { BaseEntity } from 'src/common/domain/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';
import { UserResponseDto } from '../dto/response/user.response';
import { Builder } from 'builder-pattern';
import { UpdateUserDto } from '../dto/request/update-user.dto';

@Entity({
    name: 'tb_user'
})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id);
    }

    /**
     * @Column(() => BaseEntity)
     * base: BaseEntity
     * 로도 가능
     */

    toResponse(): UserResponseDto {
        return Builder<UserResponseDto>()
        .id(this.id)
        .email(this.email)
        .status(this.status)
        .createdTime(this.createdTime)
        .updatedTime(this.updatedTime)
        .build();
    } 
}