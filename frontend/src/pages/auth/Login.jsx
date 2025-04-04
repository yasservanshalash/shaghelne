import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/slices/userSlice";
import { loginUser } from "../../redux/thunk/auth";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faCheck 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebookF, 
  faGoogle, 
  faApple 
} from "@fortawesome/free-brands-svg-icons";

export default function LoginPage() {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Redux hooks
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, rememberMe } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(userActions.clearError());
    };
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleRememberMe = (e) => {
    dispatch(userActions.setRememberMe(e.target.checked));
  };

  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-50" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-full lg:w-1/2 mx-auto animate-fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">تسجيل الدخول</h2>
                <p className="text-gray-600 mb-8">
                  امنح زائرك تجربة سلسة عبر الإنترنت مع تصميم تجربة مستخدم قوية
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in-right">
            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/5">
              <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-2">يسعدنا رؤيتك مرة أخرى!</h4>
                  <p className="text-gray-600">
                    ليس لديك حساب؟{" "}
                    <Link to="/register" className="text-green-600 hover:text-green-700">
                      سجل الآن!
                    </Link>
                  </p>
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      كلمة المرور
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between mb-5">
                    <label className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
                      <input 
                        type="checkbox" 
                        className="ml-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                      />
                      تذكرني
                    </label>
                    <a className="text-sm text-green-600 hover:text-green-700 cursor-pointer">نسيت كلمة المرور؟</a>
                  </div>
                  <div className="mb-5">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? "جاري تسجيل الدخول..." : (
                        <>
                          تسجيل الدخول <FontAwesomeIcon icon={faArrowRight} className="mr-2 rotate-180" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="relative flex items-center mb-5">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600 text-sm">أو</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:space-x-4 md:space-x-reverse">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md mb-3 md:mb-0 flex items-center justify-center"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="ml-2" />
                    متابعة باستخدام فيسبوك
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md mb-3 md:mb-0 flex items-center justify-center"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faGoogle} className="ml-2" />
                    متابعة باستخدام جوجل
                  </button>
                  <button 
                    className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faApple} className="ml-2" />
                    متابعة باستخدام آبل
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
