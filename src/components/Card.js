/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import '../styles/Card.scss'
function Card(props)
{
    let [techString,setTechString]= useState(''); 
    useEffect(()=>
    {
        function arrayToString(arrayOfStrings)
    {
        try
        {
            let stringConverted ='';
            arrayOfStrings.map(e=>{
                stringConverted += `${e}, `;
            })
            stringConverted.replace(",");
            setTechString(stringConverted.substring(0, stringConverted.length - 2));
            console.log(techString);
        }
        catch(err)
        {
            console.log(err);
        }
    }
        arrayToString(props.dev.techs);
    }, [props.dev.techs])
    
    return(
        <li className="dev-item" key={props.dev._id}>
            <header>
                <img src={props.dev.avatar_url} alt="Gabriel Camargo"></img>
                <div className="user-info">
                    <strong>{props.dev.name}</strong>
                    <span>{techString}</span>
                </div>
            </header>
            <p>{props.dev.bio}</p>
            <a href={`http://github.com/${props.dev.github_user}`}>Siga me no GitHub!</a>
        </li>
    );
}

export default Card;