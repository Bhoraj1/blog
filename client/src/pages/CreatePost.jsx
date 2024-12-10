import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Create Post</h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type="text" placeholder="Title" required className="flex-1" />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 border-4 border-teal-500 border-dotted p-3 ">
          <FileInput type='text' accept="image/*" />
          <Button type="submit" gradientDuoTone="purpleToBlue" outline size="sm">
            Upload Image
          </Button>
        </div> 
        <ReactQuill theme="snow" className="h-72 mb-12" placeholder="write something..." required />
        <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
      </form>
    </div>
  )
}
