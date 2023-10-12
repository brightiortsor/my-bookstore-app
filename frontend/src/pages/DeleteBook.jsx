import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

const DeleteBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        toast("Book Deleted Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("An error occurred");
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <Logo />
      <h1 className="text-3xl mt-12 my-4 text-center">DELETE BOOK</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col mt-2 items-center border-2 border-sky-400 rounded-xl md:w-[50%] p-8 mx-auto sm:w-[100%]">
          <h3 className="sm:text-lg md:text-xl">
            Are You Sure You want to delete{" "}
            <span className="font-semibold">{book.title}?</span>
          </h3>
          <div className="flex justify-between gap-10  mt-6">
            <button
              className="px-4 py-2 bg-red-600 text-white "
              onClick={handleDeleteBook}
            >
              DELETE
            </button>
            <button
              className="px-4 py-2 bg-sky-600 text-white  "
              onClick={() => navigate("/")}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
