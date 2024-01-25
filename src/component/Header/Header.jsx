
import { Link } from "react-router-dom";
import { useContextData } from "../../context";

const Header = () => {

    const {login} = useContextData();

    return (

        <>
            <header
                className="w-full h-[7vh] bg-slate-800 p-4 flex items-center justify-start sticky top-0 z-10"
            >
                <nav
                    className="w-full px-4 flex justify-between items-center"
                >
                    <Link
                        to={"/"}
                    >
                        {/* Logo */}
                        <h1 className="text-2xl font-bold font-serif">filmy<span className="text-red-500">Verse</span></h1>
                    </Link>

                    {/* Login and Add Movie button */}
                    { 
                    login ?

                    <Link
                    to={"addmovie"}
                    >
                    <button
                        className="p-2.5 px-5 bg-blue-500 font-semibold rounded-lg hover:bg-blue-400 active:bg-green-500 duration-500"
                    >Add Movie</button>
                    </Link>

                    :

                    <Link
                        to={"login"}
                    >
                        <button
                            className="p-2.5 px-5 bg-blue-500 font-semibold rounded-lg hover:bg-blue-400 active:bg-green-500 duration-500"
                        >Login</button>
                    </Link>

                    }

                </nav>
            </header>
        </>
    )
}

export default Header;