export const BUILTIN_SKILLS = [
  {
    name: "frontend-specialist",
    description: "Frontend development skill with React, TypeScript, and modern CSS",
    fileRegex: "\\.(tsx?|jsx?|css|scss|less)$",
  },
  {
    name: "notebooklm-prompt-gen",
    description: "Generate prompts for NotebookLM",
  },
  {
    name: "skill-share",
    description: "Share skills to Slack",
  },
];

export function getSkillByName(name) {
  return BUILTIN_SKILLS.find((s) => s.name === name);
}

export function getSkillNames() {
  return BUILTIN_SKILLS.map((s) => s.name);
}