import { useEffect, useState } from "react"
import Square from "./Square"
import './Board.css'
import WinModal from "../modal/WinModal"

interface IBoardProps {
    N: number;
}

interface ITimeMesurement {
    startTime: number | null;
    gameTime: number | null;
}

function Board({ N }: IBoardProps) {
    const [isGame, setIsGame] = useState(false);
    const [isWinModalOpen, setIsWinModalOpen] = useState(false);
    const [squareIndices, setSquareIndices] = useState(Array.from({ length: N * N }, (_, i) => i + 1));
    const [time, setTime] = useState<ITimeMesurement>({ startTime: null, gameTime: null});

    useEffect(() => {
        setSquareIndices(Array.from({ length: N * N }, (_, i) => i + 1));
        setIsGame(false);
    }, [N])


    function fisherYatesSuffle(array: number[]) {
        let i = array.length;
        while (i > 0) {
            let j = Math.floor(Math.random() * i--);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function countInversions(array: number[]): number {
        let total = 0;
        array.forEach((index, i) => {
            var inversions = 0;
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] !== N*N && array[i] !== N*N && array[j] < index) {
                    inversions++;
                }
            }
            total += inversions;
        });
        return total;
    }

    function isSolvable(board: number[]): boolean {
        if (N % 2 === 1) {
            return countInversions(board) % 2 === 0;
        } else {
            const positionFromBottom = N - Math.floor(board.indexOf(N*N) / N)
            if (positionFromBottom % 2 === 1) {
                return countInversions(board) % 2 === 0;
            } else {
                return countInversions(board) % 2 === 1;
            }
        }
    }

    function suffle(): void {
        let newSquareIndices = [...squareIndices];
        do {
            fisherYatesSuffle(newSquareIndices);
        } while (!isSolvable(newSquareIndices))
        setSquareIndices(newSquareIndices);
        setIsGame(true);
        setIsWinModalOpen(false);
        setTime({...time, startTime: performance.now()});
    }

    function checkWin(board: number[]): boolean {
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== i + 1) {
                return false;
            }
        }
        return true;
    }

    function isValidMove(i1: number, i2: number): boolean {
        const x1 = i1 % N;
        const y1 = Math.floor(i1 / N);
        const x2 = i2 % N;
        const y2 = Math.floor(i2 / N);

        if (x1 === x2 && Math.abs(y1 - y2) === 1) {
            return true;
        }

        if (y1 === y2 && Math.abs(x1 - x2) === 1) {
            return true;
        }

        return false;
    }

    function calculateTime() {
        if (! time.startTime) {
            console.warn('No start time');
            return;
        }
        const endTime = performance.now();
        const gameTime = endTime - time.startTime;
        setTime({ ...time, gameTime: gameTime });
    }

    function makeMove(index: number): void {
        if (!isGame) {
            return;
        }

        let blackPosition = squareIndices.indexOf(N * N);
        let chosenPosition = squareIndices.indexOf(index);
        if (isValidMove(blackPosition, chosenPosition)) {
            let newSquareIndices = [...squareIndices];
            newSquareIndices[blackPosition] = index;
            newSquareIndices[chosenPosition] = N * N;
            setSquareIndices(newSquareIndices);

            if (checkWin(newSquareIndices)) {
                setIsGame(false);
                calculateTime();
                setIsWinModalOpen(true);
            }
        }
    }

    const squareSideLength = 100 * 3 / N + 0.15 * (N - 3) * 50;

    return (
        <>
            <div className="board" style={{ gridTemplateColumns: `repeat(${N}, ${squareSideLength}px)`, gridTemplateRows: `repeat(${N}, ${squareSideLength}px)` }}>
                {
                    squareIndices.map((i: number, position: number) => (<Square key={position} index={i} size={200 * 3 / N} onClick={() => makeMove(i)} isBlank={i === N * N} />))
                }
            </div>
            <div style={{padding: '20px'}}>
                <button onClick={suffle}>Suffle</button>
            </div>
            <WinModal time={time.gameTime } isOpen={isWinModalOpen} onClose={() => setIsWinModalOpen(false) } />
        </>

    )
}

export default Board