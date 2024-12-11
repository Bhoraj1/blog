import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from 'react-redux';

export default function UpdatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message || "Failed to fetch posts.");
          setPublishError(data.message || "Failed to fetch posts.");
          return;
        } else {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Update Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a Category</option>
            <option value="1">This is 1</option>
            <option value="2">This is 2</option>
            <option value="3">This is 3</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 border-4 border-teal-500 border-dotted p-3 ">
          <FileInput type="text" accept="image/*" />
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            size="sm"
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          value={formData.content}
          className="h-72 mb-12"
          placeholder="write something..."
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
