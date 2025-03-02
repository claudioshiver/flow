"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export default function StarRating({value, onChange, max = 5}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHoverValue(null)} role="radiogroup" aria-label="Rating">
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1
        const isFilled = (hoverValue !== null ? hoverValue : value) >= ratingValue

        return (
          <span
            key={index}
            className={`cursor-pointer transition-colors duration-200`}
            onMouseOver={() => setHoverValue(ratingValue)}
            onClick={() => onChange(ratingValue)}
            role="radio"
            aria-checked={value >= ratingValue}
            aria-posinset={ratingValue}
            aria-setsize={max}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onChange(ratingValue)
              }
            }}
          >
            <Star
              size={24}
              fill={isFilled ? '#647AE8' : "none"}
              stroke={isFilled ? '#647AE8' : 'hsl(var(--input))'}/>
          </span>
        )
      })}
    </div>
  )
}

