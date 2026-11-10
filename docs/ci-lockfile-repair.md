# Linux CI lockfile repair

The reported GitHub Actions failure occurs at `npm ci`, before lint or build.
The lockfile was missing the root entries for `@emnapi/runtime@1.11.3` and
`@emnapi/core@1.11.3`, referenced by optional WASM/native dependency trees.

Regenerated the lockfile from an isolated manifest/lockfile copy with no existing
node_modules, using the official Linux `node:22-bookworm-slim` image to match
the workflow's Node 22. This restored the missing entries and bundled WASM
metadata. No existing dependency version was changed and package.json is
unchanged. The workflow still uses `npm ci`; it was not weakened to install an
unlocked dependency tree.

`npm ci --ignore-scripts --dry-run --no-audit --no-fund` passed under Node 22 /
npm 10.9.9 on Linux. The actual install/lint/build verification is recorded below.
No production secrets or .env files were copied into the isolated check.

Final verification passed in a fresh Linux/Node 22 container using the repaired
lockfile: `npm ci --no-audit --no-fund` installed successfully, `npm run lint`
passed, and the exact default `npm run build` (Turbopack, Next.js 16.4.6) passed
including TypeScript and 17 static outputs. These are local CI-equivalent checks;
no remote GitHub Actions rerun or deployment was performed by this session.
