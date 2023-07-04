
//grab ALL documents & get the collection
import {getDocs, collection} from 'firebase/firestore'
import { database } from '../../config/firebase';
import { useEffect, useState } from 'react';
import {Post} from './post';

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Home = () => {
    //state to keep track of the data that we get back 
    //this will be of type array of post
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    //make a reference for the collection in our database
    const postsRef = collection(database, "posts")

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        //cast the data to be of type Post[] 
        setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]); 
    }
    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        //returns a post for each element in the list
    <div> 
        {postsList?.map((post) => (
        <Post post={post}/>
        ))} 
    </div>
    );
}