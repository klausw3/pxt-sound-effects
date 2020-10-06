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
class SoundBuffer {
    _buf: Buffer;

    /**
     * Plays a sound effect, not waiting for it to finish.
     */
    //% blockId="play_method" block="play %soundeffect"
    //% weight=80
    play() {
        music.playInstructions(0, this._buf);
    }

    /**
     * Plays a sound effect and waits until it is done.
     */
    //% blockId="play_until_done_method" block="play %soundeffect until done"
    //% weight=80
    playUntilDone() {
        music.playInstructions(0, this._buf);
        pause(this.duration)
    }

    constructor(wave: number, duration: number, f0: number, f1: number, v0: number, v1: number) {
        this._buf = control.createBuffer(12);
        this._buf.setNumber(NumberFormat.UInt16LE, 0, wave);
        this._buf.setNumber(NumberFormat.UInt16LE, 2, f0);
        this._buf.setNumber(NumberFormat.UInt16LE, 4, duration);
        this._buf.setNumber(NumberFormat.UInt16LE, 6, v0);
        this._buf.setNumber(NumberFormat.UInt16LE, 8, v1);
        this._buf.setNumber(NumberFormat.UInt16LE, 10, f1);
    }

    //% blockSetVariable="soundeffect"
    //% blockCombine
    set wave(v: WaveType) { this._buf.setNumber(NumberFormat.UInt16LE, 0, v); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    get wave(): WaveType { return this._buf.getNumber(NumberFormat.UInt16LE, 0); }
    //% blockSetVariable="soundeffect"
    //% blockCombine weight=60
    get duration() { return this._buf.getNumber(NumberFormat.UInt16LE, 4); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    set duration(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 4, v); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    get freq0() { return this._buf.getNumber(NumberFormat.UInt16LE, 2); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    set freq0(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 2, v); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    get freq1() { return this._buf.getNumber(NumberFormat.UInt16LE, 10); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    set freq1(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 10, v); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    get vol0() { return this._buf.getNumber(NumberFormat.UInt16LE, 6); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    set vol0(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 6, v); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    get vol1() { return this._buf.getNumber(NumberFormat.UInt16LE, 8); }
    //% blockSetVariable="soundeffect"
    //% blockCombine
    set vol1(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 8, v); }
    //% blockSetVariable="soundeffect"
    //% blockCombine weight=10
    get waveNumber() { return this._buf.getNumber(NumberFormat.UInt16LE, 0); }
    //% blockSetVariable="soundeffect"
    //% blockCombine weight=10
    set waveNumber(v: number) { this._buf.setNumber(NumberFormat.UInt16LE, 0, v); }
}

/**
 * Provides access to sound effects.
 */
//% color=#dd3dc1 icon="\uf0a1" advanced=false block="Sound Effects"
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

    //% blockId="waveNumber" block="%wave"
    export function waveNumber(wave: WaveType): number {
        return wave;
    }
}
