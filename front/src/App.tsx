import { useEffect } from 'react';
import styles from './App.module.css';
import EditUserForm from './container/EditUserForm/EditUserForm';
import CreateUserForm from './container/CreateUserForm/CreateUserForm';
import { useDeleteUserMutation } from './store/controllers/userApi';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { clearUser } from './store/slices/user.slice';

const App = () => {
  const { user } = useAppSelector(state => state.user);
  const [deleteHandler, {isSuccess, data: deleteData} ] = useDeleteUserMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isSuccess && toast.info(`Пользователь ${deleteData?.email} удален`);
  }, [isSuccess])
  
  return (
   <div className={styles.container}>
        {!user ? <CreateUserForm /> : <button onClick={() => dispatch(clearUser())}>Выход</button>}
        {user && (
           <div key={user.id} className={styles.userItems}>
            <p className={styles.userText}>email: {user.email}</p>
            <p className={styles.userText}>password: {user.password}</p> 
            <button onClick={() => deleteHandler(user.id)}>Удалить</button>
            <EditUserForm data={user}/>
          </div>
        )}
   </div>
  )
}

export default App;
