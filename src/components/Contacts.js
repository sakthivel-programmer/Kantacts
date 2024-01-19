import { useEffect, useState } from "react";

import { useDispatch,
         useSelector } from "react-redux";

import { addContactAsync,
         contactSelector,
         deleteContactAsync,
         updateContactAsync } from "../Reducer/contactReducer";

import { Navbar } from "./NavBar";

import { Loading } from "./Loading";

import Styles from "./contacts.module.css";

// function to get datas from selector
function useValue(){

    const value=useSelector(contactSelector);

    return value;

}

// functional component
export function ContactList(){

    // declaring dispatch function
    const dispatch = useDispatch();

    // retrieving datas from store using selector
    const contacts = useValue();

    // state for loading animation conditional rendering
    const [isLoading,setIsLoading] = useState(false);


    // useEffect method to dispatch and invoke async action
    useEffect(()=>{

        // dispatch to addContactAsync async action 
        dispatch(addContactAsync());

    },[dispatch])
    
    useEffect(()=>{
        
        // once contacts variable got the value then hide the loading animation
        setIsLoading(true);

    },[contacts])

    return(
        <>
        <Navbar/>
            {
                isLoading?

                    <div className={Styles.list}>

                        {contacts.map((contact, index)=>(

                            <div className={Styles.item} key={index}>

                                <div>

                                    <h2>{contact.name}</h2>

                                    <h4>{contact.email}</h4>

                                </div>

                                <div className={Styles.buttons}>

                                    <button className={Styles.deleteBtn}

                                            onClick={()=>dispatch(deleteContactAsync())}

                                    > Delete </button>

                                    <br></br>

                                    <button className={Styles.updateBtn}

                                            onClick={()=>dispatch(updateContactAsync())}

                                    > Update </button>

                                </div>

                            </div>

                        ))}

                    </div>
                :
                    <Loading/>

            }

        </>

    )

};