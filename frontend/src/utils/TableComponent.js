import React, { useState, useMemo } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  Modal,
  Box,
  Typography,
  Button,
  Stack, CheckBox
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Print as PrintIcon,
  ArrowUpward as AscendingIcon,
  ArrowDownward as DescendingIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,

} from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';

const TableComponent = ({ data, visibleColumns, editable, deletable, action, modelName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item)
        .join('')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const columns = useMemo(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0])
        .filter(key => visibleColumns.includes(key))
        .map((key) => ({
          Header: key,
          accessor: key,
        }));

      // Add S.No. as the first column
      columns.unshift({ 
        Header: 'S.No.', 
        accessor: (row, rowIndex) => rowIndex + 1 
      }); 

      return columns;
    } else {
      return [];
    }
  }, [data]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortColumn) {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortOrder === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        } else {
          return 0;
        }
      }
      return 0;
    });
  }, [filteredData, sortColumn, sortOrder]);

  const paginatedData = sortedData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleOpenModal = (id, rowData) => {
    // Your logic to open the modal with row data (id and other relevant data)
    console.log('Open Model for row:', id, rowData);
    alert(id, rowData);
  };
  const handleDelete = (id, rowData) => {
    // Your logic to open the modal with row data (id and other relevant data)
    console.log('Delete Modal for row:', id, rowData);
    alert(id, rowData);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage - 1); // Adjust for 0-based indexing
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to the first page when changing rows per page
  };

  const handleExport = (format) => {
    console.log("export as excel");
  };
  const handlePrint = (format) => {
    window.print();
  };

  return (
    <div className="relative  shadow-md sm:rounded-lg">

      <Card className="flex space-x-2 w-full" spacing={3} ><CardContent className="w-full">
        <div className="flex items-center justify-between mb-4 w-full print">


          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx"
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-4"
              variant="standard" />
          </Box>
          <div className="flex space-x-2" >
            <Tooltip title="Export">
              <IconButton onClick={handleExport}>
                <FileDownloadIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
            </Tooltip></div>
        </div>

      </CardContent></Card>
      <Card><CardContent>
        {columns.length > 0 ?
          <TableContainer className="rounded-lg overflow-hidden">
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      className="flex justify-between px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort(column.accessor)}
                    >
                      {column.Header}
                      <span className="ml-2">
                        {sortColumn === column.accessor && (
                          <span className="">
                            {sortOrder === 'asc' ? <AscendingIcon /> : <DescendingIcon />}
                          </span>
                        )}
                      </span>
                    </TableCell>
                  ))}
                  {editable && (
                    <TableCell
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody className=''>
                {paginatedData.map((row, index) => (
                  <TableRow key={index} className="border-b border-gray-200">
                    {/* {Object.values(row).map((value) => (
                  <TableCell className="px-4 py-3 text-sm">{value}</TableCell>
                ))} */}
                    <TableCell className="px-4 py-3 text-sm">
                      {index + 1} {/* Add serial number */}
                    </TableCell>
                    {visibleColumns.map((column) => (
                      <TableCell key={`${index}-${column}`} className="px-4 py-3 text-sm">
                        {row[column]}
                      </TableCell>
                    ))}
                    {editable && (
                      <TableCell className="px-4 py-3 text-sm gap-2 print">
                        <label htmlFor={`edit${modelName}_modal`}  className="btn btn-circle m-2 btn-secondary" onClick={() => action(row)}>

                          <EditIcon />
                        </label>
                        {deletable && (
                          <label htmlFor={`delete${modelName}_modal`} className="btn btn-circle m-2 text-white btn-error" onClick={() => action(row)}>
                            <DeleteIcon />
                          </label>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
          <Typography variant="h5" component="h2" gutterBottom>
            No Data Exists
          </Typography>
        }

        <div className="flex items-center flex-col md:flex-row justify-between p-4 print">
          <div className='flex gap-3 print'>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={handlePageChange}
                className="mb-4"
              />
            </Stack>
            <span className="text-sm m-2 text-gray-500">
              Page{' '}
              <strong>
                {currentPage + 1} of {totalPages}
              </strong>{' '}
            </span>
          </div>
          <div className='flex gap-3 items-center'>
            <Select
              labelId="rows-per-page-label"
              id="rows-per-page-select"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="ml-4"
            >
              {[5, 10, 15, 20, 25, 30, 40].map((perPage) => (
                <MenuItem key={perPage} value={perPage}>
                  {perPage}
                </MenuItem>
              ))}
            </Select>

            <InputLabel id="rows-per-page-label" className="m-2">per page</InputLabel>
          </div>
        </div>
      </CardContent></Card>
    </div>
  );
};

export default TableComponent;