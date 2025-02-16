import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Polling App</h1>
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/create">Create Poll</Link>
      </div>
    </nav>
  );
};

export default Navbar;
