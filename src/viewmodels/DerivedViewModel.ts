import { BasicViewModel } from "./BasicViewModel";
import { useEffect } from "react";

export class DerivedViewModel extends BasicViewModel {
  useHooks() {
    super.useHooks();
    this.trackSurnameChanges();
  }

  trackSurnameChanges() {
    const { surname } = this.props;
    useEffect(() => {
      this.setTimesRendered(this.timesRendered + 1);
    }, [surname]);
  }
}
