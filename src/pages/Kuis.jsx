import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Kuis() {
  const [results, setResults] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [benar, setBenar] = useState(0);
  const [salah, setSalah] = useState(0);
  const [terjawab, setTerjawab] = useState(0);
  const [soal, setSoal] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const timerId = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data dari API
    axios
      .get("https://opentdb.com/api.php?amount=10&type=boolean")
      .then((res) => {
        console.log(res.data.results);
        setResults(res.data.results);
        setSoal(res.data.results.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Memulai timer
    if (currentQuestionIndex < results.length) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCountdown(20);
        setTerjawab((prev) => prev + 1);
        setSalah((prev) => prev + 1);
      }, 20000);

      if (terjawab === results.length) {
        navigate("/result", { state: { benar, salah, terjawab } });
      }

      return () => clearTimeout(timer); // Membersihkan timer saat komponen di-unmount
    }
  }, [currentQuestionIndex, results.length]);

  useEffect(() => {
    if (currentQuestionIndex < results.length) {
      timerId.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId.current);
    }
  }, [currentQuestionIndex, countdown]);

  useEffect(() => {
    if (terjawab >= results.length && terjawab > 0) {
      navigate("/result", { state: { benar, salah, terjawab } });
    }
  }, [terjawab]);

  const cleanString = (text) => {
    return text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
  };

  const answerTrue = () => {
    if (results[currentQuestionIndex]?.correct_answer === "True") {
      setBenar((prev) => prev + 1);
      setTerjawab((prev) => prev + 1);
    } else {
      setSalah((prev) => prev + 1);
      setTerjawab((prev) => prev + 1);
    }
    // Pindah ke pertanyaan berikutnya
    if (currentQuestionIndex < results.length - 1) {
      setCountdown(20);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const answerFalse = () => {
    if (results[currentQuestionIndex]?.correct_answer === "False") {
      setBenar((prev) => prev + 1);
      setTerjawab((prev) => prev + 1);
    } else {
      setSalah((prev) => prev + 1);
      setTerjawab((prev) => prev + 1);
    }
    // Pindah ke pertanyaan berikutnya
    if (currentQuestionIndex < results.length - 1) {
      setCountdown(20);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-purple-900 text-white p-[3%] flex flex-col justify-between">
      {results.length > 0 && (
        <>
          <div className="w-full h-[400px] flex relative justify-center items-center bg-purple-700 bg-opacity-45 border border-white rounded-lg backdrop-brightness-65 p-8">
            <div className="absolute right-5 top-5 text-xl font-bold bg-purple-700 bg-opacity-45 border border-white rounded-lg backdrop-brightness-65 p-5">
              <span>
                Soal ke {terjawab + 1} / {soal}
              </span>
            </div>
            <div className="absolute text-4xl font-semibold w-[80px] translate-x-0 top-[-40px] bg-purple-700 border border-white rounded-lg backdrop-brightness-65 p-4">
              <span className="flex justify-center">{countdown}</span>
            </div>
            <h1 className="text-3xl font-bold text-center">
              {cleanString(
                results[currentQuestionIndex]?.question || "Loading..."
              )}
            </h1>
          </div>
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
        </>
      )}
    </main>
  );
}
