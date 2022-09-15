import './Dashboard.css';
import { useNavigate } from 'react-router-dom'
import {  useAuth  } from '../contexts/AuthContext'
import React, {useEffect, useRef, useState} from 'react'
import { firestore } from "../Firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Message from './Message'

export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate();
    const [submitValue, setSubmitValue] = useState('')
    const [limit, setLimit] = useState(25);
    const [submitLoading, setSubmitLoading] = useState(false)

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt', 'desc').limit(limit)

  const [messages] = useCollectionData(query)

  console.log("We are in dashboard component!")

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)

        if(currentUser === null) navigate('/login')
    })

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            let button = document.querySelector('.submit')
            button.click()
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const { uid } = currentUser;
        
        if(submitValue !== '' && !submitLoading) {
            setSubmitLoading(true)
            await messagesRef.add({
                uid,
                createdAt: Date.now(),
                text: submitValue
            })
        }

        let elements = document.querySelectorAll('li')
        if (elements !== null) {
            elements[elements.length-1].scrollIntoView()
        }
        
        setSubmitValue('')
    }

    const onChange = (e) => {
        setSubmitValue(e.target.value)
        setSubmitLoading(false)
    }

    const onLogout = async () => {
        try {
            await logout()
            console.log('logout completed')
        }

        catch(e) {
            console.log('logout failed ' + e)
        }
    }

    const newList = messages !== undefined ?  [...messages] : undefined

    return (
    <> 
        {(currentUser !== null && messages !== undefined) && <>
        <div className='dashboard-container'>
        <header><h1 className='dashboard-title'>Messenger</h1><div className='logout icon' onClick={onLogout}></div></header>
        <div className='dashboard-viewport'>
            <ul>
                {newList.reverse().map(message => (<li key={message['createdAt']}><Message text={message['text']} textUid={message['uid']} currentUserUid={currentUser['uid']} /></li>))}
            </ul>
        </div>
            <form onSubmit={onSubmit}>
            <textarea placeholder='Write a message...' onChange={onChange} value={submitValue} />
            <button className='submit icon'> </button>
            </form>
        </div>
        </> }
        
    </>)
}