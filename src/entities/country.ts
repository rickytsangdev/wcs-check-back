import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	code!: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column()
	emoji!: string;
}

export default Country;
