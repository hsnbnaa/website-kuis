import LoginButton from "../elements/loginButton";
import LoginField from "../elements/loginField";

export default function LoginCard({ setName, startKuis }) {
  return (
    <div className="flex flex-col gap-2 w-1/3 h-auto bg-black p-5 rounded-3xl bg-opacity-65">
      <LoginField setName={setName} />
      <LoginButton startKuis={startKuis} />
    </div>
  );
}
