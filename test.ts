let sfx = soundEffects.createSound(WaveType.Square50, 1000, 440, 440)
sfx.play()
sfx.freq1 = sfx.freq0 * 2
sfx.wave = WaveType.Sawtooth
sfx.playUntilDone()

let waves: number[] = []
waves = [
soundEffects.waveNumber(WaveType.Triangle),
soundEffects.waveNumber(WaveType.Sawtooth),
soundEffects.waveNumber(WaveType.Sine),
soundEffects.waveNumber(WaveType.WhiteNoise),
soundEffects.waveNumber(WaveType.Square10),
soundEffects.waveNumber(WaveType.Square30),
soundEffects.waveNumber(WaveType.Square50),
soundEffects.waveNumber(WaveType.Cycle16),
soundEffects.waveNumber(WaveType.Cycle32),
soundEffects.waveNumber(WaveType.Cycle64),
soundEffects.waveNumber(WaveType.TunableNoise)
]