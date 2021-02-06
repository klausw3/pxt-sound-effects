namespace music {
    //% shim=music::queuePlayInstructions
    export function playInstructions(timeDelta: number, buf: Buffer) { }
}
const enum WaveType {
    //% block="triangle"
    Triangle = 1,
    //% block="sawtooth"
    Sawtooth = 2,
    //% block="sine"
    Sine = 3,
    //% block="white noise"
    WhiteNoise = 5,
    //% block="square 10%"
    Square10 = 11,
    //% block="square 20%"
    Square20 = 12,
    //% block="square 30%"
    Square30 = 13,
    //% block="square 40%"
    Square40 = 14,
    //% block="square 50%"
    Square50 = 15,
    //% block="cycle 16"
    Cycle16 = 16,
    //% block="cycle 32"
    Cycle32 = 17,
    //% block="cycle 64"
    Cycle64 = 18,
    //% block="tunable noise"
    TunableNoise = 4,
}

//% blockNamespace=soundEffects
class SoundEffect {
    constructor() {}

    /**
     * Plays a sound effect, not waiting for it to finish.
     */
    //% blockId="play_method" block="play %soundeffect"
    //% weight=80
    play() {}

    /**
     * Plays a sound effect and waits until it is done.
     */
    //% blockId="play_until_done_method" block="play %soundeffect until done"
    //% weight=80
    playUntilDone() {
        this.play()
        pause(this.totalDuration)
    }

    get totalDuration(): number {
        return 0
    }
}

class SoundEffectPair extends SoundEffect {
    _a: SoundInstructionSequence;
    _b: SoundInstructionSequence;

    constructor(a: SoundInstructionSequence, b: SoundInstructionSequence) {
        super()
        this._a = a
        this._b = b
    }

    play() {
        this._a.play()
        this._b.play()
    }

    get totalDuration(): number {
        return Math.max(this._a.totalDuration, this._b.totalDuration)
    }
}

//% blockNamespace=soundEffects
class SoundInstructionSequence extends SoundEffect {
    protected _buf: Buffer;

    constructor(buffer: Buffer) {
        super()
        this._buf = buffer;
    }

    play() {
        music.playInstructions(0, this._buf);
    }

    get totalDuration() {
        let duration: number = 0;
        for (let i = 0; i < this._buf.length; i += 12) {
            duration += this._buf.getNumber(NumberFormat.UInt16LE, i + 4);
        }
        //console.logValue("duration", duration)
        return duration;
    }

    get rawBuffer(): Buffer {
        return this._buf;
    }

    /**
     * Gets a sound instruction from a sequence for in-place modification.
     * @param index the zero-based position in the list of the item, eg: 0
     */
    //% blockId="sound_sequence_at" block="%SoundInstructionSequence(soundsequence) get sound at %index"
    //% group="Sequences"
    soundAt(index: number): SoundInstruction {
        return new SoundInstruction(this._buf, index)
    }

    getWave(idx: number): WaveType { return this._buf.getNumber(NumberFormat.UInt16LE, 0 + idx * 12); }
    setWave(idx: number, v: WaveType) { this._buf.setNumber(NumberFormat.UInt16LE, 0 + idx * 12, v); }
    getDuration(idx: number) { return this._buf.getNumber(NumberFormat.UInt16LE, 4 + idx * 12); }
    setDuration(idx: number, v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 4 + idx * 12, v); }
    getFreq0(idx: number) { return this._buf.getNumber(NumberFormat.UInt16LE, 2 + idx * 12); }
    setFreq0(idx: number, v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 2 + idx * 12, v); }
    getFreq1(idx: number) { return this._buf.getNumber(NumberFormat.UInt16LE, 10 + idx * 12); }
    setFreq1(idx: number, v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 10 + idx * 12, v); }
    getVol0(idx: number) { return this._buf.getNumber(NumberFormat.UInt16LE, 6 + idx * 12); }
    setVol0(idx: number, v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 6 + idx * 12, v); }
    getVol1(idx: number) { return this._buf.getNumber(NumberFormat.UInt16LE, 8 + idx * 12); }
    setVol1(idx: number, v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 8 + idx * 12, v); }
    getWaveNumber(idx: number) { return this._buf.getNumber(NumberFormat.UInt16LE, 0 + idx * 12); }
    setWaveNumber(idx: number, v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 0 + idx * 12, v); }
}

