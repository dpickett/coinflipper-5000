import React from "react"
import Image from "next/image"

import heads from "../svg/heads.svg"
import tails from "../svg/tails.svg"

export const FlipResult = ({
  coinSide,
  count,
  mode,
  totalResults = 0
}: {
  coinSide: "heads" | "tails",
  count: number,
  mode: "icons" | "bar",
  totalResults: number
}) => {
  const icon = {
    heads: heads,
    tails: tails
  }[coinSide]
  if (mode === "icons") {
    const icons = Array(count).fill(0).map((_, index) => {
      return <Image key={index} width={50} className="inline-block mr-4" src={icon} alt={coinSide} />
    })

    return <>{icons}</>
  }
  else {
    if (totalResults > 0) {
      return <div className="mx-4 flex align-middle">
        <Image width={50} className="inline-block mr-4" src={icon} alt={coinSide} />
        <div className="w-full my-4 h-6 bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="h-6 bg-blue-500 rounded-full dark:bg-blue-500" style={{ width: `${(count / totalResults * 100)}%` }}></div>
        </div >
      </div>

    }

  }


}
