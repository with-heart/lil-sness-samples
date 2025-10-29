import { describe, expect, test } from 'bun:test'
import { sampleToSampleType } from './sample'
import type { SampleType } from './types'

describe('sampleToSampleType', () => {
  const wav = (basename: string) => `samples/${basename}.wav`
  test.each<[path: string, expected: SampleType]>([
    [wav('kick'), 'bd'],
    [wav('snare'), 'sd'],
    [wav('rim'), 'rim'],
    [wav('clap'), 'cp'],
    [wav('openhihat'), 'oh'],
    [wav('hihat'), 'hh'],
    [wav('crash'), 'cr'],
    [wav('splash'), 'cr'],
    [wav('chinese'), 'cr'],
    [wav('ride'), 'rd'],
    [wav('lowtom'), 'lt'],
    [wav('hightom'), 'ht'],
    [wav('cabasa'), 'sh'],
    [wav('maraca'), 'sh'],
    [wav('cowbell'), 'cb'],
    [wav('tambourine'), 'tb'],
    [wav('timb'), 'perc'],
    [wav('timp'), 'perc'],
    [wav('guiro'), 'perc'],
    [wav('wood'), 'perc'],
    [wav('whistle'), 'perc'],
    [wav('noise'), 'fx'],
    [wav('water'), 'fx'],
    [wav('violin'), 'misc'],
    [wav('triangle'), 'misc'],
    [wav('voice'), 'misc'],
  ])('"%s" -> "%s"', (path, expected) => {
    expect(sampleToSampleType(path)).toBe(expected)
  })
})
