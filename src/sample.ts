import type { SampleType } from './types'

export function sampleToSampleType(sample: string): SampleType {
  switch (true) {
    case sample.includes('kick'):
      return 'bd'
    case sample.includes('snare'):
      return 'sd'
    case sample.includes('rim'):
      return 'rim'
    case sample.includes('clap'):
      return 'cp'
    case sample.includes('openhihat'):
      return 'oh'
    case sample.includes('hihat'):
      return 'hh'
    case sample.includes('crash'):
    case sample.includes('splash'):
    case sample.includes('chinese'):
      return 'cr'
    case sample.includes('ride'):
      return 'rd'
    case sample.includes('tom') && sample.includes('low'):
      return 'lt'
    case sample.includes('tom') && sample.includes('high'):
      return 'ht'
    case sample.includes('cabasa'):
    case sample.includes('maraca'):
      return 'sh'
    case sample.includes('cowbell'):
      return 'cb'
    case sample.includes('tamb'):
      return 'tb'
    case sample.includes('timb'):
    case sample.includes('timp'):
    case sample.includes('guiro'):
    case sample.includes('wood'):
    case sample.includes('whistle'):
      return 'perc'
    case sample.includes('noise'):
    case sample.includes('water'):
      return 'fx'
    default:
      return 'misc'
  }
}
