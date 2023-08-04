import { ReactNode } from "react";
import styles from "./FormContainer.module.css";

const FormContainer = ({ children }: {children: ReactNode}) => {
    return (
        <div className={styles.formContainer}>
            {children}
        </div>
    )
}

export default FormContainer;