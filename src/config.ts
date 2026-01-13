import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import inquirer from "inquirer";

const TOOL_NAME = ".tasks-cli";
const CONFIG_DIR = path.join(os.homedir(), TOOL_NAME);
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

interface Config {
  MONGODB_URL?: string;
  [key: string]: string | undefined;
}

export function loadConfig(): Config {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      return {};
    }
    const data = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al cargar la configuración:", error);
    return {};
  }
}

export function saveConfig(config: Config): void {
  try {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
  } catch (error) {
    console.error("Error al guardar la configuración:", error);
    process.exit(1);
  }
}

export async function setupConfig(): Promise<void> {
  console.log("🔧 Configuración inicial\n");

  const existingConfig = loadConfig();

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "MONGODB_URL",
      message: "MongoDB URI:",
      default: existingConfig.MONGODB_URL,
      validate: (input: string) => {
        if (input.trim().length === 0) {
          return "MongoDB URI Key es requerido";
        }
        return true;
      },
    },
  ]);

  saveConfig(answers);
  console.log("\n✅ Configuración guardada exitosamente");
  console.log(`📁 Ubicación: ${CONFIG_FILE}\n`);
}

export function ensureConfig(): Config {
  const config = loadConfig();

  const requiredVars = ["MONGODB_URL"];
  const missingVars = requiredVars.filter((varName) => !config[varName]);

  if (missingVars.length > 0) {
    console.error("\n❌ Error: Configuración incompleta o no encontrada");
    console.error("\nVariables faltantes:", missingVars.join(", "));
    console.error("\n💡 Ejecuta el siguiente comando para configurar:");
    console.error("npx tasks-cli config\n");
    process.exit(1);
  }

  return config;
}

export async function resetConfig(): Promise<void> {
  const config = loadConfig();

  if (Object.keys(config).length === 0) {
    console.log("\n⚠️  No hay configuración para eliminar\n");
    return;
  }

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "¿Estás seguro de que quieres eliminar la configuración?",
      default: false,
    },
  ]);

  if (confirm) {
    try {
      fs.unlinkSync(CONFIG_FILE);
      console.log("\n✅ Configuración eliminada exitosamente\n");
    } catch (error) {
      console.error("\n❌ Error al eliminar la configuración:", error, "\n");
    }
  } else {
    console.log("\n❌ Operación cancelada\n");
  }
}

export function showConfig(): void {
  const config = loadConfig();

  if (Object.keys(config).length === 0) {
   'Error: ⚠️  No hay configuración guardada ejecuta primero "cli-tasks config"';
    return;
  }

  console.log("\n📋 Configuración actual:\n");

  Object.entries(config).forEach(([key, value]) => {
    const isSensitive =
      key.toLowerCase().includes("key") ||
      key.toLowerCase().includes("secret") ||
      key.toLowerCase().includes("password");

    const displayValue =
      isSensitive && value
        ? "****" + value.slice(-4)
        : value || "(no configurado)";

    console.log(`${key}: ${displayValue}`);
  });

  console.log(`\n📁 Archivo: ${CONFIG_FILE}\n`);
}
