import { ViewModel } from "./viewmodel";
import { useState, useEffect } from "react";

export interface BasicViewModelProps {
  name: string;
  surname: string;
  setByeMessage: (message: string) => void;
}

export class BasicViewModel implements ViewModel<BasicViewModelProps> {
  props: BasicViewModelProps = {} as BasicViewModelProps;

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
    const { name } = this.props;
    useEffect(() => this.setTimesRendered(this.timesRendered + 1), [name]);
  }

  private byeBye() {
    useEffect(() => () => this.props.setByeMessage("bye bye"), []);
  }
}
