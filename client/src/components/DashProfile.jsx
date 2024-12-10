import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto max-w-lg w-full p-3 ">
      <h1 className="my-7 p-3 font-semibold text-3xl text-center ">Profile</h1>
      <form className="flex flex-col w-full gap-4 ">
        <div className="w-32 h-32 self-center shadow-md cursor-pointer overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full border-8  border-[lightgray] boject-cover w-full h-full"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
        />
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="username"
        />
        <TextInput type="password" id="password" placeholder="**********" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
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