//% blockNamespace=soundEffects
class SoundEnvelope extends SoundInstructionSequence {
    _attack: number;
    _sustain: number;
    _decay: number;
    _release: number;

    constructor(wave: number, duration: number, freq: number, volume: number, attack: number, decay: number, sustain: number, release: number) {
        super(control.createBuffer(12 * 4))
        this._attack = attack
        this._decay = decay
        this._sustain = sustain
        this._release = release

        for (let i = 0; i < 4; ++i) {
            this.setWaveNumber(i, wave);
        }
        this.changeFrequency(freq)

        this.setVol0(0, 0);
        this.setDuration(0, this._attack);
        this.setDuration(1, this._decay);
        this.setDuration(3, this._release);
        this.setVol1(3, 0);

        this.changeDuration(duration)
        this.changeVolume(volume)
    }

    //% blockId="envelope_duration"
    //% group="Envelope"
    //% block="set %SoundEnvelope(note) duration to %duration"
    changeDuration(duration: number) {
        this.setDuration(2, Math.max(1, duration - this._attack - this._decay));
    }

    //% blockId="envelope_volume"
    //% group="Envelope"
    //% block="set %SoundEnvelope(note) volume to %volume"
    changeVolume(volume: number) {
        let susVol = volume * this._sustain / 100;
        // attack
        this.setVol1(0, volume);
        // decay
        this.setVol0(1, volume);
        this.setVol1(1, susVol);
        // sustain
        this.setVol0(2, susVol);
        this.setVol1(2, susVol);
        // release
        this.setVol0(3, susVol);
    }

    //% blockId="envelope_frequency"
    //% group="Envelope"
    //% block="set %SoundEnvelope(note) frequency to %freq"
    changeFrequency(freq: number) {
        for (let i = 0; i < 4; ++i) {
            this.setFreq0(i, freq);
            this.setFreq1(i, freq);
        }
    }

    get totalDuration() {
        // Exclude "release" time from the duration
        return this.getDuration(0) + this.getDuration(1) + this.getDuration(2);
    }
}

//% blockNamespace=soundEffects
class SoundInstruction extends SoundInstructionSequence {
    _offset: number;

