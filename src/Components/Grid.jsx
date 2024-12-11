import { useState, useEffect } from 'react'
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import cardArr from "../Constent/Urls"
import cover from '../assets/cover.svg'

const Grid = () => {
  const [cards, setCards] = useState([]);
  const [chosenCards, setChosenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    cardArr.sort(() => Math.random() - 0.5)
    setCards(cardArr)
    setChosenCards([])
    setMatchedCards([])
    setScore(0)
    return () => {

    }
  }, [reset])

  useEffect(() => {
    if (chosenCards.length === 2) {
      const [firstCard, secondCard] = chosenCards;
      console.log(firstCard, secondCard)
      setTimeout(() => {
        if (firstCard.name === secondCard.name) {
          setChosenCards([...matchedCards, firstCard.name])
          setScore(score + 1)
          toast.success("You find the match")
        } else {
          const updatedCards = cards.map(
            (c) => (c.id === firstCard.id || c.id === secondCard.id) ? { ...c, status: "pending" } : c
          )
          setCards(updatedCards)
        }
        setChosenCards([])

      }, 1000);

    }
    return () => {

    }
  }, [chosenCards])


  const handleClick = (card) => {
    if (chosenCards.length === 2) return;
    const updatedCards = cards.map(
      (c) => c.id === card.id ? { ...c, status: "active" } : c
    )
    setChosenCards([...chosenCards, card])
    setCards(updatedCards)
  }

  return (
    <div className='flex flex-col items-center justify-center bg-[#8661C1] h-screen'>

      <h1 className='text-5xl bg-gradient-to-r from-[#E707FA] to-[#A106F4] text-transparent bg-clip-text font-semibold py-4'>Memory Game</h1>

      <h1 className='text-4xl font-bold md:mb-8 mb-4 text-[#C9DAEA]'>
        {
          score === cards.length / 2 ? "You Found all the cards" : "Score : " + score
        }
      </h1>

      <div className='grid grid-cols-4 gap-4 max-w-[550px] mx-auto'>
        {
          cards.map((card) => {
            return (
              <motion.button key={card.id} onClick={() => handleClick(card)} disabled={card.status === "active"}
                className='flex-1 justify-center items-center object-contain rounded-lg'>
                <motion.img
                  animate={{
                    scale: card.status === "active" ? 1.1 : [1, -1],
                    rotateY: card.status === "active" ? [0, 180, 180, 0] : 0,
                    borderRadius: card.status === "active" ? ["0%", "0%", "50%", "50%", "25%"] : "0.5rem",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "circIn",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: 0
                  }}
                  src={card.status === "active" ? card.img : cover} alt=""
                  className={`aspect-square w-24  p-1 ${card.status === "active" ? 'bg-[#031D44]' : "bg-[#FDF5BF]"}`} />
              </motion.button>
            )
          })
        }
      </div>

      <button onClick={() => setReset(!reset)}
        className='mt-8 bg-[#E2B6CF] hover:bg-[#E2A6CF] rounded-[100px] w-[225px] px-8 py-4 text-3xl font-bold'>
        {
          score === cards.length / 2 ? "Play Again" : "Reset"
        }
      </button>

    </div>
  )
}

export default Grid
