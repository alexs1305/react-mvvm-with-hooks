import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import { ViewModel } from "./viewmodels/viewmodel";
import {
  BasicViewModel,
  BasicViewModelProps
} from "./viewmodels/BasicViewModel";
import { DerivedViewModel } from "./viewmodels/DerivedViewModel";
import { bind } from "./bind";

const theView: React.FC<{ viewModel: BasicViewModel }> = ({ viewModel }) => {
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

const theView2: React.FC<{ viewModel: BasicViewModel }> = ({ viewModel }) => {
  const { name, surname } = viewModel.props;
  return (
    <div style={{ border: "solid black 1px" }}>
      hey {name} {surname} <br />
    </div>
  );
};

const Example = bind<BasicViewModelProps>(theView, BasicViewModel);
const Example2 = bind<BasicViewModelProps>(theView2, BasicViewModel);
const Example3 = bind<BasicViewModelProps>(theView, DerivedViewModel);

function App() {
  const [name, setName] = React.useState("John");
  const [surname, setSurname] = React.useState("Doe");
  const [byeByeMessage, setByeByemessage] = React.useState("");
  const [show, setShow] = React.useState(true);
  return (
    <div className="App">
      {show && (
        <Example3
          name={name}
          surname={surname}
          setByeMessage={setByeByemessage}
        />
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
