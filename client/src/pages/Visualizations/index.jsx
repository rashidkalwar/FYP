import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Spinner,
  Pagination,
  Chip,
} from '@nextui-org/react';
import {
  Plus,
  Search as SearchIcon,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  AreaChart as AreaChartIcon,
} from 'lucide-react';
import { fetchVisualizations } from '../../redux/visualization/visualizationSlice';
import data from './data';
import RowActions from './RowActions';

const columns = [
  { name: 'TITLE', uid: 'title', sortable: true },
  { name: 'DESCRIPTION', uid: 'description' },
  { name: 'CHART TYPE', uid: 'chartType' },
  { name: 'DATASET', uid: 'dataset' },
  { name: 'DATE CREATED', uid: 'createdAt', sortable: true },
  { name: 'DATE UPDATED', uid: 'updatedAt', sortable: true },
  { name: 'ACTIONS', uid: 'actions' },
];

function Visualizations() {
  const dispatch = useDispatch();
  const { loading, visualizations } = useSelector(
    (state) => state.visualization
  );

  React.useEffect(() => {
    dispatch(fetchVisualizations());
  }, [dispatch]);

  const [filterValue, setFilterValue] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'createdAt',
    direction: 'descending',
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredVisualizations = [...visualizations];

    if (hasSearchFilter) {
      filteredVisualizations = filteredVisualizations.filter((dataset) =>
        dataset.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredVisualizations;
  }, [visualizations, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((visualization, columnKey) => {
    const id = visualization['uniqueId'];
    const cellValue = visualization[columnKey];

    switch (columnKey) {
      case 'title':
        return <div className="font-medium">{cellValue}</div>;
      case 'description':
        return <div className="max-w-[200px]">{cellValue}</div>;
      case 'chartType': {
        switch (cellValue) {
          case 'area-chart':
            return (
              <Chip
                variant="flat"
                color="primary"
                endContent={<AreaChartIcon className="ml-1" size={16} />}
              >
                {cellValue.split('-').slice(0, 2).join(' ')}
              </Chip>
            );
          case 'bar-chart':
            return (
              <Chip
                variant="flat"
                color="secondary"
                endContent={<BarChartIcon className="ml-1" size={16} />}
              >
                {cellValue.split('-').slice(0, 2).join(' ')}
              </Chip>
            );
          case 'line-chart':
            return (
              <Chip
                variant="flat"
                color="warning"
                endContent={<LineChartIcon className="ml-1" size={16} />}
              >
                {cellValue.split('-').slice(0, 2).join(' ')}
              </Chip>
            );
          default:
            return <>{cellValue}</>;
        }
      }
      case 'dataset':
        return <>{cellValue.split('-').join(' ')}</>;
      case 'createdAt':
        return <>{cellValue.split('T')[0]}</>;
      case 'updatedAt':
        return <>{cellValue.split('T')[0]}</>;
      case 'actions':
        return <RowActions id={id} />;
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by title..."
            startContent={<SearchIcon className="text-gray-500" size={20} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <Button
            className="bg-blue-900/90 hover:bg-blue-900/80"
            color="primary"
            as={Link}
            to="create"
            endContent={<Plus />}
            radius="full"
          >
            Create
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {visualizations.length} datasets
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    onClear,
    filterValue,
    onRowsPerPageChange,
    visualizations.length,
    onSearchChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          radius="full"
          classNames={{
            cursor: 'bg-blue-900/90 shadow-blue-900 shadow-sm',
          }}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onNextPage, onPreviousPage]);

  // function reverseArr(input) {
  //   var ret = new Array();
  //   for (var i = input.length - 1; i >= 0; i--) {
  //     ret.push(input[i]);
  //   }
  //   return ret;
  // }

  return (
    <>
      <h2 className="text-3xl font-bold text-blue-900/90 ml-10">
        Visualizations
      </h2>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        className="p-2 sm:p-10"
        classNames={{
          wrapper: 'max-h-[390px] max-w-[400px] sm:max-w-full',
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={
            <Spinner
              label="Loading..."
              color="default"
              labelColor="foreground"
            />
          }
          emptyContent={!loading ? 'No datasets found' : ''}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell height={40}>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <div className="flex justify-end items-center p-20">
        <Button
          className="bg-blue-900/90 hover:bg-blue-900/80"
          color="primary"
          as={Link}
          to="create"
          endContent={<Plus />}
          radius="full"
        >
          Create
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center min-h-[300px]">
        <div>Population of Pakistan</div>
        <LineChart
          width={730}
          height={300}
          data={reverseArr(data)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Population"
            strokeWidth={2}
            stroke="#0ea5e9"
          />
          <Line
            type="monotone"
            dataKey="Urban Population"
            strokeWidth={2}
            stroke="#f59e0b"
          />
          <Line
            type="monotone"
            dataKey="Yearly Change"
            strokeWidth={2}
            stroke="#8b5cf6"
          />
        </LineChart>
      </div> */}
    </>
  );
}

export default Visualizations;
