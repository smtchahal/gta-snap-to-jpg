# gta-snap-to-jpg

## After making changes

Always fix ESLint and TypeScript issues in affected files before finishing:

```sh
npx tsc --noEmit
npx eslint <changed files>
```

## Testing & coverage

All new code must have 100% test coverage. After writing tests, verify with:

```sh
npx vitest run --coverage
```

If 100% coverage cannot be achieved for a specific file or branch, clearly communicate to the user:
- What was attempted
- What remains uncovered and on which line(s)
- Why it cannot be covered (e.g. virtual module boundary, browser-only API, unreachable defensive branch)
