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

// add a scrypt to test our connexion and manipulate data
async function main() {
	try {
		await AppDataSource.initialize();
		console.log("Data Source has been initialized!");

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
