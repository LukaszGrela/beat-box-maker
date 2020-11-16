import { Players } from 'tone';

export interface IInstrumentData {
  id: number;
  keyCode: number;
  label: string;
}

class Instruments {
  _instruments: IInstrumentData[] = [
    { id: 1, keyCode: 65, label: 'clap' },
    { id: 2, keyCode: 83, label: 'hihat' },
    { id: 3, keyCode: 68, label: 'kick' },
    { id: 4, keyCode: 70, label: 'openhat' },
    { id: 5, keyCode: 71, label: 'boom' },
    { id: 6, keyCode: 72, label: 'ride' },
    { id: 7, keyCode: 74, label: 'snare' },
    { id: 8, keyCode: 75, label: 'tom' },
    { id: 9, keyCode: 76, label: 'tink' },
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

  play(instrument: string | number): void {
    const found = this._instruments.find(
      (needle): boolean =>
        `${needle.label}` === instrument || needle.id === instrument
    );

    if (found) {
      if (this.players?.has(found.label)) {
        this.players?.player(found.label).start(0);
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
