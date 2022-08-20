import { Button, FormLabel, TextareaAutosize, TextField } from "@mui/material";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import "./App.css";
import { QuestionsPanel } from "./QuestionsPanel";

function App() {
  const files = ["Culture Fit Questions", "React Questions"];
  const list = files.map((f) => <li key={f}>{f}</li>);
  return (
    <>
      <ul>{list}</ul>
      <QuestionsPanel />
    </>
  );
}

export default App;

/*
        <TextField
          label="What is JSX?"
          placeholder="Answer here"
          multiline
          rows={2}
          maxRows={4}
        />
        <Button>Next</Button>
*/
