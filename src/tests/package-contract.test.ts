import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const packageJson = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));

describe("fork package contract", () => {
   it("keeps fork identity and patched KaTeX dependency explicit", () => {
      expect(packageJson.name).toBe("@jecruz/mini-lit");
      expect(packageJson.version).toBe("0.2.2");
      expect(packageJson.repository.url).toBe("git+https://github.com/jecruz/mini-lit.git");
      expect(packageJson.dependencies.katex).toBe("^0.18.2");
      expect(packageJson.scripts.prepare).toMatch(/npm run build/);
   });

   it("does not include compiled tests in the npm package", () => {
      const cache = mkdtempSync(join(tmpdir(), "mini-lit-pack-contract-"));
      try {
         const packed = execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
            cwd: new URL("../../", import.meta.url),
            encoding: "utf8",
            env: { ...process.env, NPM_CONFIG_CACHE: cache },
         });
         const [{ files }] = JSON.parse(packed);
         const paths = files.map(({ path }: { path: string }) => path);
         expect(paths).toContain("dist/index.js");
         expect(paths).toContain("dist/index.d.ts");
         expect(paths.filter((path: string) => path.startsWith("dist/tests/") || /\.test\.[^/]+$/.test(path))).toEqual(
            [],
         );
      } finally {
         rmSync(cache, { recursive: true, force: true });
      }
   });
});
