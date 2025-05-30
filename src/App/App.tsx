import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { getFilmsCount, getFilmsPage } from "../FunctionsApi";
import type { IFilm } from "../types";
import { Button, Typography } from "@mui/material";
import TableFilms from "../TableFilms/TableFilms";
import FilmForm from "../FormPostFilm/FormPostFilm";
import DialogModal from "../DialogModal/DialogModal";

function App() {
  const [films, setFilms] = useState<IFilm[]>([]);
  const [filmsCount, setFilmsCount] = useState(0);
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    const [films, count] = await Promise.all([
      getFilmsPage(controller.page + 1, controller.rowsPerPage),
      getFilmsCount(),
    ]);
    setFilms(films);
    setFilmsCount(count ?? 0);
    setLoading(false);
  }, [controller.page, controller.rowsPerPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (needUpdate: boolean) => {
    setOpen(false);
    if (needUpdate) getData();
  };

  return (
    <div>
      <Typography variant="h4" component="h2">
        Мой личный рейтинг фильмов
      </Typography>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <TableFilms
            films={films}
            count={filmsCount}
            controller={controller}
            setController={setController}
          />
          <Button
            className="btn_open-modal"
            variant="outlined"
            onClick={handleClickOpen}
          >
            Добавить фильм
          </Button>
          <DialogModal
            open={open}
            onClose={handleClose}
            chlildren={<FilmForm onClose={handleClose} />}
          />
        </div>
      )}
    </div>
  );
}

export default App;
