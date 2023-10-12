import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import Logo from "../components/Logo";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="p-4 bg-gradient-to-r from-slate-200 to-slate-100 min-h-screen
    "
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <Logo />
        </div>

        <div className="flex justify-center items-center gap-x-2">
          <div className="text-xl hidden sm:block">Show as:</div>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-xl"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg text-xl"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <div
            className="flex items-center gap-2 border-2 border-sky-400 px-2 py-1 rounded-lg font-[600] 
          text-sky-800 hover:bg-sky-800 hover:text-white cursor-pointer transition duration-300 ease-in-out
          "
          >
            Add Book
            <MdOutlineAddBox className="text-3xl hover:text-white" />
          </div>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
