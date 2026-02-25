import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";

const Signup = () => {
  const [fullName, setFullName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img src={String(assets.login_bg)} alt="Signup Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create Your Account
          </h3>

          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your expenses and managing your finances with ease. Join us today!
          </p>

          <form className="space-y-4">
            <div className="flex justify-center mb-6">
              <img src={String(assets.logo_icon)} alt="Logo" className="w-16 h-16" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Full Name"
                value={fullName}
                onchange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />

              <Input
                type="email"
                label="Email Address"
                value={email}
                onchange={(e) => setEmail(e.target.value)}
                placeholder="name@exmple.com"
              />

              <div className="col-span-2">
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onchange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>
            </div>

            {error && <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 text-lg font-medium inline-flex items-center justify-center bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              Sign Up
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?

              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;