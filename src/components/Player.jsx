import React, { useState } from 'react'

const Player = ({name,symbol,isActive,handlePlayerNameChange}) => {
    const [playerName,setPlayerName]=useState(name);
    const[isEditing,setIsEditing]=useState(false);
     
    let btnCaption="Edit";
    if(isEditing)
    {
        btnCaption="Save";
    }
    function handleClick(){
        //make sure that updating the state like this (It is updating the state depends on previous value)
        setIsEditing((editing) => !editing);
        if(isEditing)
        {
            handlePlayerNameChange(symbol,playerName);
        }
        
    }
    function handleChange(e)
    {
        setPlayerName(e.target.value);
    }
  return (
    <li className={isActive ? 'active' : undefined}>
        <span className='player'>
            {isEditing ? (<input type='text' required onChange={handleChange} value={playerName}/>) : (<span className='player-name'>{playerName}</span>)}
            <span className='player-symbol'>{symbol}</span>
        </span>
        <button onClick={handleClick}>{btnCaption}</button>
    </li>
  )
}

export default Player
