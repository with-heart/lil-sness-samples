export type SampleType =
  | 'bd'
  | 'sd'
  | 'rim'
  | 'cp'
  | 'hh'
  | 'oh'
  | 'cr'
  | 'rd'
  | 'ht'
  | 'mt'
  | 'lt'
  | 'sh'
  | 'cb'
  | 'tb'
  | 'perc'
  | 'fx'
  | 'misc'

export interface Soundfont {
  path: string
  samples: string[]
}

export interface Drumkit extends Soundfont {
  prefix: string
}
