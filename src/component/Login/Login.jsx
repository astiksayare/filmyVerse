
import { Link } from "react-router-dom";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { getDocs, query, where } from "firebase/firestore";
import {  usersRef } from "../../firebase/Firebase";
import { useContextData } from "../../context";


const Login = () => {

    const AppState = useContextData();
    const navigate = useNavigate();
    const [loginLoading, setLoginLoading] = useState(false);
    const [form, setForm] = useState({
        mobile: '',
        password: ''
    })

    const login = async () => {
        setLoginLoading(true);

        try {

            const quer = query(usersRef, where("mobile", "==", form.mobile));
            const userData = await getDocs(quer);
            
            userData.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
              
                if (isUser){
                    AppState.setLogin(true);
                    AppState.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        timer: 2000,
                        buttons: false
                    })

                    navigate("/");

                }else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        timer: 2000,
                        buttons: false
                    });
                }
                
            })
            
        } catch (error) {
            swal({
                title: error,
                icon: "error",
                timer: 2000,
                buttons: false
            });
        }

        setLoginLoading(false);
    }

    return (
        <>
        <div
        className="w-full h-screen p-4 flex flex-col gap-4 items-center fixed"
        >
            <h1
            className="mt-8 font-bold text-2xl"
            >Login</h1>

            <div
            className="w-full md:w-[30%] flex flex-col gap-4"
            >
                <div
                className="w-full"
                >
                    <label className="font-bold" htmlFor="mobile">User Mobile</label>
                    <input type="number" 
                    className="p-4 mt-2 w-full rounded-lg outline-none border-2 border-purple-500 font-semibold text-purple-500"
                    placeholder="User mobile..."
                    value={form.mobile}
                    onChange={(e) => setForm({...form, mobile: e.target.value})}
                    />

                </div>
                <div
                className="w-full"
                >
                    <label className="font-bold" htmlFor="password">User Password</label>
                    <input type="password" 
                    className="p-4 mt-2 w-full rounded-lg outline-none border-2 border-purple-500 font-semibold text-purple-500"
                    placeholder="User password..."
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    />

                </div>

                <button
                onClick={login}
                className="p-3 my-2 px-6 font-bold bg-green-600 rounded-lg hover:bg-green-700"
                >{loginLoading? <div className="flex justify-center items-center"><TailSpin height={30} color="white"/></div> : "Login"}</button>
            </div>

            <div>
                <p>Create new account? <Link to={"signup"}><span className="text-blue-500 font-bold">Sign Up</span></Link></p>
            </div>
        </div>
        </>
    )
}


export default Login;