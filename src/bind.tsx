import * as React from "react";

export function bind<TProps>(V: any, viewModel: any) {
  return (props => {
    const vm = React.useMemo(() => {
      const n = new viewModel();
      n.props = { ...props };
      return n;
    }, [props]);
    vm.useHooks();
    return <V viewModel={vm} />;
  }) as React.FC<TProps>;
}
