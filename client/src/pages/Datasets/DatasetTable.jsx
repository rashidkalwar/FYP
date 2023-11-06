import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from '@nextui-org/react';

function DatasetsTable({ data }) {
  let columns = [];
  let rows = [];
  if (data) {
    const firstItem = data[0];
    for (let key in firstItem) {
      columns.push({ key: key, label: key.toUpperCase() });
    }
    rows = data;
  }
  return (
    <>
      {!data ? (
        <div className="min-h-[550px] flex justify-center items-center">
          <Spinner size="lg" color="default" />
        </div>
      ) : (
        <Table
          aria-label="Example table with dynamic content"
          className="h-[400px]"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={'No data to display.'} items={rows}>
            {(item) => (
              <TableRow key={Math.random().toString(36).slice(-8)}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default DatasetsTable;
