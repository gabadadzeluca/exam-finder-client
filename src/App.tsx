import axios from "axios";
import { useEffect, useState } from "react";
import { DataDisplay } from "./components/DataDisplay";
import { formatDate } from "./utils/formatDate";
import { GROUPS } from "./utils/groups";
import { Input } from "./components/Input";
import styled from "styled-components";
import searchIcon from "./assets/svgs/searchIcon.svg";
import brightSearchIcon from "./assets/svgs/searchIconBright.svg";
import { Button } from "./components/Button";
import excelColoredIcon from "./assets/svgs/excelColored.svg";
import downloadIcon from "./assets/svgs/download.svg";
import { COLORS } from "./utils/colors";
// import 'ldrs/ring'

import { ring2 } from "ldrs";

ring2.register();

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
    <SMainContainerDiv>
      <SInputDiv>
        <Input
          placeholder="ჩაწერე ჯგუფის ნომერი"
          type="text"
          onChange={(event) => setUniGroup(event.target.value)}
        />
        <SSearchButton onClick={searchExams}></SSearchButton>
      </SInputDiv>

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
          Last Refreshed: {getLastRefresh(uniGroup)}
        </SLastRefreshP>
      )}


      <SDataAndButtonsDiv>
        {examData && <DataDisplay examData={examData} />}
        <SButtonsDiv>
          <Button
            onClick={refreshExcel}
            value="განახლება"
            icon={excelColoredIcon}
            width="10rem"
            height="4rem"
            // bgColor="#101010"
          />
          <Button
            onClick={() => downloadExcel(examData, uniGroup)}
            value="გადმოწერა (xlsx)"
            icon={downloadIcon}
            width="13rem"
            height="4rem"
            // bgColor="#101010"
          />
        </SButtonsDiv>
      </SDataAndButtonsDiv>

    </SMainContainerDiv>
  );
}

export default App;

const SFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SMainContainerDiv = styled(SFlexContainer)`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  color: ${COLORS.GREENISH_BLUE};
`;
const SInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 40%;
  justify-content: space-between;
  border: 0.125rem solid white;
  border-radius: 0.8rem;
  margin-top: 4rem;
  margin-bottom: 5rem;
`;

const SSearchButton = styled.button`
  all: unset;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  width: 20%;

  &:hover {
    cursor: pointer;
    background-image: url(${brightSearchIcon});
  }
`;

const SButtonsDiv = styled(SFlexContainer)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > div{
    margin-bottom: 3rem;
  }
`;

const SLoadingDiv = styled.div``;
const SLastRefreshP = styled.p`
  font-size: 1.25rem;
`;

const SDataAndButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
`