import './Message.css'

export default function Message({text, textUid, currentUserUid}) {
    
    return (<div className={`message-container ${textUid === currentUserUid 
        ? 'currentUser-message-container'
        : 'otherUsers-message-container'}`}>
        <div className='avatar icon'></div>
        <div className={`text-box ${textUid === currentUserUid 
        ? 'currentUser-text-box'
        : 'otherUsers-text-box'}`}>{text}</div>
    </div>)
}