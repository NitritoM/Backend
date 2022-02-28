const fs = require("fs");
const { parse } = require("path");
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

	await contenedor.save(instProducto);

	await contenedor.deleteById(2);

	await contenedor.getById(4);
}

ReadWrite();

//contenedor.save(instProducto).then(contenedor.getAll())
// contenedor.getAll();
// console.log("estos son datos");
// console.log(Datos);
// contenedor.save(instProducto);
