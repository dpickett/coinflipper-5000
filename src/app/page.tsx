"use client"
import Image from 'next/image'
import bot from "../svg/bot.svg"
import { sample } from "lodash"
import { FormEvent, useState } from 'react'
import { FlipResult } from '@/components/FlipResult'

export default function Home() {
  const initialFlipResults = {
    heads: 0,
    tails: 0
  }
  const maxIcons = 5000

  const [timesToFlip, setTimesToFlip] = useState(1)
  const [flipResults, setFlipResults] = useState<{ [key: string]: number }>(initialFlipResults)

  const totalResults = flipResults.heads + flipResults.tails

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let newFlipResults: { [key: string]: number } = initialFlipResults
    for (let i = 0; i < timesToFlip; i++) {
      const flipResult = sample(["heads", "tails"])
      newFlipResults = {
        ...newFlipResults,
        [flipResult]: (newFlipResults[flipResult] || 0) + 1
      }
    }
    setFlipResults(newFlipResults)
  }


  const getMode = () => {
    if (totalResults > maxIcons) {
      return "bar"
    }
    else {
      return "icons"
    }
  }

  const resetCount = () => {
    setFlipResults(initialFlipResults)
  }

  return (
    <>
      <main>
        <div className="bg-white">
          <h1 className="text-center">
            <Image className="inline-block mr-4" src={bot} alt="bot" />
            Coin Flipper 5000
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <input type="number" placeholder="Times to Flip" className="border p-2 border-black" value={timesToFlip} onChange={(event) => setTimesToFlip(parseInt(event.currentTarget.value, 10))} />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded">
                Perform Coin Flips
              </button>
              <button type="button" onClick={resetCount} className="bg-gray-500 text-white font-bold py-2 px-4 ml-2 rounded">Reset</button>
            </div>
          </form>
          <div className="grid grid-cols-2 my-4">
            <div className="text-center">
              <h2>Heads</h2>
              <p>{flipResults.heads}</p>
              <FlipResult coinSide="heads" count={flipResults.heads} mode={getMode()} totalResults={totalResults} />
            </div>
            <div className="text-center">
              <h2>Tails</h2>
              <p>{flipResults.tails}</p>
              <FlipResult coinSide="tails" count={flipResults.tails} mode={getMode()} totalResults={totalResults} />
            </div>
          </div>

        </div>
      </main>
      <footer>
        bot by Thomas Soto from <a href="https://thenounproject.com/browse/icons/term/bot/" target="_blank" title="bot Icons">Noun Project</a> (CC BY 3.0)
      </footer>
    </>
  )
}
