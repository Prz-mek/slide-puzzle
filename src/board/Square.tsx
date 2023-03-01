import './Square.css'

interface ISquareProps {
    index: number
    onClick: () => void
    isBlank: boolean
}

function Square({index, onClick, isBlank}: ISquareProps) {
    return (
        <button className={isBlank ? 'blank' : 'square'} onClick={onClick}>{index}</button>
    );
}

export default Square