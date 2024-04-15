import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/country";

@Resolver((of) => Country)
export class CountryResolver {
	@Query((returns) => [Country])
	async countries(): Promise<Country[]> {
		return await Country.find();
	}

	@Query((returns) => Country, { nullable: true })
	async country(@Arg("code") code: string): Promise<Country | undefined> {
		const result = await Country.findOneBy({ code });
		return result ?? undefined;
	}

	@Mutation((returns) => Country)
	async addCountry(
		@Arg("code") code: string,
		@Arg("name") name: string,
		@Arg("emoji") emoji: string,
		@Arg("continentCode", { nullable: true }) continentCode?: string
	): Promise<Country> {
		const country = Country.create({
			code,
			name,
			emoji,
			continentCode,
		});
		await country.save();
		return country;
	}
}
