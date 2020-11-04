import { Players } from "tone";

export interface IInstrumentData {
  keyCode: number;
  label: string;
}

class Instruments {
  _instruments: IInstrumentData[] = [
    { keyCode: 65, label: "clap" },
    { keyCode: 83, label: "hihat" },
    { keyCode: 68, label: "kick" },
    { keyCode: 70, label: "openhat" },
    { keyCode: 71, label: "boom" },
    { keyCode: 72, label: "ride" },
    { keyCode: 74, label: "snare" },
    { keyCode: 75, label: "tom" },
    { keyCode: 76, label: "tink" },
  ];
  players: Players | undefined = undefined;

  load(callback?: () => void): void {
    this.players = new Players(
      this._instruments.reduce((acc, instrument) => {
        return {
          ...acc,
          [instrument.label]: `./sound/${instrument.label}.mp3`,
        };
      }, {}),
      (): void => {
        this.players?.toDestination();
        callback && callback();
      }
    );
  }

  play(instrument: string): void {
    const found = this._instruments.find(
      (needle): boolean => `${needle.label}` === instrument
    );
    if (found) {
      if (this.players?.has(found.label)) {
        this.players?.player(found.label).start();
      }
    }
  }

  get loaded(): boolean {
    return this.players?.loaded || false;
  }

  get instruments(): IInstrumentData[] {
    return this._instruments.map((i) => ({ ...i }));
  }
}

export default Instruments;
