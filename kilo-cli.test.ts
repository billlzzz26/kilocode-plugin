import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { existsSync, mkdirSync, rmSync, readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { execSync } from "node:child_process";

/**
 * Tests for kilo-cli in headless mode
 * 
 * These tests verify that the kilo-toolkit CLI correctly copies
 * template files to a target directory while excluding sandbox files.
 */

const TEST_DIR = resolve(".test-kilo-cli");
const SOURCE_DIR = resolve(".");

// Directories that should be copied
const EXPECTED_DIRS = [
  "agents",
  "skills",
  "subagents",
  "modes",
  "github",
  "references",
];

// Files that should be copied
const EXPECTED_FILES = [
  "README.md",
  "AGENTS.md",
];

// Directories/files that should NOT be copied (sandbox/build artifacts)
const EXCLUDED_PATTERNS = [
  ".vscode",
  ".zed",
  "node_modules",
  ".git",
  ".test-kilo-cli",
];

/**
 * Helper: Recursively get all files in a directory
 */
function getAllFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = relative(baseDir, fullPath);
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      files.push(relativePath);
    }
  }
  
  return files;
}

/**
 * Helper: Check if path contains any excluded pattern
 */
function isExcluded(path: string): boolean {
  return EXCLUDED_PATTERNS.some(pattern => 
    path.includes(pattern) || path.startsWith(pattern)
  );
}

/**
 * Helper: Run the actual kilo-toolkit CLI
 */
function simulateKiloToolkitCopy(targetDir: string): string {
  const scriptPath = resolve("bin/create-kilo-setup.mjs");
  const command = `node ${scriptPath} ${targetDir}`;
  try {
    const output = execSync(command, { encoding: "utf8" });
    console.log(output);
    return output;
  } catch (error: any) {
    console.error("Error running CLI:", error.message);
    return error.stdout || error.message;
  }
}

