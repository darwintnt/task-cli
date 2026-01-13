import { Command } from "commander";
import inquirer from "inquirer";
import {
  addTask,
  deleteTask,
  listTasks,
  search,
  updateTask,
} from "../controllers/task.controller.ts";
import { loadConfig, resetConfig, setupConfig, showConfig } from "../config.ts";
import { db } from "../database.ts";

const program = new Command();

const validateIfExistConfig = async () => {
  const config = loadConfig();
  if (!config.MONGODB_URL) {
    console.error(
      'Error: ⚠️  No hay configuración guardada ejecuta primero "cli-tasks config"'
    );
    process.exit(1);
  }

  await db();
};

program.version("0.0.1").description("A command line tool for managing");

program
  .command("config")
  .description("Configuración inicial variables de entorno")
  .action(async () => {
    await setupConfig();
  });

program
  .command("config:show")
  .description("Mostrar configuración actual")
  .action(() => {
    showConfig();
  });

program
  .command("config:reset")
  .description("Eliminar configuración guardada")
  .action(async () => {
    await resetConfig();
  });

program
  .command("save")
  .alias("s")
  .description("Crea una nueva tarea")
  .action(async () => {
    await validateIfExistConfig();
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "Task title",
        name: "title",
      },
      {
        type: "input",
        message: "Task description",
        name: "description",
      },
    ]);

    await addTask(answers);
  });

program
  .command("list")
  .alias("ls")
  .description("Listar todas las tareas creadas")
  .action(async () => {
    await validateIfExistConfig();
    const list = await listTasks();
    console.table(
      list.map((el) => ({
        _id: el._id.toString(),
        title: el.title,
        description: el.description,
      }))
    );
  });

program
  .command("delete")
  .alias("d")
  .description("Eliminar una tarea existente")
  .action(async () => {
    await validateIfExistConfig();
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "Indique Task ID",
        name: "_id",
      },
    ]);

    await deleteTask(answers);
  });

program
  .command("update")
  .alias("u")
  .description("Actualiza una tarea existente")
  .action(async () => {
    await validateIfExistConfig();
    const answers = await inquirer.prompt([
      {
        type: "input",
        message: "Indique Task ID",
        name: "_id",
      },
      {
        type: "input",
        message: "Task title",
        name: "title",
      },
      {
        type: "input",
        message: "Task description",
        name: "description",
      },
    ]);

    await updateTask(answers);
  });

program
  .command("find <term>")
  .alias("f")
  .description("Busca una tarea según el term solicitado")
  .action(async (term) => {
    await validateIfExistConfig();
    const list = await search(term);
    console.table(
      list.map((el) => ({
        _id: el._id.toString(),
        title: el.title,
        description: el.description,
      }))
    );
  });

if (process.argv.length === 2) {
  program.help();
}

program.parse();
