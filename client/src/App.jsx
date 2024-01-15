import React, { useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/scrapedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: url }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-rose-500 w-[90%] flex flex-col items-center justify-center p-4">
      <input
        type="url"
        className="p-2 outline-none border-2 w-[90%] rounded-2xl"
        placeholder="Enter a link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-2xl w-[90%] mt-3"
        onClick={fetchData}
      >
        Fetch Data
      </button>
      {loading && <p>Loading...</p>}
      <div className="">
        <p>Title: {data.title}</p>
        <p>Description: {data.description}</p>
      </div>

      <div className="flex justify-between items-center gap-5 w-[90%] bg-gray-400 mt-3">
        <div className="w-[50%] bg-blue-500">60%</div>
        <div className="w-[50%] bg-blue-600">89</div>
      </div>
    </div>
  );
};

export default App;