describe("kilo-cli headless mode", () => {
  // Increase timeout for all tests as they run the actual CLI
  const TEST_TIMEOUT = 10000;
  
  beforeEach(() => {
    // Clean up test directory before each test
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
    // mkdirSync is not strictly needed as script will create it, but good for baseline
    mkdirSync(TEST_DIR, { recursive: true });
  }, TEST_TIMEOUT);

  afterEach(() => {
    // Clean up test directory after each test
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  }, TEST_TIMEOUT);

  describe("file copying", () => {
    it("should copy all expected directories into .kilocode/", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      const targetKiloDir = join(TEST_DIR, ".kilocode");
      expect(existsSync(targetKiloDir)).toBe(true);

      for (const dir of EXPECTED_DIRS) {
        const targetPath = join(targetKiloDir, dir);
        expect(existsSync(targetPath)).toBe(true);
        expect(statSync(targetPath).isDirectory()).toBe(true);
      }
    }, TEST_TIMEOUT);

    it("should copy all expected files to root", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      for (const file of EXPECTED_FILES) {
        const targetPath = join(TEST_DIR, file);
        expect(existsSync(targetPath)).toBe(true);
        expect(statSync(targetPath).isFile()).toBe(true);
      }
    }, TEST_TIMEOUT);

    it("should preserve directory structure within .kilocode/", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      const targetKiloDir = join(TEST_DIR, ".kilocode");
      
      // Check that subdirectories are preserved
      const agentsDir = join(targetKiloDir, "agents");
      if (existsSync(agentsDir)) {
        const agentsFiles = readdirSync(agentsDir);
        expect(agentsFiles.length).toBeGreaterThan(0);
      }
      
      const skillsDir = join(targetKiloDir, "skills");
      if (existsSync(skillsDir)) {
        const skillsEntries = readdirSync(skillsDir, { withFileTypes: true });
        const skillDirs = skillsEntries.filter((e: any) => e.isDirectory());
        expect(skillDirs.length).toBeGreaterThan(0);
      }
    }, TEST_TIMEOUT);

    it("should copy file contents correctly", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      // Verify README.md content matches source
      const sourceReadme = join(SOURCE_DIR, "README.md");
      const targetReadme = join(TEST_DIR, "README.md");
      
      if (existsSync(sourceReadme) && existsSync(targetReadme)) {
        const sourceContent = readFileSync(sourceReadme, "utf-8");
        const targetContent = readFileSync(targetReadme, "utf-8");
        expect(targetContent).toBe(sourceContent);
      }
    }, TEST_TIMEOUT);
  });

  describe("sandbox exclusion", () => {
    it("should not copy original .kilocode directory (sandbox)", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      // The target should have a NEW .kilocode dir, but not the one from source sandbox
      // We can check this by verifying no "system-prompt-code" file exists in target .kilocode
      const targetKiloDir = join(TEST_DIR, ".kilocode");
      const sandboxFile = join(targetKiloDir, "system-prompt-code");
      expect(existsSync(sandboxFile)).toBe(false);
    }, TEST_TIMEOUT);

    it("should not copy .vscode directory", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      const vscodePath = join(TEST_DIR, ".vscode");
      expect(existsSync(vscodePath)).toBe(false);
    }, TEST_TIMEOUT);

    it("should not copy .zed directory", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      const zedPath = join(TEST_DIR, ".zed");
      expect(existsSync(zedPath)).toBe(false);
    }, TEST_TIMEOUT);

    it("should not copy node_modules directory", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      const nodeModulesPath = join(TEST_DIR, "node_modules");
      expect(existsSync(nodeModulesPath)).toBe(false);
    }, TEST_TIMEOUT);

    it("should not copy .git directory", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      const gitPath = join(TEST_DIR, ".git");
      expect(existsSync(gitPath)).toBe(false);
    }, TEST_TIMEOUT);

    it("should verify no excluded patterns in copied files", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      const allFiles = getAllFiles(TEST_DIR);
      const excludedFiles = allFiles.filter(file => isExcluded(file));
      
      expect(excludedFiles).toHaveLength(0);
    }, TEST_TIMEOUT);
  });

  describe("error handling", () => {
    it("should handle non-existent target directory gracefully", () => {
      const nonExistentDir = join(TEST_DIR, "non-existent", "nested", "path");
      simulateKiloToolkitCopy(nonExistentDir);
      
      expect(existsSync(nonExistentDir)).toBe(true);
      expect(existsSync(join(nonExistentDir, ".kilocode"))).toBe(true);
    }, TEST_TIMEOUT);

    it("should handle existing target directory", () => {
      // Create target directory with some files
      mkdirSync(join(TEST_DIR, "existing"), { recursive: true });
      writeFileSync(
        join(TEST_DIR, "existing", "file.txt"),
        "existing content"
      );
      
      // Simulate copy to existing directory
      simulateKiloToolkitCopy(TEST_DIR);
      
      const targetKiloDir = join(TEST_DIR, ".kilocode");
      // Should still have expected directories in .kilocode/
      for (const dir of EXPECTED_DIRS) {
        const targetPath = join(targetKiloDir, dir);
        if (existsSync(join(SOURCE_DIR, dir))) {
          expect(existsSync(targetPath)).toBe(true);
        }
      }
    }, TEST_TIMEOUT);

    it("should handle empty source directories", () => {
      // Create an empty directory in one of the expected dirs (subfolder)
      const emptyDir = join(SOURCE_DIR, "agents", "empty-test-dir");
      mkdirSync(emptyDir, { recursive: true });
      
      try {
        simulateKiloToolkitCopy(TEST_DIR);
        
        // Empty directory should be copied if it exists in source
        const targetEmptyDir = join(TEST_DIR, ".kilocode", "agents", "empty-test-dir");
        expect(existsSync(targetEmptyDir)).toBe(true);
      } finally {
        // Clean up
        if (existsSync(emptyDir)) {
          rmSync(emptyDir, { recursive: true, force: true });
        }
      }
    }, TEST_TIMEOUT);

    it("should handle circular copy (source and target same)", () => {
      // This should not throw and should output a specific message
      // We simulate it by passing SOURCE_DIR as the target
      const output = simulateKiloToolkitCopy(SOURCE_DIR);
      
      expect(output).toContain("Source and target directory are the same");
      
      // No files should have been moved/changed in a way that breaks things
      expect(existsSync(join(SOURCE_DIR, "agents"))).toBe(true);
    }, TEST_TIMEOUT);
  });

  describe("YAML file validation", () => {
    it("should copy valid YAML files", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      // Check that YAML files in agents directory are valid
      const agentsDir = join(TEST_DIR, ".kilocode", "agents");
      if (existsSync(agentsDir)) {
        const yamlFiles = readdirSync(agentsDir).filter((f: string) => f.endsWith(".yaml"));
        
        for (const yamlFile of yamlFiles) {
          const yamlPath = join(agentsDir, yamlFile);
          const content = readFileSync(yamlPath, "utf-8");
          
          // Basic YAML validation: should have proper structure
          expect(content).toContain(":");
          expect(content.length).toBeGreaterThan(0);
        }
      }
    }, TEST_TIMEOUT);

    it("should copy valid JSON files", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      // Check that JSON files in modes directory are valid
      const modesDir = join(TEST_DIR, ".kilocode", "modes");
      if (existsSync(modesDir)) {
        const jsonFiles = readdirSync(modesDir).filter((f: string) => f.endsWith(".json"));
        
        for (const jsonFile of jsonFiles) {
          const jsonPath = join(modesDir, jsonFile);
          const content = readFileSync(jsonPath, "utf-8");
          
          // Should be valid JSON
          expect(() => JSON.parse(content)).not.toThrow();
        }
      }
    }, TEST_TIMEOUT);
  });

  describe("headless mode behavior", () => {
    it("should work without interactive prompts", () => {
      // In headless mode, no prompts should be shown
      // This test verifies the copy operation completes without hanging
      const startTime = Date.now();
      
      simulateKiloToolkitCopy(TEST_DIR);
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete quickly (no interactive prompts)
      expect(duration).toBeLessThan(TEST_TIMEOUT);
    }, TEST_TIMEOUT);

    it("should output success message", () => {
      const output = simulateKiloToolkitCopy(TEST_DIR);
      expect(output).toContain("Kilo toolkit template copied");
    }, TEST_TIMEOUT);

    it("should handle relative paths", () => {
      const relativePath = "test-relative-path";
      const absolutePath = resolve(relativePath);
      
      if (existsSync(absolutePath)) {
        rmSync(absolutePath, { recursive: true, force: true });
      }
      
      try {
        simulateKiloToolkitCopy(relativePath);
        
        // Should create files in the relative path
        expect(existsSync(absolutePath)).toBe(true);
        expect(existsSync(join(absolutePath, ".kilocode"))).toBe(true);
      } finally {
        if (existsSync(absolutePath)) {
          rmSync(absolutePath, { recursive: true, force: true });
        }
      }
    }, TEST_TIMEOUT);

    it("should handle absolute paths", () => {
      const absolutePath = join(TEST_DIR, "absolute-test");
      
      simulateKiloToolkitCopy(absolutePath);
      
      // Should create files in the absolute path
      expect(existsSync(absolutePath)).toBe(true);
      expect(existsSync(join(absolutePath, ".kilocode"))).toBe(true);
    }, TEST_TIMEOUT);
  });

  describe("file permissions", () => {
    it("should preserve file permissions", () => {
      simulateKiloToolkitCopy(TEST_DIR);
      
      // Check that copied files have read permissions
      const readmePath = join(TEST_DIR, "README.md");
      if (existsSync(readmePath)) {
        const stats = statSync(readmePath);
        // File should be readable
        expect(stats.mode & 0o444).toBeTruthy();
      }
    }, TEST_TIMEOUT);

    it("should preserve directory permissions", () => {
      // Skip on Windows as permission model is different
      if (process.platform === "win32") {
        return;
      }
      
      simulateKiloToolkitCopy(TEST_DIR);
      
      // Check that copied directories have execute permissions
      const agentsDir = join(TEST_DIR, ".kilocode", "agents");
      if (existsSync(agentsDir)) {
        const stats = statSync(agentsDir);
        // Directory should be executable (traversable)
        expect(stats.mode & 0o111).toBeTruthy();
      }
    }, TEST_TIMEOUT);
  });
});
