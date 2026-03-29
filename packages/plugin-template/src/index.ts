import { definePlugin, tool } from "@kilocode/plugin";
import { z } from "zod";

export { tool, definePlugin };

export const exampleTool = tool({
  name: "example",
  description: "An example tool demonstrating @kilocode/plugin usage",
  parameters: z.object({
    message: z.string().describe("Message to display"),
    count: z.number().optional().default(1).describe("Number of times to repeat"),
  }),
  execute: async ({ message, count }) => {
    return Array(count).fill(message).join(" ");
  },
});

export const examplePlugin = definePlugin({
  name: "example-plugin",
  version: "1.0.0",
  description: "Example plugin for Kilo Code",
  tools: [exampleTool],
});

export default examplePlugin;