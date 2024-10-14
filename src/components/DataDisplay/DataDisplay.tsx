import { useState } from "react";
import {
  SDataContainer,
  SDataRowWrapper,
  SDataRowDiv,
  SDataP,
  SDropdownDataDiv,
  SInlineDataP,
} from "./DataDisplay.styled";
import { Button } from "../Button";
import arrowDown from "./../../assets/svgs/arrowDown.svg";
import arrowUp from "./../../assets/svgs/arrowUp.svg";

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
      return <SDataP key={index}>დრო: {value}</SDataP>;
    case 1:
      return <SDataP key={index}>საგანი: {value}</SDataP>;
    case 2:
      return <SDataP key={index}>ლექტორი: {value}</SDataP>;
    case 3:
      return <SDataP key={index}>ჯგუფი: {value}</SDataP>;
    case 4:
      return <SDataP key={index}>უნი: {value}</SDataP>;
    case 5:
      return <SDataP key={index}>რაოდ: {value}</SDataP>;
    case 6:
      return <SDataP key={index}>თარიღი: {value}</SDataP>;
    default:
      return <SDataP key={index}>{value}</SDataP>;
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
          <SDataRowWrapper key={rowIndex}>
            <SDataRowDiv>
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
              <Button
                // onClick={() => {}}
                onClick={() => toggleDropdown(rowIndex)}
                icon={dropdownStates[rowIndex] ? arrowUp : arrowDown}
                width="3rem"
                bgColor="transparent"
                value=""
              />
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
