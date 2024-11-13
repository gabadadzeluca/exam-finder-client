import styled from "styled-components";
export const SDataContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  align-self: flex-start;
  margin-left: 3rem;
  font-size: 18px;
  font-weight: 500;

  @media (max-width: 992px) {
    width: 75%;
    margin-left: 1.5rem;
    align-self: center;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const SDataRowDiv = styled.div<{isExamOver: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  opacity: ${({isExamOver})=> isExamOver ? '0.5' : ''};
  margin: 0 0 2rem; // TEMPORARY
  @media (max-width: 1200px) {
    padding: 0 2rem;
  }

  @media (max-width: 992px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (max-width: 576px) {
    padding: 0 0.7rem;
  }
  border-radius: 0.8rem;
  border: 0.35px solid #fff;
  min-height: 6rem;
  /* background-color: gray; // TEMP */
`;

export const SDataRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SDropdownDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;

  border: 2px solid white; // TEMP
  border-radius: 0.8rem;
  margin-bottom: 2rem;
`;

// data paragraph in the dropdown
export const SDataP = styled.p`
  margin: 0.5rem 1rem;
  font-size: 0.9375rem;
`;

export const SInlineDataP = styled.p`
  max-width: 19rem;
  font-size: 1.25rem;

  @media (max-width: 1200px) {
    font-size: 1.15rem;
    max-width: 16rem;
  }

  @media (max-width: 992px) {
    font-size: 1rem;
    max-width: 13rem;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    max-width: 10rem;
  }

  @media (max-width: 576px) {
    font-size: 0.75rem;
  }
`;
