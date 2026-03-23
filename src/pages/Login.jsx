import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Input from "../components/global/Input.jsx";

import {AppContext} from "../contexts/AppContext.jsx";

import images from "../assets/images.js";

import AxiosConfig from "../utils/AxiosConfig.jsx";
import {validateEmail} from "../utils/validations.js";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";

import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const {setUser} = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Email is required and must be valid.');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
        setError('Password is required.');
        setIsLoading(false);
        return;
    }

    setError(null);

    try {
      const response = await AxiosConfig.post(API_ENDPOINTS.PROFILE.LOGIN, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          localStorage.setItem('token', token);
          setUser(user);
          navigate('/dashboard');
        }

        toast.success(
            'Welcome back ' + user.fullName.split(' ')[0] + '👋',{
            duration: 5000,
          }
        );
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 400) {
        toast.error(
          error.response.data.message || 'An error occurred while trying to log in. Please try again.', {
            duration: 5000,
          }
        );
      } else {
        console.error('login error:', error.response.data);

        setError('An error occurred while trying to log in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img src={String(images.loginBackground)} alt="Signup Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>

          <p className="text-sm text-slate-700 text-center mb-4">
            Log in to your account and start managing your finances with ease.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email Address"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
              placeholder="name@exmple.com"
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onchange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />

            {error && <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

            <button
              type="submit"
              className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded cursor-pointer ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2 text-center inline-block" size={20} />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;