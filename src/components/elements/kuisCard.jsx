export default function KuisCard({ currentQuiz, countdown, terjawab, soal }) {
  return (
    <div className="w-full 2xl:h-[400px] h-[250px] flex relative justify-center items-center bg-purple-700 bg-opacity-45 border border-white rounded-lg backdrop-brightness-65 p-8">
      <div className="absolute right-5 top-5 2xl:text-xl text-md font-bold bg-purple-700 bg-opacity-45 border border-white rounded-lg backdrop-brightness-65 p-5">
        <span>
          Soal ke {terjawab + 1} / {soal}
        </span>
      </div>
      <div className="absolute 2xl:text-4xl text-2xl font-semibold w-[80px] translate-x-0 2xl:top-[-40px] top-[-30px] bg-purple-700 border border-white rounded-lg backdrop-brightness-65 p-4">
        <span className="flex justify-center">{countdown}</span>
      </div>
      <h1 className="2xl:text-3xl text-xl font-bold text-center">
        {currentQuiz}
      </h1>
    </div>
  );
}
