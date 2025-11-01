import { WaveFileReader } from 'wavefile-reader'

export interface WavLoopData {
  loopBegin?: number
  loopEnd?: number
}

interface Wav {
  data: {
    samples: []
  }
  fmt: {
    bitsPerSample: number
  }
  smpl: {
    dwNumSampleLoops: number
    loops: {
      dwStart: number
      dwEnd: number
    }[]
  }
}

export async function readWavLoopData(path: string): Promise<{
  loopBegin?: number
  loopEnd?: number
}> {
  const buffer = await Bun.file(path).bytes()
  const wav = new WaveFileReader(buffer) as Wav

  if (wav.smpl.dwNumSampleLoops === 0) {
    return {}
  }

  const bytesPerSample = wav.fmt.bitsPerSample / 8
  const samples = wav.data.samples
  const totalFrames = samples.length / bytesPerSample

  const loop = wav.smpl.loops[0]

  const loopBegin = loop!.dwStart / totalFrames
  const loopEnd = loop!.dwEnd / totalFrames

  return { loopBegin, loopEnd }
}
