"use client"

import * as React from "react"
import {Check, X} from "lucide-react"

import {Badge} from "@/components/ui/badge"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {cn} from "@/lib/utils/ui"
import {useCallback} from "react";

export type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function MultiSelect({onChange, ...props}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleRemove = useCallback((value: string) => {
    onChange(props.selected.filter((v) => v !== value))
  }, [onChange, props.selected])

  const handleSelect = useCallback((value: string) => {
    const isSelected = props.selected.includes(value)

    onChange(
      isSelected
        ? props.selected.filter((v) => v !== value)
        : [...props.selected, value]
    )
  }, [onChange, props.selected])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const itemClass = useCallback((isSelected: boolean) => (
    cn("mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary", {
      "bg-primary text-primary-foreground": isSelected,
      "opacity-50": !isSelected
    })
  ), [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex min-h-10 w-[300px] cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
          <div className="flex flex-wrap gap-1">
            {props.selected.length > 0 ? (
              props.selected.map((value) => {
                const selectedOption = props.options.find((option) => option.value === value)
                return (
                  <Badge key={value} variant="secondary" className="mr-1 mb-1">
                    {selectedOption?.label}
                    <button
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onMouseDown={handleMouseDown}
                      onClick={() => handleRemove(value)}>
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground"/>
                    </button>
                  </Badge>
                )
              })
            ) : (
              <span className="text-muted-foreground">{props.placeholder}</span>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder={props.searchPlaceholder}/>
          <CommandList>
            <CommandEmpty>{props.emptyMessage}</CommandEmpty>
            <CommandGroup>
              {props.options.map((option) => {
                const isSelected = props.selected.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}>
                    <div className={itemClass(isSelected)}>
                      {isSelected && <Check className="h-2 w-2"/>}
                    </div>
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

