import { useState, useEffect } from "react";

const initialState = {
    flip: false
}

export default function EmojiData({ data }) {

    const [gameOn, setGameOn] = useState(false)
    const [cards, setCards] = useState([])
    const [firstCard, setFirstCard] = useState(initialState)
    const [secondCard, setSecondCard] = useState(initialState)
    const [matched, setMatched] = useState([])
    const [clickDisabled, setClickDisabled] = useState(false)
    const [flipped, setFlipped] = useState([])
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        if (firstCard.flip && secondCard.flip) {
            setClickDisabled(true)
            if (firstCard.pairId === secondCard.pairId && firstCard.cardId !== secondCard.cardId) {
                setMatched(prev => [...prev, firstCard.cardId, secondCard.cardId])
                setFlipped([])
                setFirstCard(initialState)
                setSecondCard(initialState)
                setClickDisabled(false)
            } else if (firstCard.pairId !== secondCard.pairId) {
                setTimeout(() => {
                    setFlipped([])
                    setFirstCard(initialState)
                    setSecondCard(initialState)
                    setClickDisabled(false)
                }, 1000);
            }
        }

    }, [firstCard, secondCard])

    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            setGameOver(true)
            setTimeout(() => {
                setClickDisabled(false)
            }, 1000);
        }
    }, [matched, cards])


    function ShuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let arrIt = arr[i]
            arr[i] = arr[j]
            arr[j] = arrIt
        } return arr;
    }

    function handleStart() {
        const randIndexArray = [];
        const randomEmojiArray = [];

        for (let i = 1; i <= 5; i++) {
            const randIndex = Math.floor(Math.random() * data.length)
            if (!randIndexArray.includes(randIndex)) {
                randIndexArray.push(randIndex)
            } else {
                i--
            }
        }

        randIndexArray.forEach(item => {
            randomEmojiArray.push(data[item])
            return randomEmojiArray;
        })

        const randomEmojiArrayCopy = [...randomEmojiArray, ...randomEmojiArray]
        setCards(ShuffleArray(randomEmojiArrayCopy.map((item, index) => {
            return { ...item, cardId: index, flip: false, pairId: item.codePoint }
        })))

        setGameOn(true)
        setGameOver(false)
        setMatched([])
        setFlipped([])
        setFirstCard(initialState)
        setSecondCard(initialState)
    }


    function handleClick(obj) {
        // the parameter in this fucntion is the same as the cardElem button onclick handle function parameter.
        if (clickDisabled || flipped.includes(obj.cardId) || matched.includes(obj.cardId)) {
            return null
        }
        if (!firstCard.flip) {
            setFirstCard(prev => { return { ...prev, cardId: obj.cardId, pairId: obj.codePoint, flip: true } })
            if (!flipped.includes(obj.cardId)) {
                setFlipped(prev => [...prev, obj.cardId])
            }
        } else if (firstCard.flip && !secondCard.flip) {
            if (firstCard.cardId !== obj.cardId) {
              setSecondCard(prev => { return { ...prev, cardId: obj.cardId, pairId: obj.codePoint, flip: true } })
            }

            if (!flipped.includes(obj.cardId)) {
                setFlipped(prev => [...prev, obj.cardId])
            }
        }
    }


    const cardElems = cards.map((item) => {
        return <button key={`${item.cardId}`} className={`cursor-pointer p-2 m-1 w-36 border-2 border-solid border-black h-36 bg-blue-300 text-4xl rounded-lg shadow-[2px_2px_5px] shadow-gray-300 active:bg-blue-500 hover:bg-blue-400 hover:scale-108 transition-all `} disabled={clickDisabled} onClick={() => handleClick(item)}>
            {matched.includes(item.cardId) || flipped.includes(item.cardId) ? item.character : "❔"}
        </button>

    })


    return <div>
        <button className={`cursor-pointer text-4xl text-black mb-15 p-2 rounded-md font-serif bg-[#d2eb55c8] ${gameOn && !gameOver ? "" :"hover:scale-105 transition-transform"}  ${gameOn && !gameOver ? "disabled:cursor-not-allowed" : null}`} disabled={gameOn && !gameOver} onClick={handleStart}>{!gameOn ? "Start  Game" : (gameOver ? "Congrats... You Won. Start A New Game" : "Game In Progress")}</button>
        <div className="grid grid-cols-5 grid-rows-2 gap-4">
            {gameOn && cardElems}
        </div>
    </div>
}