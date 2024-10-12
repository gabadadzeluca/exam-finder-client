import axios from "axios";
import { useEffect, useState } from "react";
import { GROUPS } from "./utils/groups";
import { formatDate } from "./utils/formatDate";
import { DataDisplay } from "./components/DataDisplay";

const API_URL = "http://localhost:5000/api/data";

const downloadExcel = async (examData: any, uniGroup: string) => {
  if (!isValidGroup(uniGroup)) return;
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

const isValidGroup = (group: string) => {
  return GROUPS.includes(group);
};

function App() {
  const [uniGroup, setUniGroup] = useState("");
  const [lastUniGroup, setLastUniGroup] = useState("");
  const [examData, setExamData] = useState<any[][] | null>(null);
  const [loading, setLoading] = useState(false);

  console.log("EXAMDATA:", examData);

  useEffect(() => {
    if (loading) {
      console.log("Loading new data...");
    }
  }, [loading]);

  const searchExams = async () => {
    const storedData = localStorage.getItem(uniGroup);
    // If there's cached data, parse it safely
    if (storedData) {
      console.log("Using cached data");
      setExamData(JSON.parse(storedData).examData);
      return;
    }

    if (uniGroup !== lastUniGroup && isValidGroup(uniGroup)) {
      console.log("FETCHING DATA");
      await fetchAPI(uniGroup);
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
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: { uniGroup: uniGroup },
      });
      console.log(response.data.examData);
      // Save the fetched data to local storage
      localStorage.setItem(
        uniGroup,
        JSON.stringify({
          lastSavedAt: Date.now(),
          examData: response.data.examData,
        })
      );
      setExamData(response.data.examData);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getLastRefresh = (group: string) => {
    // return the lastSavedAt property of data saved in local storage
    const storedData = JSON.parse(localStorage.getItem(group) || "{}");
    const lastRefreshed = storedData?.lastSavedAt;
    return formatDate(lastRefreshed); // add function to format time
  };

  const refreshExcel = async () => {
    if (isValidGroup(uniGroup)) {
      setLoading(true);
      await fetchAPI(uniGroup);
      setLoading(false);
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

      {loading && <p>Loading...</p>}
      {examData && isValidGroup(uniGroup) && (
        <p>Last Refreshed: {getLastRefresh(uniGroup)}</p>
      )}
      <button onClick={refreshExcel}>Refresh (Excel)</button>
      {examData && <DataDisplay examData={examData} />}
      {/* TEST BUTTON */}
      <button onClick={() => downloadExcel(examData, uniGroup)}>
        DOWNLOAD EXCEL FILE
      </button>
    </div>
  );
}

export default App;
