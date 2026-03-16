import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Input from "../components/global/Input.jsx";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload.jsx";

import images from "../assets/images.js";

import {validateEmail} from "../utils/validations.js";
import {API_ENDPOINTS} from "../utils/api-endpoints.js";
import uploadProfileImage from "../utils/upload-profile-image.js";
import AxiosConfig from "../utils/AxiosConfig.jsx";

import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";

const Signup = () => {
  const [fullName, setFullName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl = null;

    setIsLoading(true);

    if (!profilePhoto || !profilePhoto.type.startsWith("image/")) {
      setError("Selected file must be an image.");
      setIsLoading(false);
      setProfilePhoto(null);
      return;
    }

    if (!fullName.trim()) {
      setError('Full Name is required.');
      setIsLoading(false);
      return;
    }

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
      if (profilePhoto) {
        const uploadResult = await uploadProfileImage(profilePhoto);

        if (uploadResult.ok) {
          profileImageUrl = uploadResult.url || null;
        }
      }

      const response = await AxiosConfig.post(API_ENDPOINTS.PROFILE.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      if (response.status === 201) {
        toast.success(
          "Account created successfully! Please check your email to activate your account.", {
          duration: 5000,
        });

        navigate("/login");
      }
    } catch (error) {
      console.error("signup error:", error);
      setError("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img src={String(images.loginBackground)} alt="Signup Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-center mb-6">
            <img src={String(images.logo)} alt="Logo" className="w-16 h-16" />
          </div>

          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create Your Account
          </h3>

          <p className="text-sm text-slate-700 text-center mb-4">
            Start tracking your expenses and managing your finances with ease. Join us today!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center -mb-4">
              <ProfilePhotoUpload photo={profilePhoto} setPhoto={setProfilePhoto} />
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
              className={`w-full py-3 text-lg font-medium inline-flex items-center justify-center bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition uppercase ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" size={20} />
                  Signing Up...
                </>
              ) : (
                "SIGNUP"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?

              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;