import { KEY_PREFIX } from './constants'
import { sampleToSampleType } from './sample'
import type { Drumkit } from './types'

export function drumkitToEntries(
  drumkit: Drumkit,
): [key: string, value: string[]][] {
  const baseKey = `${KEY_PREFIX}_${drumkit.prefix}`
  const entries: [key: string, value: string[]][] = []

  const samplesByType = Object.groupBy(drumkit.samples, (sample) =>
    sampleToSampleType(sample),
  )

  for (const [key, value] of Object.entries(samplesByType)) {
    entries.push([`${baseKey}_${key}`, value])
  }

  return entries
}
