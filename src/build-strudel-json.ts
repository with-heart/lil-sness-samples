import { KEY_PREFIX, BASE_URL } from './constants'
import { drumkitToEntries } from './drumkit'
import { readSamplePaths, readSoundfonts } from './fs'
import { pathToKey } from './key'
import { sampleToSampleType } from './sample'

const { soundfonts, drumkits } = await readSoundfonts()
const samples = await readSamplePaths()

let json: {
  [key: string]: string[]
} = {}

for (const sample of samples) {
  let type = sampleToSampleType(sample)
  if (type === 'misc') continue

  const key = `${KEY_PREFIX}_${type}`

  if (!json[key]) json[key] = []
  json[key].push(sample)
}

for (const drumkit of drumkits) {
  json = {
    ...json,
    ...Object.fromEntries(drumkitToEntries(drumkit)),
  }
}

for (const soundfont of soundfonts) {
  const key = pathToKey(soundfont.path)
  json[key] = soundfont.samples
}

await Bun.write(
  Bun.file('strudel.json'),
  JSON.stringify({
    _base: BASE_URL,
    ...json,
  }),
)
