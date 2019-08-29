import * as React from "react";
import { render } from "react-dom";
import { ViewModel, Props } from "./ViewModel";
import "./styles.css";

const theView: React.FC<{ viewModel: ViewModel }> = ({ viewModel }) => {
  return (
    <div>
      hey {viewModel.props.name} <br />
      times rendered {viewModel.timesRendered}
      <button
        onClick={() => viewModel.setTimesRendered(viewModel.timesRendered + 1)}
      >
        Add one
      </button>
    </div>
  );
};

function bind<TProps>(V: any, viewModel: any) {
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

const Example = bind<Props>(theView, ViewModel);

function App() {
  const [name, setName] = React.useState("John");
  const [surname, setSurname] = React.useState("Doe");
  const [byeByeMessage, setByeByemessage] = React.useState("");
  const [show, setShow] = React.useState(true);
  return (
    <div className="App">
      {show && (
        <Example name={name} surname="Doe" setByeMessage={setByeByemessage} />
      )}
      <button
        onClick={() => (name === "John" ? setName("Tom") : setName("John"))}
      >
        set
      </button>
      <button
        onClick={() =>
          surname === "Doe" ? setSurname("Smith") : setSurname("Doe")
        }
      >
        set surname
      </button>
      <button onClick={() => setShow(!show)}>{!show ? "show" : "hide"}</button>
      {byeByeMessage}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
