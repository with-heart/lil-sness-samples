import * as p from 'node:path'
import { KEY_PREFIX } from './constants'

export function pathToKey(path: string): string {
  path = path.toLowerCase()
  const filename = p.basename(path, p.extname(path))

  switch (filename) {
    case 'square (1_8)':
      return prefix('square1')
    case 'square (1_4)':
      return prefix('square2')
    case 'square (1_2)':
      return prefix('square3')
    default:
      return prefix(
        filename
          .replaceAll(/[\s|\p{P}]+/gu, '_')
          .replaceAll(/[-_](\d+)/g, '$1'),
      )
  }
}

function prefix(string: string): string {
  return `${KEY_PREFIX}_${string}`
}
