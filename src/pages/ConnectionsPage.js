import Connections from '../Components/Connections';
import MyNavbar from '../Components/MyNavbar';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

const ConnectionsPage = () => {
    const { auth, dispatch } = useAuth();

    if (!auth.isLoggedIn) {
      return <Redirect to="/login" />;
    }
  

    return(
        <div className="cont">
            <MyNavbar />
            <Connections />
        </div>
    );
}

export default ConnectionsPage;