import { drumKitPathRe, sampleEntryRe } from './re'
import type { Drumkit, Soundfont } from './types'

const sfzGlob = new Bun.Glob('**/*.sfz')
const sampleGlob = new Bun.Glob('**/*.wav')

export async function readSoundfonts(): Promise<{
  soundfonts: Soundfont[]
  drumkits: Drumkit[]
}> {
  const drumkits: Drumkit[] = []
  const soundfonts: Soundfont[] = []

  for await (const path of sfzGlob.scan('.')) {
    const file = Bun.file(path)
    const text = await file.text()

    const samples = new Set<string>()
    const matches = text.matchAll(sampleEntryRe)
    for (const match of matches) {
      const sample = match[1]
      if (sample) {
        const normalizedSample = sample.replace('\\', '/')
        samples.add(normalizedSample)
      }
    }

    const soundfont: Soundfont = {
      path,
      samples: Array.from(samples),
    }

    const match = path.match(drumKitPathRe)
    if (match && match[1]) {
      drumkits.push({
        ...soundfont,
        prefix: match[1].toLowerCase(),
      })
      continue
    }

    soundfonts.push(soundfont)
  }

  return { drumkits, soundfonts }
}

export async function readSamplePaths(): Promise<string[]> {
  return Array.fromAsync(sampleGlob.scan('.'))
}
