class Libro {
	constructor(nombre, autor) {
		this.nombre = nombre;
		this.autor = autor;
	}
}

class Usuario {
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros;
		this.mascotas = mascotas;
	}

	get getFullName() {
		return this.nombre + " " + this.apellido;
	}

	addMascota(nombreMascota) {
		this.mascotas.push(nombreMascota);
	}

	countMascotas() {
		return this.mascotas.length;
	}

	addBook(nombre, autor) {
		let auxLibro = new Libro(nombre, autor);
		this.libros.push(auxLibro);
	}

	get getBookNames() {
		this.libros.map((value) => {
			console.log(value.nombre);
		});
	}
}

let auxLibro = new Libro("Libro1", "desconocido1");
let auxLibro2 = new Libro("Libro2", "desconocido2");
let auxLibro3 = new Libro("Libro3", "desconocido3");
let auxLibro4 = new Libro("Libro4", "desconocido4");
let auxLibro5 = new Libro("Libro5", "desconocido5");

let Libros = [];
Libros.push(auxLibro);
Libros.push(auxLibro2);
Libros.push(auxLibro3);
Libros.push(auxLibro4);
Libros.push(auxLibro5);

let Mascotas = [];
Mascotas.push("A");
Mascotas.push("B");
Mascotas.push("C");
Mascotas.push("D");
Mascotas.push("E");
Mascotas.push("F");
Mascotas.push("G");

let nuevoUsuario = new Usuario("Andres", "Salas", Libros, Mascotas);

console.log(nuevoUsuario.getFullName);

nuevoUsuario.addMascota("Mi perrito");

console.log(nuevoUsuario);

nuevoUsuario.addBook("Libro Malo", "Autor Malo");

console.log(nuevoUsuario.getBookNames);
