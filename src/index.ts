// set up our DataSource here when our entities in ready
import "reflect-metadata";
import { DataSource } from "typeorm";
import Country from "./entities/country";

const AppDataSource = new DataSource({
	type: "sqlite",
	database: "db.sqlite",
	entities: [Country],
	synchronize: true,
});

// import apollo here
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

  type Country {
		id: Int
    code: String
    name: String
    emoji: String
  }

  type Query {
    countries: [Country]
  }
`;

const resolvers = {
	Query: {
		countries: () => Country.find(),
	},
};

// add a scrypt to test our connexion and manipulate data
async function main() {
	try {
		await AppDataSource.initialize();

		// run apollog server here
		const server = new ApolloServer({
			typeDefs,
			resolvers,
		});

		// add port and standalone server for test
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
