import { Table, TableCell } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getposts?userId=${currentUser?._id}`
        );
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message || "Failed to fetch posts.");
        } else {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length >= 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  ">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Post Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userPosts.map((post) => (
              <Table.Row
                key={post._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
              >
                <TableCell>{new Date(post.updatedAt).toDateString()}</TableCell>
                {/* <TableCell>{post.image}</TableCell> */}
                <TableCell>
                  <Link
                    className="font-medium text-gray-950 dark:text-white"
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <span className="font-medium text-red-400 hover:underline cursor-pointer">
                    Delete
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    className="text-teal-500 hover:underline"
                    to={`/update-post/${post._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </TableCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>There are no posts yet!</p>
      )}
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show More
        </button>
      )}
    </div>
  );
}
