import React from "react";
import { Column } from "react-table";
import accountsData from "./dummy.json";
import Columnsearch from "./Columnsearch";



export const columns = [
  { Header: "NAME", accessor: "name", Filter: Columnsearch },
  { Header: "EMAIL ADDRESS", accessor: "email", Filter: Columnsearch },
  { Header: "PLAN", accessor: "plan", Filter: Columnsearch },
  { Header: "ACCOUNT TYPE", accessor: "category", Filter: Columnsearch },
  {
    Header: (
      <span>
        DATE <br />
        JOINED
      </span>
    ),
    accessor: "created_at",
    Filter: Columnsearch,
  },
  {
    Header: (
      <span>
        RECENT
        <br /> ACTIVITY
      </span>
    ),
    accessor: "recent_activity",
    Filter: Columnsearch,
  },
];

export const accountsColumns = [
  {
    Header: (
      <span>
        ACCOUNT
        <br /> NAME
      </span>
    ),
    accessor: "name",
  },
  { Header: "EMAIL ADDRESS", accessor: "email" },

  { Header: "PLAN", accessor: "plan" },
  {
    Header: (
      <span>
        PAYMENT <br />
        STATUS
      </span>
    ),
    accessor: "payment_status",
  },
  {
    Header: (
      <span>
        RECENT
        <br /> ACTIVITY
      </span>
    ),
    accessor: "type",
  },
  {
    Header: (
      <span>
        DATE
        <br /> CREATED
      </span>
    ),
    accessor: "created_at",
    Cell: (props) => new Date(props.value).toDateString(),
  },
];

export const enterpriseColumns = [
  { Header: <input type="checkbox" />, accessor: "check" },
  {
    Header: (
      <span>
        ACCOUNT
        <br /> NAME
      </span>
    ),
    accessor: "accountName",
  },
  { Header: "EMAIL ADDRESS", accessor: "emailAddress" },

  {
    Header: (
      <span>
        PAYMENT <br />
        STATUS
      </span>
    ),
    accessor: "paymentStatus",
  },
  {
    Header: (
      <span>
        RECENT
        <br /> ACTIVITY
      </span>
    ),
    accessor: "accountType",
  },
  {
    Header: (
      <span>
        DATE
        <br /> CREATED
      </span>
    ),
    accessor: "dateCreated",
  },
];

export { accountsData };

export const couponsColumns = [
  { Header: "COUPON NAME", accessor: "title" },
  { Header: "CODE", accessor: "code" },
  { Header: "USE CASE", accessor: "use" },
  { Header: "STATUS", accessor: "active", Cell: ({ value }) => value === 1 ? "Active" : "Inactive" },
  { Header: "DISCOUNT (%)", accessor: "discount" },
  { Header: "CREATED BY", accessor: "admin_id", Cell: ({ value }) => `Admin ${value}` },
];

export const ListsColumns= [
  { Header: "NAME", accessor: "name" },
  { Header: "EMAIL", accessor: "email" },
  {
    Header: "DATE JOINED",
    accessor: "created_at",
    Cell: (props) => new Date(props.value).toDateString(),
  },
  {
    Header: "STATUS",
    accessor: "is_super",
    Cell: (props) => (props.value > 0 ? "Super" : "Admin"),
  },
  {
    Header: " RECENT ACTIVITY",
    accessor: "updated_at",
    // Cell: (props) => new Date(props.value).toDateString(),
  },
];

