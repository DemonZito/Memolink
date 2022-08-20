import { useEffect, useRef, useState } from "react";
import { QuestionsMenu } from "../components/QuestionsMenu";
import { QuestionsPanel } from "../components/QuestionsPanel";

export const Questions = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<string>("");
    const currentQuestions = useRef("");

    function SetSelectedQuestion(q: string) {
      setSelectedQuestion(q);
      currentQuestions.current = require("../assets/" + q + ".json");
    }

    function BackToMenu() {
      setSelectedQuestion("");
    }

    return (<>
      {!selectedQuestion && <QuestionsMenu setQuestion={SetSelectedQuestion}/>}
      {selectedQuestion && <QuestionsPanel backToMenu={BackToMenu} chosenQuestions={currentQuestions} />}

    </>)
}
