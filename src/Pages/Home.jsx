import { useState, useEffect } from "react";
import { ScrollShadow, Spinner } from "@nextui-org/react";
import { CreatePost } from "../Components/Posts/CreatePost";
import axios from "axios";
import { PostImage, PostText } from "../Components/Posts/Post";

function Home() {
  const [dataPost, setDataPost] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fechDataPost = () => {
    axios
      .get("https://cookie-beta-post-mobile-m5j8.onrender.com/post")
      .then((response) => {
        setDataPost(response.data.reverse());
        console.log(response.data); // Mostrar la data por consola
      })
      .catch((error) => console.log(error));
  };

  const handleCreatePost = () => {
    fechDataPost();
  };

  useEffect(() => {
    axios
      .get("https://cookie-beta-post-mobile-m5j8.onrender.com/post")
      .then((response) => {
        setDataPost(response.data.reverse());
        setisLoading(false)
        console.log(response.data); // Mostrar la data por consola
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="flex justify-between px-6">
      <article className="flex w-full items-center flex-col gap-6">
        <CreatePost onCreatePost={handleCreatePost} />

        <ScrollShadow hideScrollBar className="w-full h-[650px] max-w-xl px-6">
          {isLoading ? (
            <div className=" w-full h-full grid place-content-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex flex-col gap-5 w-full items-center">
              {dataPost.map((user) =>
                user.Post.ImageURL ? (
                  <PostImage
                    key={user._id}
                    username={user.FullName}
                    nickname={user.NickName}
                    content={user.Post.Content}
                    hastag="I am cooker for ever"
                    followersAmout={"1000k"}
                    likesAmout={"1000k"}
                    imageURL={user.Post.ImageURL}
                    commentsAmout="100"
                    phothoURL={user.PhotoURL}
                    Id={user._id}
                    OnUpdatePost={handleCreatePost}
                    status={user.Post.IsDisable}
                  />
                ) : (
                  <PostText
                    key={user._id}
                    username={user.FullName}
                    nickname={user.NickName}
                    content={user.Post.Content}
                    hastag="I am cooker for ever"
                    followersAmout={"1000k"}
                    likesAmout={"1000k"}
                    commentsAmout="100"
                    phothoURL={user.PhotoURL}
                    Id={user._id}
                    OnUpdatePost={handleCreatePost}
                    status={user.Post.IsDisable}
                  />
                )
              )}
            </div>
          )}
        </ScrollShadow>
      </article>
      {/* <Friends /> */}
    </section>
  );
}

export default Home;
