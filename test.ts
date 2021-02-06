function testSoundEffects() {
    let sfx = soundEffects.createSound(WaveType.Square50, 1000, 440, 440)
    sfx.play()
    sfx.freq1 = sfx.freq0 * 2
    sfx.wave = WaveType.Sawtooth
    sfx.playUntilDone()

    sfx.loop()
    pause(100)
    sfx.stop()

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

/*
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    soundeffect.stop()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    soundeffect.freq0 = soundeffect.freq0 * 1.02
    soundeffect.freq1 = soundeffect.freq0
})
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    soundeffect.freq0 = soundeffect.freq0 * 1.02
    soundeffect.freq1 = soundeffect.freq0
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    soundeffect.loop()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    soundeffect.freq0 = soundeffect.freq0 / 1.02
    soundeffect.freq1 = soundeffect.freq0
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    soundeffect.freq0 = soundeffect.freq0 / 1.02
    soundeffect.freq1 = soundeffect.freq0
})
let soundeffect: SoundBuffer = null
soundeffect = soundEffects.createSound(WaveType.Cycle16, 200, 110, 110, 100, 100)
*/