import React from "react";
import styled from "styled-components";
import { useAsyncDebounce } from "react-table";

const Wrapper = styled.div`
  height: 4.8rem;
  position: relative;
  svg {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: 2.4rem;
  }
  input {
    padding: 1.7rem 0 1.7rem 5rem;
    outline: none;
    width: 29.6rem;
    height: 4.8rem;
    border: 1px solid var(--border);
    font-size: 1.2rem;
    line-height: 1.4rem;
    border-radius: 0.4rem;
    ::placeholder {
      color: var(--body_text);
      font-size: 1.2rem;
      line-height: 1.4rem;
    }
  }
`;

const Columnsearch = ({
  column,
  className,
}) => {
  const { filterValue, setFilter } = column;

  const debouncer = useAsyncDebounce((value) => {
    setFilter(value || "");
  }, 100);
  const changeHandler = (e) => {
    debouncer(e.target.value);
  };

  return (
    <Wrapper className={className}>
      <SearchIcon />
      <input
        placeholder="Search"
        type="text"
        value={filterValue || ""}
        onChange={changeHandler}
      />
    </Wrapper>
  );
};

export default Columnsearch;



function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
        stroke="#8D9091"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 17.5L13.875 13.875"
        stroke="#8D9091"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
