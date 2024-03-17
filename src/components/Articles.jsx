import React, { useState, useEffect } from "react";
import axios from "axios";

const Article = () => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=141d43fa8964418b803cb0c1063f6ecd"
      );
      setHealthData(response.data.articles);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching news data:", error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div id="healthnews" className="min-h-screen py-4 text-white">
      <h1 className="text-center mt-6 font-bold text-3xl md:text-4xl text-color underline">
        HealthFeed
      </h1>

      {/* Conditionally render loading indicator */}
      {loading && (
        <div className="flex justify-center items-center mt-8">
        <div className="loader"></div>
      </div>
      )}

      {!loading && (
        <>
          {healthData.map((article) =>
            article.urlToImage ? (
              <div
                key={article.title}
                className="flex flex-col md:flex-row bg-color items-center justify-between p-4 m-4 rounded-lg"
              >
                <div className="flex-shrink-0 w-full md:w-1/4 h-40 md:h-40 mb-4 md:mb-0">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="text-lg md:text-2xl md:mb-8 font-bold text-center md:text-left">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs">{article.description}</p>
                  <p className="text-right mt-auto text-xs italic">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : null
          )}
          <div className="text-center">
            <a
              href="https://timesofindia.indiatimes.com/life-style/health-fitness/health-news"
              target="_blank"
              rel="noopener noreferrer"
              className="text-color hover:text-[#0A5872] font-bold hover:underline"
            >
              Read More...
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Article;
