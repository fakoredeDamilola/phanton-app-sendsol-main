import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table";
import styled from "styled-components";
import { columns } from "./data";
import rebecca from "./rebecca.svg";
import Search from "./Search";
import Nothing from "./Nothing";
// import { ModalContext } from "../../../App";
import { Filter } from "./Filter";
import data from "./dummy.json";
import axios from "axios";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  margin-bottom: 1rem;
  width: 100%;

  .title {
    font-size: 2.4rem;
    line-height: 3.2rem;
    .count {
      color: var(--body_text);
      font-size: 1.4rem;
      line-height: 1.8rem;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  margin-top: 0.5rem;
  padding: 0.5rem 1.6rem;
  background-color: white;
  button {
    background-color: transparent;
    border: none;
    svg {
      stroke: var(--body_text);
    }
    width: 2rem;

    &.first {
      margin-left: auto;
      margin-right: 1.8rem;
    }

    &:disabled {
      svg {
        stroke: var(--grey_8);
      }
    }
  }
  .details {
    margin-left: auto;
    margin-right: 1.4rem;
    text-align: right;
    width: 100%;
    span {
      color: var(--grey_8);
    }
  }
`;

const Wrapper = styled.div`
  .table-fit {
    overflow: auto;
    height: calc(100vh - 220px);
  }
  table {
    border-collapse: collapse;
    background-color: white;
    width: 100%;
    margin: auto;
  }

  tr {
    padding-left: 2.4rem;
    height: 7.2rem;
    border-bottom: 1px solid var(--background);
    display: grid;

    grid-template-columns: 16px 1fr 100px 120px 1fr;
    grid-gap: 19.17px;
    align-items: center;
    & > :nth-child(2) {
      font-weight: bold;
    }
    & > :first-child {
      /* padding-left: 2.4rem; */
    }

    :hover {
      background-color: var(--tableHover);
    }
  }

  th {
    color: var(--body_text);
    font-size: 1.2rem;
    line-height: 1.6rem;
    text-align: left;
    /* padding-left: 1.3rem; */
  }

  td {
    /* padding-right: 1.917rem; */
    color: var(--grey_5);
    font-size: 1.6rem;
    line-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .colSort {
    svg {
      stroke: var(--body_text);
    }
  }
`;

const UserTable = () => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // signInWithEmailAndPassword(auth, user.email, user.password)

    axios
      .get("https://solanarootlab-94e7d0d3206e.herokuapp.com/api/users/sub")
      .then((res) => {
        // setLoading(false);
        // console.log(res)
        setData(res.data);
      })
      .catch((err) => {
        // setLoading(false);
        // alert("Invalid Credentials");
        console.log("The error", err);
      });
  }, []);

  const [user, setUser] = React.useState();
  const [colFilterPosition, setColFilterPosition] = React.useState({
    index: 0,
    searchValue: "",
  });

  // const { setIsOn } = React.useContext(ModalContext);

  const flattenPlan = (arr) => {
    console.log(arr);
    return arr.map((el) => {
      const plan = el.original.plan.name;
      const newValues = {
        ...el.values,
        created_at: new Date(el.values.created_at).toDateString(),
        plan: plan,
      };
      return {
        ...el,
        values: newValues,
      };
    });
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;

  return (
    <div style={{ position: "relative" }}>
      <SearchContainer>
        <p className="title">
          History <span className="count">({rows.length})</span>
        </p>

        <Search filter={globalFilter} setFilter={setGlobalFilter} />
      </SearchContainer>
      {/* {
        <Modal>
          <Details details={ user } />
        </Modal>
      } */}

      {rows.length > 0 && (
        <Wrapper>
          <div className="table-fit">
            <table
            // { ...getTableProps() }
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className="hd" {...headerGroup.getHeaderGroupProps()}>
                    <th>
                      <input type="checkbox" />
                    </th>
                    {headerGroup.headers.map((column, index) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                        {column.render("Header")}
                        <span className="colSort">
                          {column.isSorted ? column.isSortedDesc ? <DownIcon /> : <UpIcon /> : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {
                  /*flattenPlan(page)*/ page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        onClick={() => {
                          // setIsOn(true);
                          setUser(row?.original);
                        }}
                      >
                        <td>
                          <input type="checkbox" />
                        </td>
                        {row.cells.map((cell, index) => {
                          return index === 0 ? (
                            <td
                              style={{
                                display: "flex",
                                alignItems: "center",
                                height: "72px",
                              }}
                              {...cell.getCellProps()}
                              key={index}
                            >
                              {" "}
                              <img style={{ marginRight: "12px" }} src={rebecca} alt="avatar" />
                              {cell.render("Cell")}
                            </td>
                          ) : (
                            <td {...cell.getCellProps()} key={index}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </Wrapper>
      )}

      {rows.length > 10 && (
        <Pagination>
          <p className="details">
            <span>
              {1 + pageIndex * 10} - {10 + pageIndex * 10}
            </span>{" "}
            of {rows.length}
          </p>
          <button disabled={!canPreviousPage} onClick={previousPage} className="first">
            <PreviousIcon />
          </button>
          <button disabled={!canNextPage} onClick={nextPage}>
            <NextIcon />
          </button>
        </Pagination>
      )}
      {rows.length === 0 && <Nothing />}
    </div>
  );
};

export default UserTable;

function PreviousIcon() {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 15L1 8L8 1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 12.5L10 7.5L5 12.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L8 8L1 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
