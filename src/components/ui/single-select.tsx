"use client"

import * as React from "react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export type Option = {
  value: string
  label: string
}

type SingleSelectProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SingleSelect({onChange, ...props}: SingleSelectProps) {
  return (
    <Select value={props.value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={props.placeholder}/>
      </SelectTrigger>
      <SelectContent>
        {props.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

