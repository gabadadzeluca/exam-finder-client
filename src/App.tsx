import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

const fetchAPI = async (uniGroup: string) => {
  try {
    const response = await axios.get(API_URL, {
      params: { uniGroup: uniGroup },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function App() {
  const [uniGroup, setUniGroup] = useState("");
  console.log(uniGroup);

  const searchExams = () => {
    fetchAPI(uniGroup);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ჩაწერეთ ჯგუფის სახელი"
        onChange={(event) => setUniGroup(event.target.value)}
      />
      <button onClick={searchExams}>Search</button>
    </div>
  );
}

export default App;
