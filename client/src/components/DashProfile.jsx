import { useSelector } from "react-redux";
import { TextInput, Button, Alert } from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import { updateFailure,updateStart,updateSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made')
      return;
    } 
    try {
      dispatch(updateStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message))
        setUpdateUserError(data.message)
      }else{
        dispatch(updateSuccess(data))
        setUpdateUserSuccess("User updated successfully")

      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }
  };
  return (
    <div className="mx-auto max-w-lg w-full p-3">
      <h1 className="my-7 p-3 font-semibold text-3xl text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
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
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="**********"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="tealToLime" outline>
          Update Profile
        </Button>
      </form>
      <div className="flex justify-between text-red-500 mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
}
