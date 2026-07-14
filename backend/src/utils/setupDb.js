require("dotenv").config();

const prisma = require("./prisma");

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Admin (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS PreInscripcion (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      nombreApellido TEXT NOT NULL,
      numeroCelular TEXT NOT NULL,
      carrera TEXT NOT NULL,
      turno TEXT NOT NULL,
      horaContacto TEXT NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS ImagenPagina (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      titulo TEXT,
      descripcion TEXT,
      url TEXT NOT NULL,
      publicId TEXT,
      storage TEXT NOT NULL DEFAULT 'local',
      posicion INTEGER NOT NULL DEFAULT 0,
      activo BOOLEAN NOT NULL DEFAULT true,
      seccion TEXT NOT NULL DEFAULT 'slider',
      pesoByte INTEGER,
      dimensiones TEXT,
      formato TEXT,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL
    );
  `);

  const columns = await prisma.$queryRawUnsafe(`PRAGMA table_info(ImagenPagina)`);
  if (!columns.some((column) => column.name === "posicion")) {
    await prisma.$executeRawUnsafe(`ALTER TABLE ImagenPagina ADD COLUMN posicion INTEGER NOT NULL DEFAULT 0`);
  }
  if (!columns.some((column) => column.name === "activo")) {
    await prisma.$executeRawUnsafe(`ALTER TABLE ImagenPagina ADD COLUMN activo BOOLEAN NOT NULL DEFAULT true`);
  }
  for (const [name, definition] of [["seccion", "TEXT NOT NULL DEFAULT 'slider'"], ["pesoByte", "INTEGER"], ["dimensiones", "TEXT"], ["formato", "TEXT"]]) {
    if (!columns.some((column) => column.name === name)) await prisma.$executeRawUnsafe(`ALTER TABLE ImagenPagina ADD COLUMN ${name} ${definition}`);
  }

  console.log("Tablas listas.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
