import { Formik, Field, ErrorMessage, Form, useFormik } from "formik";
import FormContainer from "../../componenst/FormContainer/FormContainer";
import { userFormSchema } from "../../schema/userFormSchema";
import { useEditUserMutation } from "../../store/controllers/userApi";
import styles from "./EditUserForm.module.css";
import { IUser } from "../../interfaces/IUser";

export type editUserProps = {
    data: IUser
}
const EditUserForm = (props: editUserProps) => {
    const [ changeUser ] = useEditUserMutation();
    
    const formik = useFormik({
        initialValues: props.data,
        enableReinitialize: true,
        validateOnBlur: true,
        validationSchema: userFormSchema,
        onSubmit: async (values) => {
            await changeUser(values);
        }
    })

    return (
    <FormContainer>
        <Formik
            initialValues={formik.initialValues}
            enableReinitialize
            validateOnBlur
            validationSchema={userFormSchema}
            onSubmit={async (values) => {
                await changeUser(values);
                formik.resetForm();
            }}
        >
        {({ isValid, dirty, resetForm }) => (
            <Form className={styles.addForm}>
                <Field className={styles.addFormInput} name="email" type="text" placeholder="Введите email"/>
                <ErrorMessage name="email"component="div"/>
                <Field className={styles.addFormInput} name="password" type="text" placeholder="Введите пароль"/>
                <ErrorMessage name="password"component="div"/>
                <button disabled={!dirty} type="submit" onClick={() => resetForm()}>Отмена</button>
                <button disabled={!isValid || !dirty} type="submit">Сохранить</button>
            </Form>
        )}
        </Formik>
    </FormContainer>
    )
}

export default EditUserForm;