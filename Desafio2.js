const fs = require("fs");
let Datos = [];

class Producto {
	constructor(title, price, thumbnail) {
		this.id = 0;
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
		Datos.push(instProducto);

		const myJSON = JSON.stringify(Datos);
		try {
			await fs.promises.appendFile("./datos.txt", myJSON);
            console.log("datos guardados");
		} catch (err) {}
	}

	getById(ID) {
		console.log("errorrrrrrrr");
	}
	async getAll() {
		const contenido = await fs.promises.readFile("./datos.txt", "utf-8");

		let parseDatos = JSON.parse(contenido, null, 2);
		console.log(parseDatos);
		console.log("datosparseados");
		Datos = parseDatos;
	}

	deleteById(ID) {
		return ID;
	}

	deleteAll() {
		return "exito";
	}

	addBook(nombre, autor) {}
}

let contenedor = new Contenedor("./datos.txt");

let instProducto = new Producto("1", "2", "3");
//contenedor.save(instProducto).then(contenedor.getAll())
contenedor.getAll()
console.log("estos son datos")
console.log(Datos)
contenedor.save(instProducto)
