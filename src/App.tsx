import axios from "axios";
import { ring2 } from "ldrs";
import { useEffect, useState } from "react";
import {
  SButtonsDiv,
  SDataAndButtonsDiv,
  SInputDiv,
  SLastRefreshP,
  SLogo,
  SLoadingDiv,
  SMainContainerDiv,
  SSearchButton,
  SError,
  SLabel,
  SInputWrapper,
} from "./App.styled";
import downloadIcon from "/assets/svgs/download.svg";
import excelColoredIcon from "/assets/svgs/excelColored.svg";
import { Button } from "./components/Button";
import { DataDisplay } from "./components/DataDisplay";
import { Input } from "./components/Input";
import { formatDate } from "./utils/formatDate";
import { GROUPS } from "./utils/groups";
import excelSvg from "/assets/svgs/excel.svg";
import { Footer } from "./components/Footer";

ring2.register();

const API_URL = "https://exam-finder-server-production.up.railway.app";

const ERROR_MSG = "ჯგუფი არ არსებობს, ან ჯერ არ არის დამატებული";
const LABEL_MSG =
  " ⓘ ჯგუფის ფორმატია: 23-10-04, 22-01-01 და ა.შ. შეიყვანეთ ჯგუფი და დააჭირეთ ძიების ღილაკს";

const downloadExcel = async (examData: any, uniGroup: string) => {
  if (!isValidGroup(uniGroup)) return;
  console.log("EXAMDATA FROM DOWNLOAD", JSON.stringify(examData));
  try {
    const response = await axios.post(
      `${API_URL}/excel/download`,
      { examData: examData }, // Send examData as JSON in the body
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

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
  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg("");
      console.log("Using cached data");
      setExamData(JSON.parse(storedData).examData);
      return;
    }

    if (uniGroup !== lastUniGroup && isValidGroup(uniGroup)) {
      setErrorMsg("");
      console.log("FETCHING DATA");
      await fetchAPI(uniGroup);
      setLastUniGroup(uniGroup);
    } else if (!isValidGroup(uniGroup)) {
      // set error to true;
      setErrorMsg(ERROR_MSG);
      console.log("GROUP IS INVALID");
    } else {
      setErrorMsg("");
      console.log("DATA ALREADY EXISTS");
      console.log(examData);
    }
  };

  const fetchAPI = async (uniGroup: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/data`, {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isValidGroup(value)) setErrorMsg("");
    setUniGroup(value);
  };

  return (
    <SMainContainerDiv>
      <SLogo $logo={excelSvg} />

      <SInputWrapper>
        <SLabel>{LABEL_MSG}</SLabel>
        <SInputDiv>
          <Input
            placeholder="ჩაწერეთ ჯგუფის ნომერი"
            type="text"
            onChange={handleInputChange}
          />
          <SSearchButton onClick={searchExams}></SSearchButton>
        </SInputDiv>
      </SInputWrapper>

      {errorMsg.length > 0 && <SError>{errorMsg}</SError>}
      {loading && (
        <SLoadingDiv>
          <l-ring-2
            size="35"
            stroke="4"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="#DFF3E4"
          ></l-ring-2>
        </SLoadingDiv>
      )}

      {examData && isValidGroup(uniGroup) && (
        <SLastRefreshP>
          ბოლოს განახლდა: {getLastRefresh(uniGroup)}
        </SLastRefreshP>
      )}

      {examData && (
        <SDataAndButtonsDiv>
          <DataDisplay examData={examData} />
          <SButtonsDiv>
            <Button
              onClick={refreshExcel}
              value="განახლება"
              icon={excelColoredIcon}
              width="10rem"
              height="4rem"
            />
            <Button
              onClick={() => downloadExcel(examData, uniGroup)}
              value="გადმოწერა (xlsx)"
              icon={downloadIcon}
              width="13rem"
              height="4rem"
            />
          </SButtonsDiv>
        </SDataAndButtonsDiv>
      )}
      <Footer />
    </SMainContainerDiv>
  );
}

export default App;
