import styled from "styled-components";
import { COLORS } from "../../utils/colors";

export const DataDisplay = (props: { examData: any[][] }) => {
  const examData = props.examData;
  console.log("DATA(DISPL):", examData);
  if (examData != null && examData.length > 0) {
    return (
      <SDataContainer>
        {examData.map((arr, rowIndex) => (
          <SDataRowDiv key={rowIndex}>
            {arr.map((value: string, colIndex: number) => (
              <div key={colIndex}>{value}</div>
            ))}
          </SDataRowDiv>
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

`

const SDataRowDiv = styled.div`
  display: flex;  
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  
  margin: 2rem 0; // TEMPORARY

  height: 5rem;
  background-color: blue; // TEMP

`