import axios from "axios";
import { useEffect, useState } from "react";
import { GROUPS } from "./utils/groups";
import { formatDate } from "./utils/formatDate";

const API_URL = "http://localhost:5000/api/data";

const downloadExcel = async (examData: any) => {
  console.log("EXAMDATA FROM DOWNLOAD", JSON.stringify(examData));
  try {
    const response = await axios.get("http://localhost:5000/excel/download", {
      params: {
        examData: JSON.stringify(examData),
      },
      responseType: "blob",
    });

    // Create a URL for the blob and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "exams_excel.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};

const displayExamData = (data: any[]) => {
  if (data != null && data.length > 0) {
    return data.map((arr, rowIndex) => (
      <div key={rowIndex} style={{ marginBottom: "10px" }}>
        {arr.map((value: string, colIndex: number) => (
          <div key={colIndex}>{value}</div>
        ))}
      </div>
    ));
  }
};

const isValidGroup = (group: string) => {
  return GROUPS.includes(group);
};

function App() {
  const [uniGroup, setUniGroup] = useState("");
  const [lastUniGroup, setLastUniGroup] = useState("");
  const [examData, setExamData] = useState(null);

  console.log("EXAMDATA:", examData);

  const searchExams = () => {
    const storedData = localStorage.getItem(uniGroup);
    // If there's cached data, parse it safely
    if (storedData) {
      console.log("Using cached data");
      setExamData(JSON.parse(storedData).examData);
      return;
    }

    if (uniGroup !== lastUniGroup && isValidGroup(uniGroup)) {
      console.log("FETCHING DATA");
      fetchAPI(uniGroup);
      setLastUniGroup(uniGroup);
    } else if (!isValidGroup(uniGroup)) {
      console.log("GROUP IS INVALID");
    } else {
      console.log("DATA ALREADY EXISTS");
      console.log(examData);
    }
  };

  const fetchAPI = async (uniGroup: string) => {
    try {
      const response = await axios.get(API_URL, {
        params: { uniGroup: uniGroup },
      });
      console.log(response.data);
      // Save the fetched data to local storage
      localStorage.setItem(
        uniGroup,
        JSON.stringify({
          lastSavedAt: Date.now(),
          examData: response.data.examData,
        })
      );
      setExamData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const getLastRefresh = (group: string) => {
    // return the lastSavedAt property of data saved in local storage
    const storedData = JSON.parse(localStorage.getItem(group) || "{}");
    const lastRefreshed = storedData?.lastSavedAt;
    return formatDate(lastRefreshed); // add function to format time
  };

  const refreshExcel = () => {
    // make a new request and update data
    fetchAPI(uniGroup);
    // update the state, bc the displayed data isnt getting displayed after the refresh
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ჩაწერეთ ჯგუფის სახელი"
        onChange={(event) => setUniGroup(event.target.value)}
      />
      <button onClick={searchExams}>Search</button>

      {examData && isValidGroup(uniGroup) && (
        <p>Last Refreshed: {getLastRefresh(uniGroup)}</p>
      )}
      <button onClick={refreshExcel}>Refresh (Excel)</button>
      {examData && displayExamData(examData)}
      {/* TEST BUTTON */}
      <button onClick={() => downloadExcel(examData)}>
        DOWNLOAD EXCEL FILE
      </button>
    </div>
  );
}

export default App;
