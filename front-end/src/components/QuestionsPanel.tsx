import {
  Button,
  CardHeader,
  FormLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

export const QuestionsPanel = (props: any) => {
  const questions = useRef([
    { question: "", answer: "", skipped: false, keywords: "" },
  ]);

  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [answerText, setAnswerText] = React.useState<string>("");
  const [questionsSet, setQuestionsSet] = React.useState<boolean>(false);

  useEffect(() => {
    questions.current = props.chosenQuestions.current;
    Shuffle(questions.current);
    setQuestionsSet(true);
  }, [props.chosenQuestions]);

  function Shuffle(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function ChangeQuestion(amount: number, skip: boolean) {
    questions.current[questionIndex].skipped = skip;
    questions.current[questionIndex].answer = answerText;
    setAnswerText(questions.current[questionIndex + amount].answer);
    setQuestionIndex(questionIndex + amount);
  }

  function HighlightText(event: any) {
    setAnswerText(
      event.currentTarget.textContent.replaceAll(
        questions.current[questionIndex].keywords,
        `<mark>${questions.current[questionIndex].keywords}</mark>`
      )
    );
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
    props.backToMenu();
  }

  console.log(questions);

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
      {questionsSet && (
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
            borderRadius: 10,
          }}
        >
          <CardHeader title={questions.current[questionIndex].question} />
          <ContentEditable
            style={{
              width: "calc(100% - 10px)",
              border: "1px solid black",
              borderRadius: "4px",
            }}
            onChange={HighlightText}
            html={answerText}
          />
          <span
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            {questionIndex === 0 && (
              <Button
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  background: "#a8ffe3",
                }}
                variant="contained"
                onClick={() => {
                  props.backToMenu();
                }}
              >
                Exit
              </Button>
            )}
            {questionIndex > 0 && (
              <Button
                style={{
                  marginTop: 5,
                  marginLeft: 5,
                  background: "#a8ffe3",
                }}
                variant="contained"
                onClick={() => {
                  ChangeQuestion(-1, false);
                }}
              >
                Back
              </Button>
            )}
            <p>
              {questionIndex + 1}/{questions.current.length}
            </p>
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
                {answerText.length < 100
                  ? "Submit without answering"
                  : "Submit"}
              </Button>
            )}
            {questionIndex + 1 < questions.current.length &&
              answerText.length >= 100 && (
                <Button
                  style={{
                    marginTop: 5,
                    marginRight: 5,
                    background: "#a8ffe3",
                  }}
                  variant="contained"
                  onClick={() => {
                    ChangeQuestion(1, false);
                  }}
                  disabled={answerText.length < 100}
                >
                  Next
                </Button>
              )}
            {questionIndex + 1 < questions.current.length &&
              answerText.length < 100 && (
                <Button
                  style={{
                    marginTop: 5,
                    marginRight: 5,
                    background: "#a8ffe3",
                  }}
                  variant="contained"
                  onClick={() => {
                    ChangeQuestion(1, true);
                  }}
                >
                  Skip
                </Button>
              )}
          </span>
        </div>
      )}
    </div>
  );
};

/*

 <TextField
            multiline
            placeholder="Answer here"
            maxRows={10}
            value={answerText}
            onChange={(e) => {
              setAnswerText(e.target.value);
            }}
            error={answerText.length < 100}
            helperText={
              answerText.length < 100
                ? "Answer must be at least 100 characters long"
                : ""
            }
            style={{
              width: "calc(100% - 10px)",
              resize: "vertical",
            }}
          />

          */
