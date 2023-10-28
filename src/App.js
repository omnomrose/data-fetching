import { useEffect, useState } from "react";
import Article from "./components/Article";

import "./styles.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  //ref has only one property

  useEffect(() => {
    const source_url = `https://jsonplaceholder.typicode.com/posts`;
    setLoading(true);

    async function getArticles() {
      try {
        const response = await fetch(source_url);
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    getArticles();
  }, []);

  return (
    <div className="App">
      <div>
        <h1 className="header">Recent Posts</h1>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        articles.map(function (article) {
          return <Article key={article.id} article={article} />;
        })
      )}
    </div>
  );
}
