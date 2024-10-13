export default function LoginField({ setName }) {
  return (
    <>
      <label htmlFor="name" className="text-xl font-semibold">
        Nama kamu adalah...
      </label>
      <input
        type="text"
        className="outline-none border-none p-3 rounded-md text-black"
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
}
