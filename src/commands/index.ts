import { Command } from "commander";
import inquirer from "inquirer";
import {
  addTask,
  deleteTask,
  listTasks,
  search,
  updateTask,
} from "../controllers/task.controller.ts";

const program = new Command();

program.version("0.0.1").description("A command line tool for managing");

program
  .command("save")
  .alias("s")
  .action(async () => {
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
  .action(async () => {
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
  .action(async () => {
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
  .action(async () => {
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
  .action(async (term) => {
    const list = await search(term);
    console.table(
      list.map((el) => ({
        _id: el._id.toString(),
        title: el.title,
        description: el.description,
      }))
    );
  });

program.parse(process.argv);
