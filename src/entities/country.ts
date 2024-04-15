import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	code!: string;

	@Column()
	name!: string;

	@Column()
	emoji!: string;
}

export default Country;
