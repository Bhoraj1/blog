import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";
import { useRef, useState, useEffect } from "react";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("uploading image...");
  };
  return (
    <div className="mx-auto max-w-lg w-full p-3">
      <h1 className="my-7 p-3 font-semibold text-3xl text-center">Profile</h1>
      <form className="flex flex-col w-full gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center shadow-md cursor-pointer overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full border-8 border-[lightgray] object-cover w-full h-full"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
        />
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
        />
        <TextInput type="password" id="password" placeholder="**********" />
        <Button type="submit" gradientDuoTone="tealToLime" outline>
          Update Profile
        </Button>
      </form>
      <div className="flex justify-between text-red-500 mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
