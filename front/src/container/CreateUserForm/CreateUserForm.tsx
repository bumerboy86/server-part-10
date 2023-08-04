import { Formik, Field, ErrorMessage, Form } from "formik";
import FormContainer from "../../componenst/FormContainer/FormContainer";
import { useEffect, useState } from "react";
import { IUserPre } from "../../interfaces/IUserPre";
import { userFormSchema } from "../../schema/userFormSchema";
import { useAddUserMutation, useLoginUserMutation } from "../../store/controllers/userApi";
import styles from "./CreateUserForm.module.css";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/user.slice";

const CreateUserForm = () => {
    const [ addUser, {isSuccess, data} ] = useAddUserMutation();
    const dispatch = useAppDispatch();
    const [ login, {isSuccess: LoginSuccess, data: loginData} ] = useLoginUserMutation();
    const [ reg, setReg ] =useState<boolean>(true);

    const [ userData ] = useState<IUserPre>({
        password: "",
        email: "",
    })

    const changeRegHandler = () => {
        setReg(prev => !prev);
    }
    
    useEffect(() => {
        isSuccess && toast.success(`Пользователь ${data?.email} добавлен`);
    }, [isSuccess])

    useEffect(() => {
        if (LoginSuccess && loginData ) {
            toast.success(`Вход ${loginData?.email} выполнен`);
            dispatch(setUser(loginData));
        }
    }, [LoginSuccess])

    return (
    <FormContainer>
        <button onClick={changeRegHandler}>Вход/Регист</button>
        <h2>{reg ? "Регистрация" : "Вход"}</h2>
        <Formik
            initialValues={userData}
            validateOnBlur
            validationSchema={userFormSchema}
            onSubmit={async (values, {resetForm}) => {
                reg ? await addUser(values) : await login(values);
                resetForm();
            }}
        >
        {({ isValid }) => (
            <Form className={styles.addForm}>
                <Field className={styles.addFormInput} name="email" type="text" placeholder="Введите Email"/>
                <ErrorMessage name="email"component="div"/>
                <Field className={styles.addFormInput} name="password" type="text" placeholder="Введите пароль"/>
                <ErrorMessage name="password"component="div"/>
                <button disabled={!isValid} type="submit">Добавить</button>
            </Form>
        )}
        </Formik>
    </FormContainer>
    )
}

export default CreateUserForm;