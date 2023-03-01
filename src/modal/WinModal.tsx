import { createPortal } from 'react-dom'
import './WinModal.css'

interface IWinModalProps {
    isOpen: boolean
    onClose: () => void
}

function WinModal({isOpen, onClose}: IWinModalProps) {

    return isOpen ? createPortal(
        <div className='container'>
            <h3>YOU WON!</h3>
            <p>Congratulations!</p>
            <button onClick={onClose}>OK</button>
        </div>,
        document.getElementById('portal') as Element | DocumentFragment
    ) : null
}

export default WinModal