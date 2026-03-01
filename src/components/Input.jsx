import {useState} from "react";

import {Eye, EyeOff} from "lucide-react";

const Input = ({type, label, value, onchange, placeholder}) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-1" htmlFor={label}>
        {label}
      </label>

      <div className="relative">
        <input
          className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading focus:outline-none focus:border-blue-500"
          id={label}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={(e) => onchange(e)}
          placeholder={placeholder}
        />

        {type === "password" && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <Eye
                size={20}
                className="text-primary-400 hover:text-indigo-600"
              />
            ) : (
              <EyeOff
                size={20}
                className="text-slate-400 hover:text-indigo-600"
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;