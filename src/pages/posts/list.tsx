import React, { useEffect } from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { IPost } from "../../interfaces";
import { useDelete, useNavigation } from "@pankod/refine-core";
import { useNavigate } from "@pankod/refine-react-router-v6";

export const PostList = () => {
  const { edit, create } = useNavigation();
  const navigate = useNavigate();
  const { mutate } = useDelete();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "client_name",
        header: "client Name",
        accessorKey: "client_name",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "client_type",
        header: "client Type",
        accessorKey: "client_type",
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: function render({ renderValue }) {
          return renderValue() ? "Active" : "In-Active";
        },
      },
      {
        id: "action",
        header: "Action",
        accessorKey: "id",
        cell: function render({ getValue }) {
          return (
            <div className="flex gap-2">
              <button
                className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white"
                onClick={() => edit("lists", getValue() as number)}
              >
                Edit
              </button>
              <button
                className="rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-red-500 hover:text-white"
                onClick={() =>
                  mutate({
                    id: getValue() as number,
                    resource: "lists",
                  })
                }
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    getState,
    setPageIndex,
    getCanPreviousPage,
    getPageCount,
    getCanNextPage,
    nextPage,
    previousPage,
    getColumn,
  } = useTable<any>({
    columns,
  });
  const titleColumn = getColumn("client_name");

  return (
    <div className="container mx-auto pb-4">
      <div className="mb-3 mt-1 flex items-center justify-between">
        <div>
          <label className="mr-1" htmlFor="title">
            Client Name:
          </label>
          <input
            id="title"
            type="text"
            className="rounded border border-gray-200 p-1 text-gray-700"
            placeholder="Filter by client name"
            value={(titleColumn.getFilterValue() as string) ?? ""}
            onChange={(event) => titleColumn.setFilterValue(event.target.value)}
          />
        </div>
        <button
          className="flex items-center justify-between gap-1 rounded border border-gray-200 bg-indigo-500 p-2 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-indigo-600"
          onClick={() => create("lists")}
        >
          <span>Create Post</span>
        </button>
      </div>
      <table className="min-w-full table-fixed divide-y divide-gray-200 border">
        <thead className="bg-gray-100">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700 "
                >
                  <div onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {(header.column.columnDef.id !== "client_type" &&
                      header.column.columnDef.id !== "status" &&
                      header.column.columnDef.id !== "action" &&
                      {
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string]) ??
                      null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="transition hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap py-2 px-6 text-sm font-medium text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-2 flex items-center justify-end gap-4">
        <div className="flex gap-1">
          <button
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
            className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
            className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
            className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
          >
            {">"}
          </button>
          <button
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
            className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
          >
            {">>"}
          </button>
        </div>
        <span>
          Page
          <strong>
            {getState().pagination.pageIndex + 1} of {getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
};
