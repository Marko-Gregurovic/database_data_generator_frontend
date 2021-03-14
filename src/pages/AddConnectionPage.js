import ConnectionForm from '../Components/ConnectionForm';
import MyNavbar from '../Components/MyNavbar';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

const AddConnectionsPage = () => {
    const { auth, dispatch } = useAuth();

    if (!auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
  

    return(
        <div className="cont">
            <MyNavbar />
            <ConnectionForm />
        </div>
    );
}

export default AddConnectionsPage;