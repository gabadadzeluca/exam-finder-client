import styled from "styled-components";
import { COLORS } from "../../utils/colors";
import { useState } from "react";

// indexes of the most imporant data in the default array
const DATA_INDEXES = [0, 1, 6];

const isDataIndexIncluded = (index: number) => {
  return DATA_INDEXES.includes(index);
};

export const DataDisplay = (props: { examData: any[][] }) => {
  const [dropdownStates, setDropdownStates] = useState<{
    [key: number]: boolean;
  }>({}); // State to track dropdown visibility

  const toggleDropdown = (index: number) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index], // Toggle the specific dropdown
    }));
  };

  const examData = props.examData;
  console.log("DATA(DISPL):", examData);
  if (examData != null && examData.length > 0) {
    return (
      <SDataContainer>
        {examData.map((arr, rowIndex) => (
          <SDataRowWrapper>
            <SDataRowDiv key={rowIndex}>
              {/* PRESS A BUTTON TO DROP DOWN A MENU WITH ALL THE DATA */}
              <button onClick={() => toggleDropdown(rowIndex)}>
                {dropdownStates[rowIndex] ? "Hide Data" : "Show Data"}
              </button>

              {/* DISPLAY ONLY IMPORTANT DATA */}
              {arr.map((value: string, colIndex: number) => {
                return (
                  <div key={colIndex}>
                    {
                      isDataIndexIncluded(colIndex) && value // Render the value if colIndex is included
                    }
                  </div>
                );
              })}
            </SDataRowDiv>

            {/* if dropdown shown display whole data */}
            {dropdownStates[rowIndex] && (
              <SDropdownData>
                {arr.map((value: string, colIndex: number) => (
                  <div key={colIndex}>{value}</div>
                ))}
              </SDropdownData>
            )}
          </SDataRowWrapper>
        ))}
      </SDataContainer>
    );
  }
  return null;
};

const SDataContainer = styled.div`
  background-color: #101010;
  width: 70%;
  align-self: flex-start;
  margin-left: 3rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const SDataRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  margin: 2rem 0; // TEMPORARY

  height: 5rem;
  background-color: blue; // TEMP
`;

const SDataRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
`;

const SDropdownData = styled.div`
  background-color: green;
`