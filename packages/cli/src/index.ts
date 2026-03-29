import { fileURLToPath } from "node:url";
import { Client } from "@kilocode/sdk/client";

export interface ModeConfig {
  slug: string;
  name: string;
  description: string;
  roleDefinition: string;
  customInstructions?: string;
  groups?: string[];
  subagents?: string[];
}

export interface SkillConfig {
  name: string;
  description: string;
  fileRegex?: string;
  triggerPatterns?: string[];
}

export class KiloCLI {
  private client: Client | null = null;
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.KILO_API_KEY;
  }

  async connect(): Promise<void> {
    if (!this.apiKey) {
      throw new Error("KILO_API_KEY is required. Set via constructor or env.");
    }
    this.client = new Client({ apiKey: this.apiKey });
  }

  async listModes(): Promise<ModeConfig[]> {
    const modes: ModeConfig[] = [];
    try {
      const response = await this.client?.listModes();
      if (response?.data) {
        modes.push(...response.data);
      }
    } catch (error) {
      console.error("Failed to list modes:", error);
    }
    return modes;
  }

  async createMode(mode: ModeConfig): Promise<ModeConfig | null> {
    try {
      const response = await this.client?.createMode({
        slug: mode.slug,
        name: mode.name,
        description: mode.description,
        roleDefinition: mode.roleDefinition,
        customInstructions: mode.customInstructions,
        groups: mode.groups,
        subagents: mode.subagents,
      });
      return response?.data || null;
    } catch (error) {
      console.error("Failed to create mode:", error);
      return null;
    }
  }

  async updateMode(slug: string, mode: Partial<ModeConfig>): Promise<ModeConfig | null> {
    try {
      const response = await this.client?.updateMode(slug, mode);
      return response?.data || null;
    } catch (error) {
      console.error("Failed to update mode:", error);
      return null;
    }
  }

  async deleteMode(slug: string): Promise<boolean> {
    try {
      await this.client?.deleteMode(slug);
      return true;
    } catch (error) {
      console.error("Failed to delete mode:", error);
      return false;
    }
  }

  async listSkills(): Promise<SkillConfig[]> {
    const skills: SkillConfig[] = [];
    try {
      const response = await this.client?.listSkills();
      if (response?.data) {
        skills.push(...response.data);
      }
    } catch (error) {
      console.error("Failed to list skills:", error);
    }
    return skills;
  }

  async createSkill(skill: SkillConfig): Promise<SkillConfig | null> {
    try {
      const response = await this.client?.createSkill(skill);
      return response?.data || null;
    } catch (error) {
      console.error("Failed to create skill:", error);
      return null;
    }
  }

  async deleteSkill(name: string): Promise<boolean> {
    try {
      await this.client?.deleteSkill(name);
      return true;
    } catch (error) {
      console.error("Failed to delete skill:", error);
      return false;
    }
  }
}

export async function main() {
  const cli = new KiloCLI();
  
  console.log("Kilo CLI Tools");
  console.log("===============");
  
  if (!process.env.KILO_API_KEY) {
    console.log("\nNote: Set KILO_API_KEY env var to use SDK features.");
    console.log("Available commands:");
    console.log("  kilo-toolkit modes list    - List all modes");
    console.log("  kilo-toolkit modes create  - Create a new mode");
    console.log("  kilo-toolkit skills list   - List all skills");
    return;
  }

  await cli.connect();
  
  console.log("\nConnected to Kilo API");
  console.log("Available modes:", await cli.listModes());
  console.log("Available skills:", await cli.listSkills());
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  main();
}