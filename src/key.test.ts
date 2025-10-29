import { describe, expect, test } from 'bun:test'
import { pathToKey } from './key'

describe('pathToKey', () => {
  test.each<[path: string, expected: string]>([
    ['soundfonts/Accordion.sfz', 'snes_accordion'],
    // space
    ['soundfonts/Accoustic Bass.sfz', 'snes_accoustic_bass'],
    // spaces w symbol
    ['soundfonts/Bass & Lead', 'snes_bass_lead'],
    // space then number
    ['soundfonts/Crash Cymbal 1', 'snes_crash_cymbal1'],
    // double spaces
    ['soundfonts/E  Piano 1.sfz', 'snes_e_piano1'],
    // hard-coded cases
    ['soundfonts/Square (1_8)', 'snes_square1'],
    ['soundfonts/Square (1_4)', 'snes_square2'],
    ['soundfonts/Square (1_2)', 'snes_square3'],
    // dash then number
    ['soundfonts/Whistle-1.sfz', 'snes_whistle1'],
  ])(`"%s" -> "%s"`, (path, expected) => {
    expect(pathToKey(path)).toBe(expected)
  })
})
