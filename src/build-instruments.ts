import { readSoundfonts } from './fs'
import { pathToKey } from './key'
import { readWavLoopData } from './wav'

const defineInstrument = (key: string, loopBegin: number, loopEnd: number) =>
  `const ${key} = s("${key}").loopBegin(${loopBegin}).loopEnd(${loopEnd}).loop(1)`

const { soundfonts } = await readSoundfonts()

const instruments: string[] = []

for (const soundfont of soundfonts.toSorted((a, b) =>
  pathToKey(a.path).localeCompare(pathToKey(b.path)),
)) {
  const key = pathToKey(soundfont.path)
  const { loopBegin, loopEnd } = await readWavLoopData(soundfont.samples[0]!)

  if (loopBegin && loopEnd) {
    const instrument = defineInstrument(key, loopBegin, loopEnd)
    instruments.push(instrument)
  }
}

await Bun.write(Bun.file('instruments'), instruments.join('\n'))
