export default function AnswerChoice({ answerTrue, answerFalse }) {
  return (
    <div className="flex w-full h-[370px] justify-between">
      <button
        className="w-[49%] flex justify-center items-center bg-green-600 rounded-lg text-6xl font-bold"
        onClick={answerTrue}
      >
        True
      </button>
      <button
        className="w-[49%] flex justify-center items-center bg-red-600 rounded-lg text-6xl font-bold"
        onClick={answerFalse}
      >
        False
      </button>
    </div>
  );
}
