import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Student } from 'models';

export interface StudentRankingListProps {
  studentList: Student[];
}

export function StudentRankingList({ studentList }: StudentRankingListProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="left">{idx + 1}</TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="right">{student.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
