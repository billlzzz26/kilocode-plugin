import type { ModeConfig } from "./index";

export const BUILTIN_MODES: ModeConfig[] = [
  {
    slug: "code-reviewer",
    name: "🔍 Code Reviewer",
    description: "Senior engineer mode for thorough code reviews",
    roleDefinition: "You are a senior software engineer conducting thorough code reviews.",
    customInstructions: "Provide constructive feedback on code patterns, potential bugs, security issues, and improvement opportunities.",
    groups: ["read", "browser"],
  },
  {
    slug: "docs-specialist",
    name: "📝 Documentation Specialist",
    description: "Technical writing mode for clear docs",
    roleDefinition: "You are a technical writing expert specializing in clear, comprehensive documentation.",
    customInstructions: "Focus on clarity, proper formatting, and comprehensive examples.",
    groups: ["read", "command"],
  },
  {
    slug: "frontend-specialist",
    name: "🎨 Frontend Specialist",
    description: "Frontend expert (React, TypeScript, CSS)",
    roleDefinition: "You are a frontend developer expert in React, TypeScript, and modern CSS.",
    customInstructions: "Prioritize accessibility, responsive design, and performance.",
    groups: ["read", "browser"],
  },
  {
    slug: "test-engineer",
    name: "🧪 Test Engineer",
    description: "QA-focused mode for automated tests",
    roleDefinition: "You are a QA engineer and testing specialist.",
    customInstructions: "Prioritize test readability, comprehensive edge cases, and clear assertion messages.",
    groups: ["read", "command"],
  },
  {
    slug: "education",
    name: "📚 Education",
    description: "Educational commenting for learning",
    roleDefinition: "You are an expert educator and technical writer.",
    groups: ["read", "edit", "browser", "command"],
  },
  {
    slug: "kilo-settings-assistant",
    name: "⚙️ Kilo Settings Assistant",
    description: "Kilo Code configuration helper",
    roleDefinition: "You are an expert assistant for configuring and troubleshooting Kilo Code.",
    groups: ["read", "browser"],
  },
  {
    slug: "orchestrator",
    name: "🎯 Orchestrator",
    description: "Coordination mode with Prompt Architect subagent",
    roleDefinition: "You are an orchestrator that coordinates tasks across different domains.",
    groups: ["read", "edit", "command", "browser"],
    subagents: ["prompt-architect"],
  },
  {
    slug: "session-learner",
    name: "🧠 Session Learner",
    description: "Session history analysis",
    roleDefinition: "You are a learning and reflection expert.",
    groups: ["read"],
  },
];

export function getModeBySlug(slug: string): ModeConfig | undefined {
  return BUILTIN_MODES.find((m) => m.slug === slug);
}

export function getModeNames(): string[] {
  return BUILTIN_MODES.map((m) => m.slug);
}

export { type ModeConfig };