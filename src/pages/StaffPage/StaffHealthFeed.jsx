import React, { useState, useEffect } from "react";
import axios from "axios";
import StaffHeader from "../../components/StaffComp/StaffHeader";
import Article from "../../components/Articles";

const StaffHealthFeed = () => {
  // const [healthData, setHealthData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=141d43fa8964418b803cb0c1063f6ecd"
  //     );

  //     console.log(response);
  //     setHealthData(response.data.articles);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <>
      <StaffHeader />
      <Article/>

      {/* <div className="text-white">
      <h1 className="text-center mt-6 font-bold text-3xl md:text-4xl text-color underline">HealthFeed</h1>
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
              <h3 className="text-md font-bold text-center md:text-left">
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
      </div> */}
    </>
  );
};

export default StaffHealthFeed;
