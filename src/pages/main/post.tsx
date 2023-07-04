
import { addDoc, collection, getDoc, getDocs, query, where, deleteDoc, doc} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import {Post as IPost} from "./home"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

//defines shape of the post 
interface Props {
    post: IPost;
}

//defines shape of type Like
interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const {post} = props;

    //hook that stores user login authentication info from firebase
    const [user] = useAuthState(auth);

    //hook that adds liked post from a certain user to an array of type liked
    const [likes, setLikes] = useState<Like[] | null>(null);

    //reference to the database to add docs to
    const likesRef = collection(database, "likes");

    //only retreive data where the post.id is the current post id
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    //function that retreives the post user liked + calls function to add that specific post to the 
    //liked colletion
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        // console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id})));
    }

    
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, 
                {userId: user?.uid , 
                postId: post.id
            });
                if (user) {
                    setLikes((prev) => 
                    prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}]
                     );
                }
        } catch (err) {
            console.log(err);
        }
    };

    const removeLike = async () => {
        try {
            //queries the specific doc to delete e.g. current doc
            const toDeleteQuery = query(
                likesRef, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid)
                );

            //retreive id data from that doc passed in from the query
            const deleteData = await getDocs(toDeleteQuery);

            const likeId = deleteData.docs[0].id;

            //finds the doc in the correct database
            const toDelete = doc(database, "likes", likeId);

            await deleteDoc(toDelete);
                if (user) {
                    setLikes((prev) => 
                       prev && prev.filter((like) => like.likeId !== likeId)
                     );
                }
        } catch (err) {
            console.log(err);
        }
    };


    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []);
     

    return <div> 
        <div className="title"> 
            <h1> {post.title} </h1>
        </div>
        <div className="body"> 
            <p> {post.description} </p>
        </div>
        <div className="footer"> 
            <p> @{post.username} </p>
            {/** unicode for a thumbs up button */}
            <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
            {likes &&  <p> Likes: {likes?.length} </p> }
        </div>
    </div>
}