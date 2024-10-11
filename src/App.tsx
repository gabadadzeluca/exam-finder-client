import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/users";

// const downloadExcel = async (examData : any ) => {
//   try {
//     const response = await axios.get('http://localhost:5000/excel/download', {
//       params: {
//         examData: examData
//       },
//       responseType: 'blob' // Important for handling binary data
//     });

//     // Create a URL for the blob and trigger the download
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'exams_excel.xlsx'); // Specify the file name
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } catch (error) {
//     console.error('Error downloading the file', error);
//   }
// };

function App() {
  const [uniGroup, setUniGroup] = useState("");
  const [examData, setExamData] = useState();
  console.log(uniGroup);

  const searchExams = () => {
    fetchAPI(uniGroup);
  };

  const fetchAPI = async (uniGroup: string) => {
    try {
      const response = await axios.get(API_URL, {
        params: { uniGroup: uniGroup },
      });
      console.log(response.data);
      setExamData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
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
