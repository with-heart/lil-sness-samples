import { expect, test } from 'bun:test'
import { drumkitToEntries } from './drumkit'
import type { Drumkit } from './types'

test('drumkitToEntries', () => {
  const drumkit: Drumkit = {
    path: 'soundfonts/Standard Drum Kit.sfz',
    samples: [
      'samples/kick.wav',
      'samples/snare.wav',
      'samples/rim.wav',
      'samples/hihat.wav',
    ],
    prefix: 'standard',
  }

  expect(drumkitToEntries(drumkit)).toEqual([
    ['snes_standard_bd', ['samples/kick.wav']],
    ['snes_standard_sd', ['samples/snare.wav']],
    ['snes_standard_rim', ['samples/rim.wav']],
    ['snes_standard_hh', ['samples/hihat.wav']],
  ])
})
