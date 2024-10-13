import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KuisContainer from "../components/fragments/kuisContainer";

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

  const fetchQuiz = async () => {
    axios
      .get("https://opentdb.com/api.php?amount=10&type=boolean")
      .then((res) => {
        console.log(res.data.results);
        setResults(res.data.results);
        setSoal(res.data.results.length);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat kuis, coba lagi nanti.");
      });
  };

  useEffect(() => {
    const username = localStorage.getItem("name");
    const handleBeforeUnload = () => {
      const quizState = {
        results,
        currentQuestionIndex,
        benar,
        salah,
        terjawab,
        countdown,
        soal,
        username,
      };
      localStorage.setItem("quizState", JSON.stringify(quizState));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [results, currentQuestionIndex, benar, salah, terjawab, countdown, soal]);

  useEffect(() => {
    const quizState = JSON.parse(localStorage.getItem("quizState"));
    if (quizState && quizState.username === localStorage.getItem("name")) {
      const userChoice = window.confirm(
        "Kamu memiliki kuis yang belum selesai. Apakah kamu ingin melanjutkan?"
      );
      if (userChoice) {
        setResults(quizState.results);
        setCurrentQuestionIndex(quizState.currentQuestionIndex);
        setBenar(quizState.benar);
        setSalah(quizState.salah);
        setTerjawab(quizState.terjawab);
        setCountdown(quizState.countdown);
        setSoal(quizState.soal);
      } else {
        localStorage.removeItem("quizState");
        fetchQuiz();
      }
    } else {
      fetchQuiz();
    }
  }, []);

  useEffect(() => {
    // Memulai timer
    if (currentQuestionIndex < results.length) {
      timerId.current = setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setCountdown(20);
        setTerjawab((prev) => prev + 1);
        setSalah((prev) => prev + 1);
      }, 20000);

      if (terjawab === results.length) {
        navigate("/result", { state: { benar, salah, terjawab } });
      }

      return () => clearTimeout(timerId.current);
    }
  }, [currentQuestionIndex, results.length]);

  useEffect(() => {
    if (currentQuestionIndex < results.length) {
      timerId.current = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
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

    if (currentQuestionIndex < results.length - 1) {
      setCountdown(20);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-purple-900 text-white p-[3%] flex flex-col justify-between">
      {results.length > 0 && (
        <KuisContainer
          answerTrue={answerTrue}
          answerFalse={answerFalse}
          currentQuiz={cleanString(
            results[currentQuestionIndex]?.question || "Loading..."
          )}
          countdown={countdown}
          terjawab={terjawab}
          soal={soal}
        />
      )}
    </main>
  );
}
