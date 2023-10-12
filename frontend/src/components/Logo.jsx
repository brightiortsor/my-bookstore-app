import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="w-[fit-content]">
      <Link to="/" className="flex items-center text-red-500 text-3xl ">
        <FaBook className="" />
        <h1 className="text-3xl font-bold">BookPal</h1>
      </Link>
    </div>
  );
};

export default Logo;
