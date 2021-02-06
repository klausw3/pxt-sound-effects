function makeWarble () {
    s1 = soundEffects.createSound(soundEffects.waveNumber(WaveType.TunableNoise), 100, 440, 880, 500, 500)
    s2 = soundEffects.createSound(soundEffects.waveNumber(WaveType.TunableNoise), 100, 880, 440, 500, 500)
    soundsequence = soundEffects.createSoundSequence(
    [s1, s2],
    5
    )
    soundsequence.soundAt(8).vol1 = 200
    soundsequence.soundAt(9).vol1 = 200
    soundsequence.soundAt(9).vol1 = 0
    return () => soundsequence.playUntilDone()
}
function makeDetuned () {
    s1 = soundEffects.createSound(soundEffects.waveNumber(WaveType.Sine), 1000, 880, 440, 512, 0)
    s2 = soundEffects.createSound(soundEffects.waveNumber(WaveType.Sine), 1000, 888, 444, 512, 0)
    return soundEffects.createSoundPair(s1, s2)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (soundNumber == 0) {
        warble()
    } else if (soundNumber == 1) {
        detuned.playUntilDone()
    }
    music.stopAllSounds()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    soundNumber += -1
    if (soundNumber < 0) {
        soundNumber = 0
    }
    mySprite.say(names[soundNumber])
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    soundNumber += 1
    if (soundNumber >= names.length) {
        soundNumber = names.length - 1
    }
    mySprite.say(names[soundNumber])
})
function makeExplosion () {
	
}
let s2: SoundBuffer = null
let s1: SoundBuffer = null
let detuned: SoundEffect = null
let names: string[] = []
let soundNumber = 0
let mySprite: Sprite = null
let soundsequence: SoundInstructionSequence = null
let soundeffect = null
let warble: () => void;
let functions: (() => void)[]
game.splash("Sound demo", "Up/down to select, A to play")
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
soundNumber = 0
names = []
warble = makeWarble()
functions.push(makeWarble())
names.push("warble")
detuned = makeDetuned()
names.push("detuned")
