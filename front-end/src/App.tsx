import { Button, FormLabel, TextareaAutosize, TextField } from "@mui/material";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import "./App.css";
import { Questions } from "./pages/Questions";

function App() {
  return (
    <>
      <Questions/>
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
