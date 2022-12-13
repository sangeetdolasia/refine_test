import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { ICategory, IPost } from "../../interfaces";
import { useList } from "@pankod/refine-core";

const List = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
      {
        id: "clint_name",
        header: "clint Name",
        accessorKey: "clint_name",
      },
      {
        id: "clint_type",
        header: "clint Type",
        accessorKey: "clint_type",
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
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
    setPageCount,
  } = useTable<any>({
    columns,
  });
  // console.log(setPagination());

  return (
    <div className="container mx-auto pb-4">
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
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
            onClick={() => {
              console.log("nbnnbnbnbnb");
              setPageIndex(0);
            }}
            // disabled={!getCanPreviousPage()}
            className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
          >
            {"<<"}sss
          </button>
          <button
            onClick={() => {
              console.log("hiiii");

              previousPage();
              console.log(setPageCount(getPageCount()), "sddsdsds");
            }}
            // disabled={!getCanPreviousPage()}
            className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            // disabled={!getCanNextPage()}
            className="flex items-center justify-between gap-1 rounded border border-gray-200 p-2 text-xs font-medium leading-tight transition duration-150 ease-in-out hover:bg-indigo-500 hover:text-white disabled:bg-gray-200 hover:disabled:text-black"
          >
            {">"}
          </button>
          <button
            onClick={() => {
              console.log(getPageCount(), "sdfddsf");

              setPageIndex(getPageCount() - 1);
            }}
            // disabled={!getCanNextPage()}
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

export default List;
