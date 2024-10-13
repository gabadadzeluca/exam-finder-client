import styled from "styled-components";
import { useState } from "react";

// indexes of the most imporant data in the default array
const DATA_INDEXES = [0, 1, 6];

const isDataIndexIncluded = (index: number) => {
  return DATA_INDEXES.includes(index);
};

const displayByIndex = (index: number, value: string) =>{
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
}

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
                  <div key={colIndex}>
                    {
                      isDataIndexIncluded(colIndex) && value // Render the value if colIndex is included
                    }
                  </div>
                );
              })}

              {/* PRESS A BUTTON TO DROP DOWN A MENU WITH ALL THE DATA */}
              <button onClick={() => toggleDropdown(rowIndex)}>
                {dropdownStates[rowIndex] ? "Hide Data" : "Show Data"}
              </button>
            </SDataRowDiv>

            {/* if dropdown shown display whole data */}
            {dropdownStates[rowIndex] && (
              <SDropdownDataDiv>
                {arr.map((value: string, colIndex: number) => (
                  // <div key={colIndex}>{value}</div>
                  displayByIndex(colIndex, value)
                ))}
              </SDropdownDataDiv>
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
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-self: flex-start;
  margin-left: 3rem;
  font-size: 18px;
  font-weight: 500;
`;

const SDataRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  margin: 0 0 2rem; // TEMPORARY

  height: 5rem;
  background-color: blue; // TEMP
`;

const SDataRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SDropdownDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  border: 2px solid white; // TEMP

`;

const SDataP = styled.p`
  
`