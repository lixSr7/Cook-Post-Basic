import { useState, useEffect } from "react";
import "../Css/App.css";

// Componets
import { ScrollShadow } from "@nextui-org/react";
import axios from "axios";

// Resto de las importaciones...
import NavBar from "./NavBar"; //* NavBar
import { CreatePost } from "./CreatePost"; //* Components create Post
import { PostImage, PostText } from "./Post"; //* Component Post
import { Button } from "@nextui-org/react";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "Tema claro" ? "dark" : "light"
  );

  const [dataPost, setDataPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIsDisable, setFilterIsDisable] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const fechDataPost = () => {
    axios
      .get("http://localhost:1234/post")
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
      .get("http://localhost:1234/post")
      .then((response) => {
        setDataPost(response.data.reverse());
        console.log(response.data); // Mostrar la data por consola
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredPosts = dataPost.filter((post) => {
    const containsSearchTerm =
      post.FullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.NickName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.Post.Content.toLowerCase().includes(searchTerm.toLowerCase());

    const passesIsDisableFilter = !filterIsDisable || post.Post.IsDisable;

    return containsSearchTerm && passesIsDisableFilter;
  });

  const generateFullReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    doc.autoTable({
      head: [["Nombre", "Estado", "Fecha de Creación", "Contenido"]],
      body: dataPost.map((post) => [
        post.FullName,
        post.Post.IsDisable ? "Inactivo" : "Activo",
        post.Post.CreateAt,
        post.Post.Content,
      ]),
      startY: 40,
      margin: { top: 30 },
      headStyles: { fillColor: [150, 150, 150] },
      bodyStyles: { fillColor: [240, 240, 240] },
    });

    // Encabezado
    doc.setFontSize(18);
    doc.text("Cookie", 10, 22, {
      align: "right",
    });

    // Pie de página
    doc.setFontSize(12);
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10
      );
      doc.text(
        `Fecha de Generación: ${currentDate}`,
        doc.internal.pageSize.width - 100,
        10
      );
      doc.text(
        "Todos los derechos reservados a Cookie@",
        14,
        doc.internal.pageSize.height - 5
      );
    }

    doc.save("full_report.pdf");
  };

  const generateActiveReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    doc.autoTable({
      head: [["Nombre", "Fecha de Creación", "Contenido"]],
      body: dataPost
        .filter((post) => !post.Post.IsDisable)
        .map((post) => [post.FullName, post.Post.CreateAt, post.Post.Content]),
      startY: 40,
      margin: { top: 30 },
      headStyles: { fillColor: [150, 150, 150] },
      bodyStyles: { fillColor: [240, 240, 240] },
    });

    // Encabezado
    doc.setFontSize(18);
    doc.text("Cookie", doc.internal.pageSize.width - 30, 22, {
      align: "right",
    });

    // Pie de página
    doc.setFontSize(12);
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10
      );
      doc.text(
        `Fecha de Generación: ${currentDate}`,
        doc.internal.pageSize.width - 100,
        10
      );
      doc.text(
        "Todos los derechos reservados a Cookie@",
        14,
        doc.internal.pageSize.height - 5
      );
    }

    doc.save("active_report.pdf");
  };

  const generateInactiveReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    doc.autoTable({
      head: [["Nombre", "Fecha de Creación", "Contenido", "Descripción"]],
      body: dataPost
        .filter((post) => post.Post.IsDisable)
        .map((post) => [
          post.FullName,
          post.Post.CreateAt,
          post.Post.Content,
          "Contenido violento",
        ]),
      startY: 40,
      margin: { top: 30 },
      headStyles: { fillColor: [150, 150, 150] },
      bodyStyles: { fillColor: [240, 240, 240] },
    });

    // Encabezado
    doc.setFontSize(18);
    doc.text("Cookie", doc.internal.pageSize.width - 30, 22, {
      align: "right",
    });

    // Pie de página
    doc.setFontSize(12);
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${pageCount}`,
        14,
        doc.internal.pageSize.height - 10
      );
      doc.text(
        `Fecha de Generación: ${currentDate}`,
        doc.internal.pageSize.width - 100,
        10
      );
      doc.text(
        "Todos los derechos reservados a Cookie@",
        14,
        doc.internal.pageSize.height - 5
      );
    }

    doc.save("inactive_report.pdf");
  };
  return (
    <>
      <NavBar TogleTheme={toggleTheme} />
      <section className="flex justify-between px-6">
        {/* <Notifications /> */}
        <article className="flex w-full items-center flex-col gap-6">
          <CreatePost onCreatePost={handleCreatePost} />
          <input
            type="text"
            placeholder="Buscar posts..."
            className="px-4 py-3 w-full max-w-lg rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={filterIsDisable}
              onChange={() => setFilterIsDisable(!filterIsDisable)}
            />
            Mostrar solo posts Inactivos
          </label>

          <ScrollShadow
            hideScrollBar
            className="w-full h-[650px] max-w-xl px-6"
          >
            <div className="flex gap-4 mb-10">
              <button
                className=" bg-blue-600 text-sm rounded-md text-white"
                color="primary"
                variant="solid"
                onClick={generateFullReport}
              >
                <span>Generar Reporte Completo</span>
              </button>
              <button
                className=" bg-blue-600 text-sm rounded-md text-white"
                color="primary"
                variant="solid"
                onClick={generateActiveReport}
              >
                <span> Generar Reporte de Activos</span>
              </button>
              <button
                className=" bg-blue-600 text-sm rounded-md text-white"
                color="primary"
                variant="solid"
                onClick={generateInactiveReport}
              >
                <span> Generar Reporte de Inactivos</span>
              </button>
            </div>
            <div className="flex flex-col gap-5 w-full items-center">
              {filteredPosts.map((user) =>
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
          </ScrollShadow>
        </article>
        {/* <Friends /> */}
      </section>
    </>
  );
}

export default App;
