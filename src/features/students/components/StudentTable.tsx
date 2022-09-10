import {
  Button,
  Chip,
  ChipProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { City, Student } from 'models';
import { useState } from 'react';

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onDelete?: (id: Student['id']) => void;
}

export function StudentTable(props: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleDialogClose = () => {
    setSelectedStudent(undefined);
    setOpen(false);
  };

  const handleEditClick = (student: Student) => {
    props.onEdit?.(student);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedStudent && props.onDelete) {
      props.onDelete(selectedStudent.id);
    }
    setOpen(false);
  };

  const renderMarkColumn = (mark: number) => {
    let color: Exclude<ChipProps['color'], undefined> = 'default';

    if (mark < 5) {
      color = 'error';
    } else if (mark < 8) {
      color = 'warning';
    } else {
      color = 'success';
    }

    return <Chip color={color} component="span" label={mark} size="small" />;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.studentList.map(student => (
              <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{renderMarkColumn(student.mark)}</TableCell>
                <TableCell>{props.cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => handleEditClick(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{ marginLeft: '8px' }}
                    onClick={() => handleDeleteClick(student)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Delete student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this student? <br />
            This action can not recover.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="info" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
