import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {addDoc, collection} from 'firebase/firestore'
import {auth, database} from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from 'react-router-dom'
import { Home } from "../main/home";

//addDoc adds a new entry to your database
//collection function used to specify which collection to add the
//document to

//typescript required: type for our form componenets
interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {

    //retreives the user's data to display username later
    const [user] = useAuthState(auth);
    //allows us to navigate to a new page once submit is pressed
    const navigate = useNavigate();

    //defines the shape of our form that user must input
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description").max(20),

    })
    //handles the validation of the input & passing in the shape we've defined
    //we want to use its register and handle submit functions
    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    //collection function must get a database from the config file & which 
    //collection it belongs to --> Look on fb & look at what the collection
    //name is
    const postRef = collection(database, "posts");

    //custom function that will run to handle form submission
    const onCreatePost = async (data: CreateFormData) => {
        //addDoc requires you to pass in your collection function ("postref")
        //and the data that you want to add to your collection
        await addDoc(postRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            //firebase will check to make sure that ONLY the user logged in 
            //can make a post from THAT user
            userId: user?.uid,
        });

        navigate("/");
    };

    return (
    <form onSubmit={handleSubmit(onCreatePost)}> 
        <input placeholder="Title..." {...register("title")}/>
        <p style={{color: "red"}}> {errors.title?.message}</p>
        {/** textarea allows us to type out paragraphs */}
        <textarea placeholder="Description..." {...register("description")}/>
        <p style={{color: "red"}}> {errors.description?.message}</p>
        <input type="submit" className="submitForm"/>
    </form>)
}