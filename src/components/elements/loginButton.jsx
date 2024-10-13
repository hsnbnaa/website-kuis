export default function LoginButton({ startKuis }) {
  return (
    <>
      <button
        className="py-3 bg-green-600 font-bold text-2xl mt-5 rounded-md"
        onClick={startKuis}
      >
        Mulai Kuis
      </button>
    </>
  );
}
