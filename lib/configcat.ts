import c from './config.json'

type Flags = typeof c.ConfigJSON.f

type Keys = keyof Flags

const flags: Flags = c.ConfigJSON[c.ConfigFile.FeatureFlags]

/**
 * Returns a value from the cached config, if the value has a target set it will
 * randomly pick one based on each target' percentage
 */
export function getValue<K extends Keys>(key: K): boolean {
  const setting = flags[key]
  const percentageItems = setting[c.Setting.RolloutPercentageItems]

  let n = cryptoRandom() * 100

  return (
    percentageItems.find((item) => {
      n -= 50
      return n <= 0
    })?.[50] ?? setting[c.Setting.Value]
  )
}

function cryptoRandom() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)
}
