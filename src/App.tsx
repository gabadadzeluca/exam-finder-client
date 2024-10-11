import axios from "axios";
import { useState } from "react";
import { GROUPS } from "./utils/groups";



const API_URL = "http://localhost:5000/api/users";

// const downloadExcel = async (examData ) => {
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
  const [lastUniGroup, setLastUniGroup] = useState("");
  const [examData, setExamData] = useState(null);
  console.log(uniGroup);

  const searchExams = () => {
    // ideas: 
    // create an array of all groups? 22-01-01 22-02-01 and so on
    // track uniGroup variable and compare it with a new uniGroup to see if both are valid?
    // save examData in localStorage and if group is different AND valid, then return new data

    if (uniGroup !== lastUniGroup && isValidGroup(uniGroup)) {
      console.log("FETCHING DATA")
      fetchAPI(uniGroup);
      setLastUniGroup(uniGroup);
    } else {
      console.log("DATA ALREADY EXISTS OR GROUP IS INVALID");
      console.log(examData);
    }
  };

  const fetchAPI = async (uniGroup: string) => {
    try {
      const response = await axios.get(API_URL, {
        params: { uniGroup: uniGroup },
      });
      console.log(response.data);
      setExamData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const isValidGroup = (group:string) => {
    return GROUPS.includes(group);
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
