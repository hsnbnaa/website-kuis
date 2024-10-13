export default function KuisCard({ currentQuiz, countdown, terjawab, soal }) {
  return (
    <div className="w-full h-[400px] flex relative justify-center items-center bg-purple-700 bg-opacity-45 border border-white rounded-lg backdrop-brightness-65 p-8">
      <div className="absolute right-5 top-5 text-xl font-bold bg-purple-700 bg-opacity-45 border border-white rounded-lg backdrop-brightness-65 p-5">
        <span>
          Soal ke {terjawab + 1} / {soal}
        </span>
      </div>
      <div className="absolute text-4xl font-semibold w-[80px] translate-x-0 top-[-40px] bg-purple-700 border border-white rounded-lg backdrop-brightness-65 p-4">
        <span className="flex justify-center">{countdown}</span>
      </div>
      <h1 className="text-3xl font-bold text-center">{currentQuiz}</h1>
    </div>
  );
}
