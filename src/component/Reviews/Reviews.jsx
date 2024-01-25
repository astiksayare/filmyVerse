
import ReactStars from "react-stars";
import { useState, useEffect } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { addDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { reviewsRef, database } from "../../firebase/Firebase";
import swal from "sweetalert";
import { useContextData } from "../../context";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {

    const { userName , login} = useContextData();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false)
    const [reviewLoading, setReviewLoading] = useState(true)
    const [data, setData] = useState([]);
    const [reviewUpload, setReviewUpload] = useState(false);
    const navigate = useNavigate();


    const sendReview = async () => {

        setLoading(true);
        try {

            if (login){
            await addDoc(reviewsRef, {
                name: userName,
                thought: review,
                timestamp: new Date().getTime(),
                rating,
                movieid: id
            })

            const docRef = doc(database, "movies", id);

            // Updating the review database
            await updateDoc(docRef, {
                rating: prevRating + rating,
                rated: userRated + 1
            })

            // Sweet alert to showing that reveiw has sent by the user
            swal({
                title: "Review Sent",
                icon: "success",
                buttons: false,
                timer: 2000
            })

            setRating(0);
            setReview("");
            setReviewUpload(true);
        }else {
            swal({
                title: "Please Login",
                icon: "warning",
                buttons: false,
                timer: 3000
            });
            navigate("/login");
        }
        } catch (error) {
            // Sweet alert to showing that reveiw has not sent by the user
            swal({
                title: "Review not Sent",
                icon: "error",
                buttons: false,
                timer: 2000
            })
        }

        setLoading(false);

    }

    useEffect(() => {
        async function getData() {

            setReviewLoading(true);
            setData([]);
            try {

                let quer = query(reviewsRef, where("movieid", "==", id));
                const queryData = await getDocs(quer);

                queryData.forEach((doc) => {
                    setData((prev) => [...prev, doc.data()])
                })

            } catch (error) {
                console.log(error + " There is an error in the code.");
            }

            setReviewLoading(false);
        }

        getData();
    }, [reviewUpload])

    return (
        <>
            <div
                className="w-full border-t-2 mt-4"
            >

                <div
                    className="mt-4"
                >
                    <ReactStars
                        size={40}
                        half={true}
                        value={rating}
                        onChange={(rate) => setRating(rate)}
                    />
                </div>

                <input type="text"
                    className="w-full p-3 outline-none bg-slate-600 text-white"
                    placeholder="Share your thoughts..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />

                <button
                    onClick={sendReview}
                    className="w-full p-3 bg-green-600 text-white font-semibold hover:bg-green-500"
                >{loading ? <div className="flex justify-center"><TailSpin height={30} color="white" /></div> : "Submit Your Review"}</button>

                {/* Review Section */}
                <div
                    className="w-full mt-8"
                >
                    {
                        reviewLoading ?

                            <div
                                className="flex justify-center"
                            >
                                <ThreeDots height={40} color="white" />
                            </div>

                            :

                            <div>
                                {
                                    data.map((e, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="border-b-2 pb-3 mb-2"
                                            >
                                                <div
                                                    className="flex gap-4"
                                                >
                                                    <h1 className="text-blue-500 font-bold">{e.name}</h1>
                                                    <h1 className="text-blue-500">( {new Date(e.timestamp).toLocaleString()} )</h1>
                                                </div>

                                                <ReactStars
                                                    value={e.rating}
                                                    edit={false}
                                                />

                                                <h1>
                                                    {e.thought}
                                                </h1>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                    }
                </div>
            </div>
        </>
    )
}

export default Reviews;