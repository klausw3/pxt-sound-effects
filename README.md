## PXT Sound Effects ![Build status badge](https://github.com/klausw3/pxt-sound-effects/workflows/MakeCode/badge.svg)

This extension adds blocks for creating sound effects based on the [music.playInstructions()](https://arcade.makecode.com/developer/sound#sound-instructions) interface.

It was originally intended for new waveforms (tunable noise, and cycle noise modulated square waves) that are currently only available in the beta editor, but also works with the current MakeCode Arcade editor as long as you stick to the waveforms it supports.

Example:

```js
let soundeffect: SoundBuffer = null

soundeffect = soundEffects.createSound(WaveType.Triangle, 1000, 440, 110)
soundeffect.playUntilDone()
```

The parameters to `createSound` are:
- waveform
- duration in milliseconds
- starting frequency in Hz (cycles/second)
- ending frequency in Hz
- starting volume 0-1023 (optional, default 255)
- ending volume 0-1023 (optional, default 0)

Once the sound effect is created, use `playUntilDone()` or `play()` to play the sound, depending on if you want your program to wait for the sound to finish, or to continue running while it plays in the background.

You can modify the parameters of a sound effect using attributes, for example setting `soundeffect.freq1 = 220`.

## Create a project with this extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/klausw3/pxt-sound-effects** and import

## Edit this project 
To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/klausw3/pxt-sound-effects** and click import

## Blocks example

![A rendered view of the blocks](https://github.com/klausw3/pxt-sound-effects/raw/master/assets/sound-effect-blocks.png)

Example for basic effects: https://arcade.makecode.com/16695-67870-01625-09215

Link to the beta editor for trying the new waveforms: https://arcade.makecode.com/beta#pub:_JL6P9m5fYg9u

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
