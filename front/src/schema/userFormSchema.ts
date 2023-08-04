import * as yup from "yup";

export const userFormSchema = yup.object().shape({
    email: yup.string()
        .email("Введите емайл")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Не верный формат")
        .required("Обязательное поле"),
    password: yup.string()
        .nonNullable()
        .min(6, "слишком короткий пароль")
        .max(8, "Слишком длинный пароль")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]+$/, "пароль должен содержать хотя бы строчную заглавную и цифру")
        .required("Обязательное поле"),
    });