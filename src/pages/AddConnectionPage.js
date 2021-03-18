import ConnectionForm from '../components/ConnectionForm';
import MyNavbar from '../components/MyNavbar';
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