
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from 'react-stars';
import { ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../../firebase/Firebase";

const Card = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function getData() {

            try {
                setLoading(true);

                const _data = await getDocs(moviesRef);

                _data.forEach((doc) => {
                    setData((prev) => [...prev, { ...doc.data(), id: doc.id }])
                })

                setLoading(false);

            } catch (error) {
                console.log(error + " There is an error to load your data.")
            }

        }

        getData();

    }, [])

    return (
        <>

            <div
                className="w-full h-screen flex flex-wrap justify-evenly mt-4 p-4"
            >
                {loading ?

                    <div className="mt-40"><ThreeDots height={30} color="white" /></div>

                    :

                    data.map((e, i) => {
                        return (
                            <Link
                                to={`moviedetails/${e.id}`}
                            >
                                <div
                                    key={i}
                                    className="mb-24 m-3 bg-slate-800 p-2 shadow-lg rounded-lg flex flex-col gap-2 cursor-pointer transition-all hover:-translate-y-4 duration-500 mt-4 cards"
                                >
                                    <img
                                        className="w-full h-72 rounded-lg"
                                        src={e.image} height={100} alt="Movie Image" />
                                    <div
                                        className="mt-1"
                                    >
                                        <h1 className="font-bold"><span className="text-blue-500">Name </span>: {e.name}</h1>
                                        <h1 className="font-bold flex items-center gap-2"><span className="text-blue-500">Rating </span>:
                                            <ReactStars
                                                count={5}
                                                value={e.rating / e.rated}
                                                size={18}
                                                edit={false}

                                            />
                                        </h1>
                                        <h1 className="font-bold"><span className="text-blue-500">Year </span>: {e.year}</h1>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Card;