    constructor(buffer: Buffer, index: number) {
        super(buffer)
        this._offset = index * 12
    }

    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    set wave(v: WaveType) { this._buf.setNumber(NumberFormat.UInt16LE, 0 + this._offset, v); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine weight=40
    get wave(): WaveType { return this._buf.getNumber(NumberFormat.UInt16LE, 0 + this._offset); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine weight=60
    get duration() { return this._buf.getNumber(NumberFormat.UInt16LE, 4 + this._offset); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    set duration(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 4 + this._offset, v); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    get freq0() { return this._buf.getNumber(NumberFormat.UInt16LE, 2 + this._offset); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    set freq0(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 2 + this._offset, v); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    get freq1() { return this._buf.getNumber(NumberFormat.UInt16LE, 10 + this._offset); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    set freq1(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 10 + this._offset, v); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    get vol0() { return this._buf.getNumber(NumberFormat.UInt16LE, 6 + this._offset); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    set vol0(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 6 + this._offset, v); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    get vol1() { return this._buf.getNumber(NumberFormat.UInt16LE, 8 + this._offset); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine
    set vol1(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 8 + this._offset, v); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine weight=10
    get waveNumber() { return this._buf.getNumber(NumberFormat.UInt16LE, 0 + this._offset); }
    //% blockSetVariable="soundeffect"
    //% group="Attributes"
    //% blockCombine weight=10
    set waveNumber(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 0 + this._offset, v); }
}

//% blockNamespace=soundEffects
class SoundBuffer extends SoundInstruction {
    constructor(wave: number, duration: number, f0: number, f1: number, v0: number, v1: number) {
        super(control.createBuffer(12), 0)
        this._buf.setNumber(NumberFormat.UInt16LE, 0, wave);
        this._buf.setNumber(NumberFormat.UInt16LE, 2, f0);
        this._buf.setNumber(NumberFormat.UInt16LE, 4, duration);
        this._buf.setNumber(NumberFormat.UInt16LE, 6, v0);
        this._buf.setNumber(NumberFormat.UInt16LE, 8, v1);
        this._buf.setNumber(NumberFormat.UInt16LE, 10, f1);
    }
}

/**
 * Provides access to sound effects.
 */
//% color=#dd3dc1 icon="\uf0a1" advanced=false block="Sound Effects"
//% groups=['others', 'Attributes', 'Sequences', 'Envelope']
namespace soundEffects {
    /**
     * Creates a sound effect.
     * @param wave wave form for the effect; eg: WaveType.Square50
     * @param duration [0-99999] sound duration in milliseconds; eg: 1000
     * @param f0 [1-20000] starting frequency in Hz (cycles/second); eg: 440
     * @param f1 [1-20000] ending frequency in Hz; eg: 440
     * @param v0 [0-1023] starting volume; eg: 255
     * @param v1 [0-1023] ending volume; eg: 0
     */
    //% blockId="create_sound" block="sound wave %wave=waveNumber for %duration ms, freq %f0 to %f1||, vol %v0 to %v1"
    //% inlineInputMode=inline
    //% expandableArgumentMode="toggle"
    //% blockSetVariable=soundeffect
    //% weight=90
    export function createSound(wave: number, duration: number, f0: number, f1: number, v0: number=255, v1: number=0): SoundBuffer {
        return new SoundBuffer(wave, duration, f0, f1, v0, v1);
    }

    /**
     * Combines multiple sound effects into a sequence.
     * @param sounds list of sound effects
     * @param repeat repeat count; eg: 1
     */
    //% blockId="create_sound_sequence" block="sound sequence %sounds|| repeat %num"
    //% sounds.shadow="lists_create_with"
    //% sounds.defl="create_sound"
    //% blockSetVariable=soundsequence
    //% inlineInputMode="external"
    //% group="Sequences"
    //% weight=80
    export function createSoundSequence(sounds: SoundInstructionSequence[], repeat: number=1): SoundInstructionSequence {
        let totalLength = 0
        for (let i = 0; i < sounds.length; ++i) {
            totalLength += sounds[i].rawBuffer.length
        }
        let buffer = control.createBuffer(totalLength * repeat)
        let offset = 0
        for (let j = 0; j < repeat; ++j) {
            for (let i = 0; i < sounds.length; ++i) {
                buffer.write(offset, sounds[i].rawBuffer)
                offset += sounds[i].rawBuffer.length
            }
        }
        return new SoundInstructionSequence(buffer);
    }

    /**
     * Combines two sound effects to play simultaneously.
     */
    //% blockId="create_sound_pair" block="combined sounds %a and %b"
    //% blockSetVariable=soundeffect
    //% group="Sequences"
    //% weight=80
    export function createSoundPair(a: SoundInstructionSequence, b: SoundInstructionSequence) {
        return new SoundEffectPair(a, b)
    }

    /**
     * Creates a sound with volume envelope.
     * @param wave wave form for the effect; eg: WaveType.Square50
     * @param duration [0-99999] sound duration in milliseconds; eg: 1000
     * @param freq [1-20000] frequency in Hz (cycles/second); eg: 440
     * @param volume [0-1023] volume; eg: 255
     * @param attack [0-9999] attack time in milliseconds; eg: 10
     * @param decay [0-9999] decay time in milliseconds; eg: 10
     * @param sustain [0-100] sustain volume percent; eg: 60
     * @param release [0-9999] release time in milliseconds; eg: 100
     */
    //% blockId="create_envelope" block="sound wave %wave=waveNumber for %duration ms, freq %freq, volume %vol, attack %attack ms, decay %decay ms, sustain %sustain percent, release %release ms"
    //% inlineInputMode=inline
    //% blockSetVariable=note
    //% group="Envelope"
    //% weight=90
    export function createEnvelope(wave: number, duration: number, freq: number, volume: number, attack: number, decay: number, sustain: number, release: number) {
        return new SoundEnvelope(wave, duration, freq, volume, attack, decay, sustain, release);
    }

    /** Gets the waveform number for a wave type.
     * @param wave wave form type; eg: WaveType.Triangle
     */
    //% blockId="waveNumber"
    //% block="%wave"
    //% group="Attributes" weight=10
     export function waveNumber(wave: WaveType): number {
        return wave;
    }
}


