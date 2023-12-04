"use client";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState } from "react";

import { useMemo } from "react";
import { Box, Stack } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  salary: number;
  age: number;
};

const data: Person[] = [
  {
    firstName: "John",
    lastName: "Doe",
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
    salary: 3004,
    age: 12,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
    salary: 3004,
    age: 12,
  },
  {
    firstName: "Joe",
    lastName: "Doe",
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
    salary: 3004,
    age: 12,
  },
  {
    firstName: "Kevin",
    lastName: "Vandy",
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
    salary: 3004,
    age: 12,
  },
  {
    firstName: "Joshua",
    lastName: "Rolluffs",
    address: "32188 Larkin Turnpike",
    city: "Omaha",
    state: "Nebraska",
    salary: 3004,
    age: 12,
  },
];

const Example = () => {
  const averageSalary = useMemo(
    () => data.reduce((acc, curr) => acc + curr.salary, 0) / data.length,
    []
  );

  const maxAge = useMemo(
    () => data.reduce((acc, curr) => Math.max(acc, curr.age), 0),
    []
  );

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
        enableGrouping: true, //do not let this column be grouped
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Age",
        accessorKey: "age",
        aggregationFn: "max", //show the max age in the group (lots of pre-built aggregationFns to choose from)
        //required to render an aggregated cell
        AggregatedCell: ({ cell, table }) => (
          <>
            Oldest by{" "}
            {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
            <Box
              sx={{ color: "info.main", display: "inline", fontWeight: "bold" }}
            >
              {cell.getValue<number>()}
            </Box>
          </>
        ),
        Footer: () => (
          <Stack>
            Max Age:
            <Box color="warning.main">{Math.round(maxAge)}</Box>
          </Stack>
        ),
      },
      {
        header: "Gender",
        accessorKey: "gender",
        //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
        GroupedCell: ({ cell, row }) => (
          <Box sx={{ color: "primary.main" }}>
            <strong>{cell.getValue<string>()}s </strong> ({row.subRows?.length})
          </Box>
        ),
      },
      {
        header: "State",
        accessorKey: "state",
      },
      {
        header: "Salary",
        accessorKey: "salary",
        aggregationFn: "mean",
        //required to render an aggregated cell, show the average salary in the group
        AggregatedCell: ({ cell, table }) => (
          <>
            Average by{" "}
            {table.getColumn(cell.row.groupingColumnId ?? "").columnDef.header}:{" "}
            <Box sx={{ color: "success.main", fontWeight: "bold" }}>
              {cell.getValue<number>()?.toLocaleString?.("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Box>
          </>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableGrouping: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: {
      density: "compact",
      expanded: true, //expand all groups by default
      grouping: ["state"], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: "state", desc: false }], //sort by state by default
    },
    muiToolbarAlertBannerChipProps: { color: "primary" },
    muiTableContainerProps: { sx: { maxHeight: 700 } },
  });

  return <MaterialReactTable table={table} />;
};

export default function Home() {
  const [rowData, setRowData] = useState([
    {
      mission: "Voyager",
      company: "NASA",
      location: "Cape Canaveral",
      date: "1977-09-05",
      rocket: "Titan-Centaur ",
      price: 86580000,
      successful: true,
    },
    {
      mission: "Apollo 13",
      company: "NASA",
      location: "Kennedy Space Center",
      date: "1970-04-11",
      rocket: "Saturn V",
      price: 3750000,
      successful: false,
    },
    {
      mission: "Falcon 9",
      company: "SpaceX",
      location: "Cape Canaveral",
      date: "2015-12-22",
      rocket: "Falcon 9",
      price: 9750000,
      successful: true,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.

  return (
    <div className="">
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        {/* The AG Grid component */}
        <AgGridReact
          rowData={rowData}
          columnDefs={[
            { field: "mission" },
            { field: "company" },
            { field: "location" },
            { field: "date" },
            { field: "price" },
            { field: "successful" },
            { field: "rocket" },
          ]}
        />
      </div>
      <div className="">
        <Example />
      </div>
    </div>
  );
}
