import { useState } from "react";
import LoginCard from "../components/fragments/loginCard";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const startKuis = () => {
    if (name) {
      localStorage.setItem("name", name);
      navigate("/kuis");
    }
  };

  return (
    <main className="bg-login-background min-h-screen text-white flex justify-center items-center">
      <LoginCard setName={setName} startKuis={startKuis} />
    </main>
  );
}
