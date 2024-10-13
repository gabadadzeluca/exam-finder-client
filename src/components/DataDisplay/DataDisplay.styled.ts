import styled from "styled-components";
export const SDataContainer = styled.div`
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

export const SDataRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  margin: 0 0 2rem; // TEMPORARY

  min-height: 6rem;
  background-color: gray; // TEMP
`;

export const SDataRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SDropdownDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  border: 2px solid white; // TEMP

`;

// data paragraph in the dropdown
export const SDataP = styled.p``

export const SInlineDataP = styled.p`
  max-width: 12rem;
`