controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    tunableSound.freq0 = tunableSound.freq0 * 1.05946309436
    tunableSound.freq1 = tunableSound.freq0
    tunableSound.play()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    soundeffect = soundEffects.createSound(WaveType.Cycle32, 1000, 440, 220)
    soundeffect.playUntilDone()
    soundeffect.freq1 = 880
    soundeffect.playUntilDone()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    soundEffects.createSound(WaveType.Noise, 1000, 1000, 0).play()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    tunableSound.freq1 = tunableSound.freq1 / 1.41421356237
    tunableSound.play()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    tunableSound.freq1 = tunableSound.freq1 * 1.41421356237
    tunableSound.play()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    tunableSound.freq0 = tunableSound.freq0 / 1.05946309436
    tunableSound.freq1 = tunableSound.freq0
    tunableSound.play()
})
let soundeffect: SoundBuffer = null
let tunableSound: SoundBuffer = null
scene.setBackgroundColor(6)
game.splash("Press buttons or move stick to test sounds")
tunableSound = soundEffects.createSound(WaveType.Cycle16, 1000, 440, 440)
