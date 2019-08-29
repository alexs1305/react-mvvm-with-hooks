import { useState, useEffect } from "react";

export interface Props {
  name: string;
  surname: string;
  setByeMessage: (message: string) => void;
}

export interface IViewModel<TProps> {
  props: TProps;
}

export class ViewModel implements IViewModel<Props> {
  props: Props = {} as Props;

  timesRendered = 0;
  setTimesRendered: (i: number) => void = null;

  useHooks() {
    this.setupTimesRendered();
    this.countTimesNameCausedRendered();
  }

  private setupTimesRendered() {
    const [times, setTimesRendered] = useState(0);
    this.timesRendered = times;
    this.setTimesRendered = setTimesRendered;
    this.byeBye();
  }

  private countTimesNameCausedRendered() {
    useEffect(() => this.setTimesRendered(this.timesRendered + 1), [
      this.props.name
    ]);
  }

  private byeBye() {
    useEffect(() => () => this.props.setByeMessage("bye bye"), [true]);
  }
}
