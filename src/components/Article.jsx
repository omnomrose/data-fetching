import { useEffect, useState } from "react";

export default function Article({ article }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    async function fetchAuthorData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${article.userId}`
        );
        const data = await response.json();
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    }

    fetchAuthorData();
  }, [article.userId]);

  return (
    <div className="post">
      <h3 className="centered-title">
        <a href={article.url} target="blank">
          {article.title}
        </a>
      </h3>

      {author && (
        <div className="authorInfo">
          <p>By:</p>
          <a href={`mailto:${author.email}`} className="author-name">
            {author.name}
          </a>
        </div>
      )}

      {article.body && (
        <div>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
}
