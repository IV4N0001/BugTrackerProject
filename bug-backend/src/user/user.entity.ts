import { bug } from "src/bug/bug.entity"
import { coment } from "src/coment/coment.entity"
import { notification } from "src/notification/notification.entity"
import { project } from "src/project/project.entity"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm"

export enum role {
    administrator = 'ADMINISTRATOR',
    developer = 'DEVELOPER',
    reporter = 'REPORTER',
    evaluator = 'EVALUATOR'
}

@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    userName: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    role: role

    @Column({type: 'uuid', unique: true, nullable: true})
    restorePasswordToken: string

    @OneToMany(() => coment, coment => coment.user)
    @JoinColumn()
    coment: coment

    @OneToMany(() => bug, bug => bug.user)
    @JoinColumn()
    bug: bug

    @OneToMany(() => project, project => project.userName)
    @JoinColumn()
    project: project

    @OneToMany(() => notification, notification => notification.addressee)
    @JoinColumn()
    notificationReceived: notification

    @OneToMany(() => notification, notification => notification.remmittent)
    @JoinColumn()
    notificationSent: notification

    @Column('simple-array', { nullable: true })
    project_collaborations: string[];
}