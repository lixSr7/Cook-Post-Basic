import { useState, useEffect } from "react"
import "../Css/App.css";

// Componets
import NavBar from "./NavBar";//* NavBar
import { ScrollShadow } from "@nextui-org/react";
import { CreatePost } from "./CreatePost";//* Components create Post
import axios from "axios";//* Request http
import { PostImage, PostText } from "./Post";//* Component Post

function App() {
  // Theme

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "Tema claro" ? "dark" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // console.log(dataPost)

  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // data states

  const [dataPost, setDataPost] = useState([]);

  const fechDataPost = () => {
    axios
      .get("http://localhost:1234/post")
      .then(response => {
        setDataPost(response.data.reverse());
        console.log(response.data); // Mostrar la data por consola
      })
      .catch(error => console.log(error));
  }

  const handleCreatePost = () => {
    fechDataPost(); // Actualizar los posts al crear una nueva publicación
  };

  useEffect(() => {
    axios
      .get("http://localhost:1234/post")
      .then(response => {
        setDataPost(response.data.reverse());
        console.log(response.data); // Mostrar la data por consola
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <>
      <NavBar TogleTheme={toggleTheme} />

      <div className="flex w-full items-center flex-col gap-6">
        <CreatePost onCreatePost={handleCreatePost} />
        <ScrollShadow hideScrollBar className="w-full h-[650px] max-w-xl px-6">
          <div className="flex flex-col gap-5 w-full items-center">
            {
              dataPost.map(user => (
                user.Post.ImageURL ? (
                  <PostImage
                    key={user._id}
                    username={user.FullName}
                    nickname={user.NickName}
                    content={user.Post.Content}
                    hastag='I am cooker for ever'
                    followersAmout={'1000k'}
                    likesAmout={'1000k'}
                    imageURL={user.Post.ImageURL}
                    commentsAmout='100'
                    phothoURL={user.PhotoURL}
                    Id={user._id}
                    OnUpdatePost = {handleCreatePost}
                  />
                ) : (
                  <PostText
                    key={user._id}
                    username={user.FullName}
                    nickname={user.NickName}
                    content={user.Post.Content}
                    hastag='I am cooker for ever'
                    followersAmout={'1000k'}
                    likesAmout={'1000k'}
                    commentsAmout='100'
                    phothoURL={user.PhotoURL}
                    Id={user._id}
                    OnUpdatePost = {handleCreatePost}
                  />
                )
              ))
            }
          </div>
        </ScrollShadow>
      </div>
    </>
  );
}

export default App;
