// set up our DataSource here when our entities in ready
import "reflect-metadata";
import { DataSource } from "typeorm";
import Country from "./entities/country";

// import apollo and typegraphQL
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/countryResolver";

// configure datasource here
const AppDataSource = new DataSource({
	type: "sqlite",
	database: "db.sqlite",
	entities: [Country],
	synchronize: true,
});

// delete MANUAL typeDefs and resolvers
// const typeDefs = `#graphql

//   type Country {
// 		id: Int
//     code: String
//     name: String
//     emoji: String
//   }

//   type Query {
//     countries: [Country]
//   }
// `;

// const resolvers = {
// 	Query: {
// 		countries: () => Country.find(),
// 	},
// };

// add a scrypt to test our connexion and manipulate data
async function main() {
	try {
		await AppDataSource.initialize();

		// add schema with typegraphql
		const schema = await buildSchema({
			resolvers: [CountryResolver],
		});

		// new config for run apollo server with schema here
		const server = new ApolloServer({
			schema,
		});

		// RUN APOLLO SERVER
		const { url } = await startStandaloneServer(server, {
			listen: { port: 4000 },
		});

		console.log(`🚀  Server ready at: ${url}`);

		// example/sample data with new country:
		let france = new Country();
		france.code = "FR";
		france.name = "France";
		france.emoji = "🇫🇷";
		await AppDataSource.manager.save(france);
		console.log("Country saved:", france);

		let portugal = new Country();
		portugal.code = "PT";
		portugal.name = "Portugal";
		portugal.emoji = "🇵🇹";
		await AppDataSource.manager.save(portugal);
		console.log("Country saved:", portugal);

		// get all countries here
		const countries = await AppDataSource.manager.find(Country);
		console.log("All countries:", countries);
	} catch (error) {
		console.error("Error during Data Source initialization:", error);
	}
}

main();
