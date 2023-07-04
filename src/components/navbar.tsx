import {Link} from 'react-router-dom';
import {auth} from "../config/firebase";
//hook that allows us to update profile info
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'


export const Navbar = () => {

    //firebase state hook
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="navbar"> 
        <div className="links"> 
            <Link to={"/"}> Home </Link>
            {/** if user is logged in, create post will appear as an option */}
            {!user ? (<Link to={"/login"}> Login </Link>) : (<Link to={"/createpost"}> Create Post </Link>)}


        </div>
        <div className="user">
            {user && (
            <>
            <p> {user?.displayName}</p>
            <img src={user?.photoURL || ""} width="100" height="100"/>
            <button onClick={signUserOut}> Log Out</button>
            </>
            )}
        </div>

        </div>

    );
}