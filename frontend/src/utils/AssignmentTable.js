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
  Typography,
  Stack,
  Pagination,
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Print as PrintIcon,
  ArrowUpward as AscendingIcon,
  ArrowDownward as DescendingIcon,
  Visibility as VisibilityIcon ,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const AssignmentTable= ({ data, visibleColumns, editable, deletable }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) {
      console.warn('Data is not an array. Falling back to an empty array.');
      return [];
    }
  
    return data.filter((item) =>
      Object.values(item)
        .join('')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

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

  const handlePageChange = (_, newPage) => setCurrentPage(newPage - 1);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleExport = () => console.log('Export data as Excel');
  const handlePrint = () => window.print();

  const handleView = (row) =>{
    window.location.href="/teacher/assignment/view/"+row.id;
  }
  const handleDelete = (row) =>{};
  const handleEdit = (row) =>{
    alert("edit: "+row.name);
    console.log(row);
  }

  return (
    <div className="relative shadow-md sm:rounded-lg">
      <Card className="mb-4">
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center">
            <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            <TextField
              label="Search"
              variant="standard"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex space-x-2">
            <Tooltip title="Export">
              <IconButton onClick={handleExport}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          {filteredData.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    {visibleColumns.map((column) => (
                      <TableCell
                        key={column}
                        onClick={() => handleSort(column)}
                        style={{ cursor: 'pointer' }}
                      >
                        {column}
                        {sortColumn === column && (
                          <span>
                            {sortOrder === 'asc' ? <AscendingIcon /> : <DescendingIcon />}
                          </span>
                        )}
                      </TableCell>
                    ))}
                    {editable && <TableCell>Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{currentPage * rowsPerPage + index + 1}</TableCell>
                      {visibleColumns.map((column) => (
                        <TableCell key={column}>{row[column]}</TableCell>
                      ))}
                      {editable && (
                        <TableCell>
                        <IconButton onClick={() => handleView(row)}>
                          <VisibilityIcon />
                        </IconButton>
                          <IconButton onClick={() => handleEdit(row)}>
                            <EditIcon />
                          </IconButton>
                          {deletable && (
                            <IconButton onClick={() => handleDelete(row)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No data available</Typography>
          )}
          <div className="flex items-center justify-between mt-4">
            <Pagination
              count={totalPages}
              page={currentPage + 1}
              onChange={handlePageChange}
            />
            <Select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {[5, 10, 15, 20].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentTable;
