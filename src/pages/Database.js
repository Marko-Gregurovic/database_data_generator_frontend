import { useAuth } from "../context/auth";
import { LOGOUT } from "../helpers/Actions";

function Database() {
    const { auth, dispatch } = useAuth();
    return (
        <div>
            <div>Database</div>
            <button onClick={() => dispatch({type: LOGOUT})}>LogOut</button>
        </div>
    );
}

export default Database;