const fs = require("fs");
const { parse } = require("path");

const express = require("express");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`servidor iniciado en ${server.address().port}`);
});

let Datos = [];

class Producto {
	constructor(title, price, thumbnail) {
		this.id = 1;
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}

class Contenedor {
	constructor(Archivo) {
		this.Archivo = Archivo;
	}

	async save(instProducto) {
		if (Datos.length > 0) {
			let indexAux = Datos[Datos.length - 1];
			instProducto.id = indexAux.id + 1;
		}
		Datos.push(instProducto);
		const myJSON = JSON.stringify(Datos);

		try {
			await fs.promises.writeFile("./productos.txt", myJSON);
			console.log("datos guardados");
		} catch (err) {
			console.log(err);
		}
	}

	async deleteById(ID) {
		try {
			if (Datos.length != 0) {
				const objIndex = Datos.findIndex((item) => item.id === ID);
				if (objIndex > 0) {
					Datos.splice(objIndex, 1);
					const myJSON = JSON.stringify(Datos);
					await fs.promises.writeFile("./productos.txt", myJSON);
					console.log("se elimino el elemento");
				} else {
					console.log("no existe el elemento");
				}
			} else {
				console.log("No hay elementos en el Array");
			}
			return ID;
		} catch (err) {}
	}
	async getAll() {
		try {
			const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
			let parseDatos = "";
			if (contenido != "") {
				parseDatos = JSON.parse(contenido, null, 2);
			} else {
				parseDatos = [];
			}
			return parseDatos;
		} catch (err) {
			console.log(err);
		}
	}

	async getById(ID) {
		try {
			if (Datos.legth != 0) {
				const objEncontrado = Datos.find((item) => item.id === ID);
				if (objEncontrado != "") {
					console.log(objEncontrado);
				} else {
					console.log("no existe el elemento");
				}
			} else {
				console.log("No hay elementos en el Array");
			}
			return ID;
		} catch (err) {
			console.log(err);
		}
	}

	async deleteAll() {
		try {
			await fs.promises.writeFile("./productos.txt", "");
			console.log("datos Eliminados");
		} catch (err) {
			console.log(err);
		}
	}

	addBook(nombre, autor) {}
}

let contenedor = new Contenedor("./productos.txt");

let instProducto = new Producto("1", "2", "3");

async function ReadWrite() {
	Datos = await contenedor.getAll();

	let numRand = await Math.floor(Math.random() * Datos.length);
	console.log(numRand);
	console.log(Datos.length);

	await contenedor.save(instProducto);

	await contenedor.deleteById(2);

	await contenedor.getById(4);
	const myJSON = await JSON.stringify(Datos);
	const myJSON2 = await JSON.stringify(Datos[numRand]);

	await app.get("/productos", (req, res) => {
		res.end(`<h6> ${myJSON})} </h6>`);
	});

	await app.get("/productosRandom", (req, res) => {
		res.end(`<h6> ${myJSON2})} </h6>`);
	});
}
ReadWrite();

app.get("/", (req, res) => {
	res.end(`<h1> Esto es una prueba </h1>`);
});
