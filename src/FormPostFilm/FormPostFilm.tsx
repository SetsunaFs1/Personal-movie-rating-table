import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import type { IFilm } from "../types";
import { postFilm } from "../FunctionsApi";
import "./FormPostFilm.css";

interface FilmFormProps {
  onClose: (needUpdate: boolean) => void;
}

function FilmForm(props: FilmFormProps) {
  const [errors, setErrors] = useState({
    title: "",
    genre: "",
    score: "",
    release: "",
    rating: "",
  });
  const { onClose } = props;

  const [formValues, setFormValues] = useState<IFilm>({
    id: uuidv4(),
    title: "",
    genre: "",
    score: "",
    release: "",
    rating: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value as string }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      genre: "",
      score: "",
      release: "",
      rating: "",
    };

    if (!formValues.title) {
      newErrors.title = "Название фильма обязательно для заполнения.";
      valid = false;
    }

    if (!formValues.genre) {
      newErrors.rating = "Жанр фильма обязателен.";
      valid = false;
    }

    if (!formValues.score) {
      newErrors.rating = "Оценка фильма обязательна.";
      valid = false;
    }

    const releaseRegex = /^(18|19|20)\d{2}$/;
    if (!formValues.release || !releaseRegex.test(String(formValues.release))) {
      newErrors.release =
        "Год выхода фильма должен быть 4-значным, начинающимся c 18.., 19.. или 20..";
      valid = false;
    }

    if (!formValues.rating) {
      newErrors.rating = "Выбор возрастного ограничения фильма обязателен.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      await postFilm(formValues);
      onClose(true);
    }
  };

  const isFormValid =
    Object.values(formValues).every((value) => value !== "") &&
    Object.values(errors).every((error) => error === "");

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Название фильма"
        value={formValues.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.title}
        helperText={errors.title}
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Жанр</InputLabel>
        <Select
          name="genre"
          label="Жанр"
          value={formValues.genre}
          onChange={handleChangeSelect}
        >
          <MenuItem value="Драма">Драма</MenuItem>
          <MenuItem value="Комедия">Комедия</MenuItem>
          <MenuItem value="Ужасы">Ужасы</MenuItem>
          <MenuItem value="Фантастика">Фантастика</MenuItem>
          <MenuItem value="Фэнтези">Фэнтези</MenuItem>
          <MenuItem value="криминал">криминал</MenuItem>
          <MenuItem value="биография">биография</MenuItem>
          <MenuItem value="мультфильм">мультфильм</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <Typography>Оценка фильма</Typography>
        <RadioGroup
          name="score"
          value={formValues.score.toString()}
          onChange={handleChange}
        >
          {[...Array(10)].map((_, index) => (
            <FormControlLabel
              key={index + 1}
              value={(index + 1).toString()}
              control={<Radio />}
              label={(index + 1).toString()}
            />
          ))}
        </RadioGroup>
        {errors.score && <Typography color="error">{errors.score}</Typography>}
      </FormControl>
      <TextField
        name="release"
        label="Год выхода фильма"
        type="number"
        value={formValues.release}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        error={!!errors.release}
        helperText={errors.release}
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Возрастной рейтинг</InputLabel>
        <Select
          name="rating"
          label="Возрастной рейтинг"
          value={formValues.rating}
          onChange={handleChangeSelect}
        >
          <MenuItem value="6">0+</MenuItem>
          <MenuItem value="6">6+</MenuItem>
          <MenuItem value="12">12+</MenuItem>
          <MenuItem value="16">16+</MenuItem>
          <MenuItem value="18">18+</MenuItem>
        </Select>
        {errors.rating && (
          <Typography color="error">{errors.rating}</Typography>
        )}
      </FormControl>
      <Button
        className="btn-form"
        type="submit"
        variant="contained"
        color="primary"
        disableElevation
        disabled={!isFormValid}
      >
        Отправить
      </Button>
    </form>
  );
}

export default FilmForm;
