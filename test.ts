function runSoundTest() {
    console.log("Test running")

    let s1 = soundEffects.createSound(WaveType.Cycle16, 1000, 4000, 2000, 256, 512)
    let s2 = soundEffects.createSound(WaveType.TunableNoise, 1000, 440, 110, 512, 0)

    s1.playUntilDone()
    s2.playUntilDone()

    let combined = soundEffects.createSoundSequence([s1, s2])
    combined.playUntilDone()
    combined.playUntilDone()

    /*
    let sfx = soundEffects.createSound(WaveType.Square50, 1000, 440, 440)
    sfx.playUntilDone()
    sfx.freq1 = sfx.freq0 * 2
    sfx.wave = WaveType.Sawtooth
    sfx.play()
    */

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
}

// runSoundTest()