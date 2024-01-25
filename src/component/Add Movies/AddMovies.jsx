
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../../firebase/Firebase";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import { useContextData } from "../../context";
import { useNavigate } from "react-router-dom";


const AddMovie = () => {

    const [loading, setLoading] = useState(false);

    const { login } = useContextData();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated: 0
    })


    const addMovies = () => {
        async function addData() {
            try {

                if (login) {
                setLoading(true);

                // Adding movies data to the firebase.
                await addDoc(moviesRef, form);


                // Showing alert function.
                swal({
                    title: "Successfully Data Added",
                    icon: "success",
                    buttons: false,
                    timer: 2000
                })

                setForm(
                    {
                        name: "",
                        year: "",
                        image: "",
                        description: ""
                    }
                )


                setLoading(false);
                }else {
                    swal({
                        title: "Please Login",
                        icon: "error",
                        buttons: false,
                        timer: 2000
                    });
                    navigate("/login");
                }
            } catch (error) {

                swal({
                    title: error,
                    icon: "error",
                    buttons: false,
                    timer: 2000
                })

            }
        }

        addData();
    }


    return (
        <>
            <div
                className="w-full h-screen flex flex-col justify-start items-center fixed"
            >
                <h1 className="text-4xl my-8 font-bold font-serif text-purple-500">Add Movies</h1>

                <div
                    className="w-[90%] md:w-[60%] text-purple-500 font-semibold flex flex-col justify-start items-center gap-2"
                >
                    {/* input container */}
                    <div
                        className="w-full md:w-[60%] md:flex md:gap-2"
                    >
                        <input type="text"
                            placeholder="Movie Name..."
                            className="w-full p-4 rounded-lg border-2 border-purple-400 outline-none mb-2"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input type="number"
                            placeholder="Year..."
                            className="w-full p-4 rounded-lg border-2 border-purple-400 outline-none mb-2"
                            value={form.year}
                            onChange={(e) => setForm({ ...form, year: e.target.value })}
                        />
                    </div>

                    {/* Link of the poster */}
                    <div
                        className="md:w-[60%] w-full"
                    >
                        <input type="text"
                            placeholder="Movie poster link..."
                            className="w-full p-4 rounded-lg border-2 border-purple-400 outline-none mb-2"
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                        />
                    </div>

                    {/* discription container */}
                    <div
                        className="md:w-[60%] w-full"
                    >
                        <textarea name="Description" id="description" cols="30" rows="5"
                            placeholder="Enter your movie description..."
                            className="w-full p-4 rounded-lg border-2 border-purple-400 outline-none mb-2"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        ></textarea>
                    </div>

                    {/* Submit Button Container */}
                    <div
                        className="md:w-[60%] w-full flex justify-center items-center"
                    >
                        <button
                            onClick={addMovies}
                            className="w-[50%] text-center p-4 rounded-lg text-white font-bold bg-green-500 hover:bg-white hover:text-purple-500 hover:border-purple-500 active:bg-green-400 active:text-white transition-all duration-500"
                        >
                            {loading ? <div className="flex justify-center items-center"><TailSpin height={30} color="purple" /></div> : "Submit"}
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default AddMovie;