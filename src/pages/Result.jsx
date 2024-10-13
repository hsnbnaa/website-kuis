import React from "react";
import { useLocation } from "react-router-dom";

export default function Result() {
  const result = useLocation().state;
  const { benar, salah, terjawab } = result;

  const stats = [
    {
      total: `${benar}`,
      status: "Benar",
    },
    {
      total: `${salah}`,
      status: "Salah",
    },
    {
      total: `${terjawab}`,
      status: "Terjawab",
    },
  ];

  return (
    <main className="bg-login-background min-h-screen text-white flex justify-center items-center">
      <div className="flex flex-col bg-black bg-opacity-60 w-[50%] p-6 rounded-xl">
        <h1 className="text-3xl font-bold self-center pt-2 pb-4">Hasil</h1>
        <div className="pb-4 text-2xl">
          <h3>
            Selamat{" "}
            <span className="font-bold">{localStorage.getItem("name")}</span>{" "}
            🎉🎉🎉
          </h3>
        </div>
        <div className="bg-black bg-opacity-70 p-3 rounded-lg">
          <h4 className="pb-2 text-xl font-semibold">Score</h4>
          <span className="text-lg font-semibold">{benar * 10}</span>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <span className="self-center text-xl font-bold pb-3">
            Performance stats
          </span>
          <div className="flex justify-evenly">
            {stats.map((stat, index) => (
              <div
                className="text-center bg-black bg-opacity-70 p-7 rounded-lg text-2xl font-bold w-[180px]"
                key={index}
              >
                <span>{stat.total}</span>
                <h6 className="text-xl font-medium">{stat.status}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
