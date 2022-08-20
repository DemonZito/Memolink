import {
  Button,
  CardHeader,
  FormLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";

export const QuestionsPanel = () => {
  const questions = useRef(require("./assets/cultureFitQuestions.json"));
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [answerText, setAnswerText] = React.useState<string>("");

  function NextQuestion() {
    questions.current[questionIndex].answer = answerText;
    setAnswerText("");
    setQuestionIndex(questionIndex + 1);
  }

  function SubmitAnswers() {
    questions.current[questionIndex].answer = answerText;
    let el = document.createElement("a");
    el.href = URL.createObjectURL(
      new Blob([JSON.stringify(questions.current)], {
        type: "application/json",
      })
    );
    el.download = "answers.json";
    el.click();
  }

  console.log(questionIndex, questions.current.length);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="App"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "pearl",
          width: 500,
          height: 500,
          flexDirection: "column",
          border: "1px black solid",
          boxShadow: "0px 0px 20px 7px #a8ffe3",
        }}
      >
        <CardHeader title={questions.current[questionIndex].question} />
        <TextField
          multiline
          placeholder="Answer here"
          maxRows={10}
          value={answerText}
          onChange={(e) => {
            setAnswerText(e.target.value);
          }}
          error={answerText.length < 1000}
          style={{
            width: "calc(100% - 10px)",
            resize: "vertical",
          }}
        />
        {questionIndex + 1 < questions.current.length && (
          <Button
            style={{
              alignSelf: "end",
              marginTop: 5,
              marginRight: 5,
              background: "#a8ffe3",
            }}
            variant="contained"
            onClick={NextQuestion}
          >
            Next
          </Button>
        )}
        {questionIndex + 1 === questions.current.length && (
          <Button
            style={{
              alignSelf: "end",
              marginTop: 5,
              marginRight: 5,
              background: "#a8ffe3",
            }}
            variant="contained"
            onClick={SubmitAnswers}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
