import {useRef, useState} from "react";

import {Upload, User, X} from "lucide-react";

const ProfilePhotoUpload = ({ photo, setPhoto }) => {
  /*
   * useRef is used to create a reference to the hidden file input element.
   * this allows us to programmatically trigger a click on the input when the user clicks the "Choose Photo" button.
  */
  const inputRef = useRef(null);

  /*
   * useState is used to manage the state of the preview URL for the selected photo.
  */
  const [previewURL, setPreviewURL] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);

      const previewURL = URL.createObjectURL(file);

      setPreviewURL(previewURL);
    }
  }

  const handleRemovePhoto = (e) => {
    e.preventDefault();

    setPhoto(null);

    setPreviewURL(null);

    inputRef.current.value = null;
  }

  const onChoosePhotoClick = (e) => {
    e.preventDefault();

    /*
     * ? is used to check if the inputRef.current is not null before calling the click method.
     * This prevents potential errors if the ref is not properly attached to the input element.
    */
    inputRef.current?.click();
  }

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      {!photo ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <User className="w-10 h-10 text-purple-500" size={35} />
          <button
            type="button"
            onClick={onChoosePhotoClick}
            className="absolute inset-0 bg-black bg-opacity-25 text-white opacity-0 hover:opacity-100 rounded-full flex items-center justify-center transition"
          >
            <Upload className="w-5 h-5" size={35} />
          </button>
        </div>
      ) : (
        <div className="w-30 h-30 rounded-full relative">
          <img src={String(previewURL)} alt="Profile Preview" className="w-full h-full object-cover" />
          <X
            className="w-5 h-5 text-white bg-red-500 bg-opacity-50 rounded-full absolute top-1 -right-3 cursor-pointer"
            onClick={handleRemovePhoto}
          />
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoUpload;