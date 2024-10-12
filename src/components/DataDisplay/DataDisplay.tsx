export const DataDisplay = (props: { examData: any[][] }) => {
  const examData = props.examData;
  console.log("DATA(DISPL):", examData);
  if (examData != null && examData.length > 0) {
    return (
      <div>
        {examData.map((arr, rowIndex) => (
          <div key={rowIndex}>
            {arr.map((value: string, colIndex: number) => (
              <div key={colIndex}>{value}</div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return null;
};
