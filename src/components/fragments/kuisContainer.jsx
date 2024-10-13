import AnswerChoice from "../elements/answerChoice";
import KuisCard from "../elements/kuisCard";

export default function KuisContainer({
  currentQuiz,
  answerTrue,
  answerFalse,
  countdown,
  terjawab,
  soal,
}) {
  return (
    <>
      <KuisCard
        currentQuiz={currentQuiz}
        countdown={countdown}
        terjawab={terjawab}
        soal={soal}
      />
      <AnswerChoice answerTrue={answerTrue} answerFalse={answerFalse} />
    </>
  );
}
