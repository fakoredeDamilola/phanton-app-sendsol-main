import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: 1.2rem;
  font-size: 1.4rem;
  line-height: 1.8rem;
  position: relative;

  .head {
    display: flex;
    align-items: center;
    height: 4.8rem;
    width: 8.7rem;
    background-color: white;
    color: var(--body_text);
    border-radius: 0.4rem;
    span {
      margin: 0 1.2rem 0 0.8rem;
    }
  }
  svg {
    stroke: var(--body_text);
    margin-left: 1.5rem;
  }

  .items {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05),
      0px 25px 35px rgba(0, 0, 0, 0.03);
    background-color: white;
    width: 24rem;
    margin: 1.2rem 0;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    z-index: 10;
    color: var(--grey_13);
    position: absolute;
    border-radius: 0.8rem;

    p,label {
      :first-child {
        color: var(--grey_1);
      }
      height: 4.8rem;
      padding-left: 1.2rem;
      display: flex;
      align-items: center;
    }
  }
 .checkbox{
   height: 1.6rem;
   width: 1.6rem;
   border-radius: 0.8rem;
   margin-right: 1.2rem;
 }
`;

export const Filter = ({ filterFunc }) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("Filter");
  const FILTER_BY = [
    "Filter",
    "Plan",
    "Account type",
    "Date joined",
    "Recent activity",
  ];
  const FILTER_BY_PLAN = ["Plan", "Freemium", "Basic", "Starter", "Enterprise"];
  const FILTER_BY_ACCOUNT = [
    "Account type",
    "Personal account",
    "Business account",
  ];
  const FILTER_BY_RECENT_ACTIVITy = [
    "Recent activity",
    "Subscribed",
    "Added a client account",
    "Sent a post",
    "Scheduled a post",
    "Edited a scheduled post",
    "Add a social media account",
    "Removed a social media account",
    "Created a draft note",
    "Edited a draft note",
    "Invited team members",
    "Removed team members ",
    "Deleted a drat note",
    "Deleted a client account",
    "Added a business account",
    "Joined a business account",
  ];

  const FILTERS = {
    Filter: FILTER_BY,
    Plan: FILTER_BY_PLAN,
    "Account type": FILTER_BY_ACCOUNT,
    "Date joined": [],
    "Recent activity": FILTER_BY_RECENT_ACTIVITy,
  };

  return (
    <Wrapper>
      <div onClick={ () => {
        //  filterFunc({
        //    index: 0,
        //    searchValue: "",
        //  });
        setOpen(!open)
      } } className="head">
        <FilterIcon /> <span>Filter</span>
      </div>
      { open && (
        <div className="items">
          { filter === "Filter" &&
            FILTERS[filter].map((ele) => (
              <p key={ ele } onClick={ () => setFilter(ele) }>
                { ele }
              </p>
            )) }

          { filter !== "Filter" &&
            FILTERS[filter].map((ele, index) => (
              <label
                key={ ele }
                onClick={ () => {
                  index === 0 && setFilter("Filter");
                  index === 0 &&
                    filterFunc({
                      index: 0,
                      searchValue: "",
                    });
                  filterFunc({
                    index,
                    searchValue: ele,
                  });
                } }
              >
                { index !== 0 && <input className="checkbox" type="checkbox" /> }
                { ele }
              </label>
            )) }
        </div>
      ) }
    </Wrapper>
  );
};




function FilterIcon() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.600098 1.60039C0.600098 1.28213 0.726526 0.976906 0.951569 0.751862C1.17661 0.526819 1.48184 0.400391 1.8001 0.400391H16.2001C16.5184 0.400391 16.8236 0.526819 17.0486 0.751862C17.2737 0.976906 17.4001 1.28213 17.4001 1.60039V5.20039C17.4 5.51862 17.2736 5.8238 17.0485 6.04879L11.4001 11.6972V16.0004C11.4 16.3186 11.2736 16.6238 11.0485 16.8488L8.6485 19.2488C8.48068 19.4166 8.26688 19.5308 8.03414 19.5771C7.80139 19.6234 7.56015 19.5996 7.34091 19.5088C7.12167 19.418 6.93428 19.2642 6.80242 19.0669C6.67055 18.8696 6.60015 18.6377 6.6001 18.4004V11.6972L0.951698 6.04879C0.726638 5.8238 0.600166 5.51862 0.600098 5.20039V1.60039Z"
      />
    </svg>
  );
}