import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { IFilm } from "../types";
import { TablePagination } from "@mui/material";
import type { SetStateAction } from "react";

export interface TableProps {
  films: IFilm[];
  controller: {
    page: number;
    rowsPerPage: number;
  };
  setController: React.Dispatch<
    SetStateAction<{ page: number; rowsPerPage: number }>
  >;
  count: number;
}

function TableFilms(props: TableProps) {
  const { controller, setController, count, films } = props;
  console.log({ controller });
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setController({
      ...controller,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Название фильма</TableCell>
              <TableCell align="center">Жанр</TableCell>
              <TableCell align="center">Оценка</TableCell>
              <TableCell align="center">Год выхода</TableCell>
              <TableCell align="center">рейтинг фильма по возрасту</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {films.map((film) => (
              <TableRow
                key={film.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {film.title}
                </TableCell>
                <TableCell align="center">{film.genre}</TableCell>
                <TableCell align="center">{film.score}</TableCell>
                <TableCell align="center">{film.release}</TableCell>
                <TableCell align="center">{`${film.rating}+`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          onPageChange={handlePageChange}
          page={controller.page}
          count={count}
          rowsPerPage={controller.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </>
  );
}
export default TableFilms;
