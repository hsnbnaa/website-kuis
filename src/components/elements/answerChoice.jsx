export default function AnswerChoice({ answerTrue, answerFalse }) {
  return (
    <div className="flex w-full 2xl:h-[370px] h-[280px] justify-between">
      <button
        className="w-[49%] flex justify-center items-center bg-green-600 rounded-lg 2xl:text-6xl text-4xl font-bold"
        onClick={answerTrue}
      >
        Benar
      </button>
      <button
        className="w-[49%] flex justify-center items-center bg-red-600 rounded-lg 2xl:text-6xl text-4xl font-bold"
        onClick={answerFalse}
      >
        Salah
      </button>
    </div>
  );
}
