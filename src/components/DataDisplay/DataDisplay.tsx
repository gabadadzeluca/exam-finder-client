import { useState } from "react";
import {
  SDataContainer,
  SDataRowWrapper,
  SDataRowDiv,
  SDataP,
  SDropdownDataDiv,
  SInlineDataP,
} from "./DataDisplay.styled";
// indexes of the most imporant data in the default array
const DATA_INDEXES = [0, 1, 6];

const isDataIndexIncluded = (index: number) => {
  return DATA_INDEXES.includes(index);
};

const displayByIndex = (index: number, value: string) => {
  // each index is different kind of data
  // return needed component by checking the index
  switch (index) {
    case 0:
      return <SDataP>დრო: {value}</SDataP>;
    case 1:
      return <SDataP>საგანი: {value}</SDataP>;
    case 2:
      return <SDataP>ლექტორი: {value}</SDataP>;
    case 3:
      return <SDataP>ჯგუფი: {value}</SDataP>;
    case 4:
      return <SDataP>უნი: {value}</SDataP>;
    case 5:
      return <SDataP>რაოდ: {value}</SDataP>;
    case 6:
      return <SDataP>თარიღი: {value}</SDataP>;
    default:
      return <SDataP>{value}</SDataP>;
  }
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
              {/* DISPLAY ONLY IMPORTANT DATA */}
              {arr.map((value: string, colIndex: number) => {
                return (
                  <SInlineDataP key={colIndex}>
                    {
                      isDataIndexIncluded(colIndex) && value // Render the value if colIndex is included
                    }
                  </SInlineDataP>
                );
              })}

              {/* PRESS A BUTTON TO DROP DOWN A MENU WITH ALL THE DATA */}
              <button onClick={() => toggleDropdown(rowIndex)}>
                {dropdownStates[rowIndex] ? "Hide" : "Show"}
              </button>
            </SDataRowDiv>

            {/* if dropdown shown display whole data */}
            {dropdownStates[rowIndex] && (
              <SDropdownDataDiv>
                {arr.map((value: string, colIndex: number) =>
                  displayByIndex(colIndex, value)
                )}
              </SDropdownDataDiv>
            )}
          </SDataRowWrapper>
        ))}
      </SDataContainer>
    );
  }
  return null;
};
