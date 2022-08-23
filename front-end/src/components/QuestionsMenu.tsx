import { useState } from "react";

export const QuestionsMenu = (props: any) => {
  const files = [
    "cultureFitQuestions",
    "reactQuestions",
    "finalInterviewQuestions",
  ];
  const list = files.map((f) => (
    <li
      onClick={() => {
        props.setQuestion(f);
      }}
      key={f}
    >
      {f}
    </li>
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
};
