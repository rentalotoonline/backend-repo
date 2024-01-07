import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import ApplicationParameter from "../app_parameter/ApplicationParameter";

const schema="auth"
@Entity({name: "users",schema })
export default class Users{
    @PrimaryGeneratedColumn() id:number
    @Column({unique:true}) private email:string
    @Column() private name:string
    @Column() private password:string
    @OneToOne(()=>ApplicationParameter)
    @JoinColumn() private role_:ApplicationParameter

    getId(): number {
        return this.id;
    }

    setId(value: number) {
        this.id = value;
        return this;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
        return this;
    }

    getName(): string {
        return this.name;
    }

    setName(value: string) {
        this.name = value;
        return this;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword(value: string) {
        this.password = value;
        return this;
    }

    getRole(): ApplicationParameter {
        return this.role_;
    }

    setRole(value: ApplicationParameter) {
        this.role_ = value;
        return this;
    }
}