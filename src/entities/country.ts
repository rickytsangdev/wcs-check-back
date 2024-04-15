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

	@Field({ nullable: true }) // nullable le rend facultatif
	@Column({ nullable: true })
	continentCode!: string;
}

export default Country;
