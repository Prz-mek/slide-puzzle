import './Square.css'

interface ISquareProps {
    index: number
    onClick: () => void
    isBlank: boolean
    size: number
}

function Square({index, onClick, isBlank, size}: ISquareProps) {

    const pixelsToFontConst = 0.75;

    return (
        <button
            className={isBlank ? 'blank' : 'square'}
            style={{fontSize: size / 2.5 * pixelsToFontConst }}
            onClick={onClick}
        >{index}</button>
    );
}

export default Square