
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "../../firebase/Firebase";
import swal from "sweetalert";
import bcrypt from "bcryptjs";
import { usersRef } from "../../firebase/Firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



const SignUp = () => {

    const [signupData, setSignUpData] = useState({
        name: "",
        mobile: "",
        password: ""
    })

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [OTP, setOTP] = useState("");
    const auth = getAuth(app);

    const generateOtp = () => {

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
        });
    }

    // On clicking the request otp function will display your OTP component.
    const requestOTP = () => {
        
        setLoading(true);
        generateOtp();
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${signupData.mobile}`, appVerifier)
            .then((confirmationResult) => {
                
                window.confirmationResult = confirmationResult;
                swal({
                    title: "OTP Sent",
                    icon: "success",
                    buttons: false,
                    timer: 2000
                });

                setOtpSent(true);
                setLoading(false);

            }).catch((error) => {
                swal({
                    title: error,
                    icon: "error",
                    timer: 2000,
                    buttons: false
                })
            });
    }

    // Verifing your OTP with your phone number.
    const verifyOTP = () => {
        try {
          setLoading(true);
          window.confirmationResult.confirm(OTP).then((result) => {
            uploadData();
            swal({
              text: "Sucessfully Registered",
              icon: "success",
              buttons: false,
              timer: 2000,
            });
            setLoading(false); 
            navigate("/login")
          })
        } catch (error) {
            swal({
                text: error,
                icon: "error",
                buttons: false,
                timer: 2000,
              });
        }
      }
    // Updating sign up data to the firebase store
    const uploadData = async () => {
        try {
          const salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(signupData.password, salt);
          await addDoc(usersRef, {
            name: signupData.name,
            password: hash,
            mobile: signupData.mobile
          });
        } catch(err) {
          swal({
            title: err,
            icon: "error",
            buttons: false,
            timer: 2000
          })
        }
      }

    return (
        <>
            <div
                className="w-full h-screen flex flex-col gap-4 items-center fixed p-4"
            >
                <h1
                    className="mt-8 font-bold text-2xl"
                >Sign Up</h1>

                {
                    otpSent ?

                        // OTP page
                        <div>
                            <div
                                className="w-full"
                            >
                                <label className="font-semibold" htmlFor="mobile">Confirm OTP</label>
                                <input
                                    className="p-4 mt-2 w-full rounded-lg outline-none border-2 border-purple-500 font-semibold text-purple-500"
                                    placeholder="Enter OTP..."
                                    value={OTP}
                                    onChange={(e) => setOTP(e.target.value)}
                                />
                                <button
                                onClick={verifyOTP}
                                    className="w-full p-3 my-3 font-bold bg-green-600 rounded-lg hover:bg-green-700"
                                >{loading ? <div className="flex justify-center items-center"><TailSpin height={30} color="white" /></div> : "Confirm OTP"}</button>
                            </div>
                        </div>

                        :

                        // Sign up Page
                        <div
                            className="w-full md:w-[30%] flex flex-col gap-4"
                        >


                            <div
                                className="w-full"
                            >
                                <label className="font-bold" htmlFor="username"> Name</label>
                                <input type="text"
                                    className="p-4 mt-2 w-full rounded-lg outline-none border-2 border-purple-500 font-semibold text-purple-500"
                                    placeholder="User name..."
                                    value={signupData.name}
                                    onChange={(e) => setSignUpData({ ...signupData, name: e.target.value })}
                                />

                            </div>

                            <div
                                className="w-full"
                            >
                                <label className="font-bold" htmlFor="mobile"> Mobile</label>
                                <input type="number"
                                    className="p-4 mt-2 w-full rounded-lg outline-none border-2 border-purple-500 font-semibold text-purple-500"
                                    placeholder="User mobile..."
                                    value={signupData.mobile}
                                    onChange={(e) => setSignUpData({ ...signupData, mobile: e.target.value })}
                                />

                            </div>
                            <div
                                className="w-full"
                            >
                                <label className="font-bold" htmlFor="password"> Password</label>
                                <input type="password"
                                    className="p-4 mt-2 w-full rounded-lg outline-none border-2 border-purple-500 font-semibold text-purple-500"
                                    placeholder="User password..."
                                    value={signupData.password}
                                    onChange={(e) => setSignUpData({ ...signupData, password: e.target.value })}
                                />

                            </div>


                            <button
                            onClick={requestOTP}
                                className="p-3 my-2 px-6 font-bold bg-green-600 rounded-lg hover:bg-green-700"
                            >{loading ? <div className="flex justify-center items-center"><TailSpin height={30} color="white" /></div> : "Request OTP"}</button>
                        </div>
                }

                <div>
                    <p>Already have an account? <Link to={"/login"}><span className="text-blue-500 font-bold">Login</span></Link></p>
                </div>

                <div id="recaptcha-container"></div>

            </div>
        </>
    )
}


export default SignUp;