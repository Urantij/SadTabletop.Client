import { removeFromCollection } from "@/utilities/MyCollections";
import type SoundCategory from "../things/concrete/Sounds/SoundCategory";
import type { VolumeData } from "@/stores/UserStore";

export default class SoundCenter {

  private readonly sound: Phaser.Sound.NoAudioSoundManager | Phaser.Sound.HTML5AudioSoundManager | Phaser.Sound.WebAudioSoundManager;
  private readonly volumes: VolumeData[];
  private readonly masterVolume: VolumeData;

  private readonly soundSound: {
    id: number | null,
    multiplier: number,
    sound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound,
    category: SoundCategory,
  }[] = [];

  constructor(sound: Phaser.Sound.NoAudioSoundManager | Phaser.Sound.HTML5AudioSoundManager | Phaser.Sound.WebAudioSoundManager, volumes: VolumeData[]) {
    this.sound = sound;
    this.volumes = volumes;
    this.masterVolume = volumes.find(v => v.category === null)!;
  }

  updateVolume(category: SoundCategory | null) {

    const soundsToUpdate = category === null ? this.soundSound : this.soundSound.filter(s => s.category === category);

    for (const sound of soundsToUpdate) {
      const newVolume = this.makeVolume(sound.multiplier, sound.category);

      sound.sound.setVolume(newVolume);
    }
  }

  playSound(name: string, multiplier: number, playId: number | null, category: SoundCategory) {

    const sound = this.sound.add(name, {
      volume: this.makeVolume(multiplier, category)
    });
    // хмм как думаешь оно всегда проигрывает или у меня утечка папамятити? TODO
    sound.once("complete", () => {
      removeFromCollection(this.soundSound, s => s.id === playId);
    });
    this.soundSound.push({ id: playId, sound: sound, category: category, multiplier: multiplier });
    sound.play();
  }

  stopSound(playId: number) {
    const data = removeFromCollection(this.soundSound, s => s.id === playId);

    if (data === undefined) {
      console.warn(`при попытке найти звук ${playId} не нашлось`);
      return;
    }

    data.sound.stop();
    data.sound.destroy();
  }

  private makeVolume(multiplier: number, category: SoundCategory) {
    const data = this.volumes.find(v => v.category === category)!;

    return multiplier * this.masterVolume.value * data.value;
  }
}
