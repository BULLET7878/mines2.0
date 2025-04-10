import './Square.css';
import hoverEffect from '../assets/Sound/hover.wav';
import DiamondEffect from '../assets/Sound/gold.wav';
import goldIcon from '../assets/gold.png';
import bombIcon from '../assets/bomb.png';
import { useEffect, useState, useRef } from 'react';

function Square({ mine, setGameOver, gameOver, setScore, reset }) {
    const [image, setImage] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const hoverSound = useRef(new Audio(hoverEffect));
    const diamondSound = useRef(new Audio(DiamondEffect));

    useEffect(() => {
        if (gameOver) {
            setImage(mine ? bombIcon : goldIcon);
        }
    }, [gameOver, mine]);

    useEffect(() => {
        setImage(null);
        setIsClicked(false);
    }, [reset]);

    function mouseEnterHandle() {
        if (!isClicked && !gameOver) {
            if (hoverSound.current.paused) {
                hoverSound.current.currentTime = 0;
                hoverSound.current.play();
            }
        }
    }

    function clickHandler() {
        if (gameOver || isClicked) return;
        setIsClicked(true);

        if (!mine) {
            setScore(prevValue => prevValue + 100);
            setImage(goldIcon);
            diamondSound.current.currentTime = 0;
            diamondSound.current.play();
        } else {
            setImage(bombIcon);
            setTimeout(() => setGameOver(true), 500);
        }
    }

    return (
        <div className={`square-item ${isClicked ? 'revealed' : ''}`} onMouseEnter={mouseEnterHandle} onClick={clickHandler}>
            {image && <img height={90} width={90} src={image} alt="icon" />}
        </div>
    );
}

export default Square;
