import { $ } from 'bun'

await Promise.all([$`bun run build:strudel`, $`bun run build:instruments`])
