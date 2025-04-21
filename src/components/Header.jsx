import { useNavigate } from "react-router";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
import { LOGO, MOBILE_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { Rocket, ChevronDownCircle } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPT = useSelector((store) => store.gpt.showGPTSearch);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // User signed out
      })
      .catch((error) => {
        navigate("/error");
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGPTSearch = () => {
    dispatch(toggleGPTSearch());
  };

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target?.value));
  };

  return (
    <>
      {/* DESKTOP HEADER */}
      <div className='fixed hidden md:flex bg-gradient-to-b w-screen flex-col md:flex-row justify-between from-black px-8 py-2 z-50'>
        <img
          className='w-44 hidden md:block md:mx-0'
          src={LOGO}
          alt='netflix-logo'
        />

        {user && (
          <div className='flex mt-3 mx-auto justify-between md:mx-0'>
            {showGPT && (
              <select
                onChange={handleLanguage}
                className='bg-brand-coal mr-2 text-xs text-white h-9 px-4 rounded-full'
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang?.identifier} value={lang?.identifier}>
                    {lang?.name}
                  </option>
                ))}
              </select>
            )}

            <div title="GPT Mode">
              <button
                onClick={handleGPTSearch}
                className='px-3 w-[43px] mr-2 ml-2 py-3 hover:bg-opacity-80 bg-brand-charcoal rounded-full text-white font-semibold'
              >
                {showGPT ? (
                  <Rocket color='yellow' className='my-[-2px] py-1 ml-[-2px]' fill='yellow' />
                ) : (
                  <Rocket className='my-[-2px] py-1 ml-[-2px]' />
                )}
              </button>
            </div>

            <div
              className='flex cursor-pointer'
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img className='h-10 rounded-full' src={user?.photoURL} alt='' />
              <ChevronDownCircle color='white' className='mt-2 ml-1' />
            </div>
          </div>
        )}

        {/* Dropdown menu */}
        <div
          className={`absolute right-7 rounded-xl w-[150px] top-[70px] z-50 ${
            menuOpen ? "flex flex-col justify-around" : "hidden"
          } bg-brand-charcoal h-[200px]`}
        >
          <p className='text-white bg-brand-purple px-1 py-1 text-center'>
            Namaste, {user?.displayName}
          </p>

          <Link to={"/"}>
            <p className='text-white cursor-pointer text-center'>Home</p>
          </Link>

          <button
            onClick={handleSignOut}
            className='ml-10 text-xs py-1 rounded-full w-[50%] hover:bg-opacity-80 bg-brand-red text-white'
          >
            Logout
          </button>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className='sticky top-0 flex z-50 md:hidden'>
        <img
          className='w-[50px] mt-5 ml-2'
          src={MOBILE_LOGO}
          alt='netflix-logo'
        />
        <div className='flex ml-3 mt-5'>
          {/* Placeholder for mobile search or menu */}
        </div>
      </div>
    </>
  );
};

export default Header;