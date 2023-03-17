import { createPortal } from 'react-dom'
import './WinModal.css'

interface IWinModalProps {
    time: number | null;
    isOpen: boolean;
    onClose: () => void;
}

function WinModal({time, isOpen, onClose}: IWinModalProps) {

    function formatTime(time: number): string {
        time = Math.round(time);
        const milliseconds = time % 1000;
        const seconds = Math.floor(time / 1000) % 60;
        const minutes = Math.floor(time / 60000);
        return `${minutes}:${("0"+ seconds).slice(-2)}:${("00"+ milliseconds).slice(-3)}`
    }

    return isOpen ? createPortal(
        <div className='container'>
            <h3>VICTORY!</h3>
            <p>{`Congratulations! Your time is ${ time ? formatTime(time) : "unknown"}.`}</p>
            <button onClick={onClose}>OK</button>
        </div>,
        document.getElementById('portal') as Element | DocumentFragment
    ) : null
}

export default WinModal