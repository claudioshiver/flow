"use client"

import React, {Children, cloneElement, isValidElement, MouseEvent, type ReactNode, useCallback, useMemo} from "react"
import {ChevronRight, File, Folder} from "lucide-react"
import {cn} from "@/lib/utils/ui"

type TreeNodeProps = {
  label: ReactNode
  onClick?: () => void
  children?: ReactNode
  isFolder?: boolean
  depth?: number
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

export const TreeNode = ({onToggle, onClick, ...props}: TreeNodeProps) => {
  const handleClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    if (props.isFolder && onToggle) {
      onToggle(!props.isOpen)
    } else if (onClick) {
      onClick()
    }
  }, [props.isFolder, props.isOpen, onToggle, onClick]);

  const treeNodeClass = useMemo(() => (
    cn("flex items-center gap-1 py-1 px-1 rounded-md hover:bg-accent cursor-pointer", {
      "pl-7": !props.isFolder && props.depth === 2,
    })
  ), [props.isFolder, props.depth]);

  const arrowClass = useMemo(() => (
    cn("h-4 w-4 shrink-0 transition-transform", {
      "transform rotate-90": props.isOpen
    })
  ), [props.isOpen]);

  const childrenClass = useMemo(() => (
    cn("ml-2", {
      "hidden": !props.isOpen
    })
  ), [props.isOpen]);

  return (
    <li className="select-none">
      <div onClick={handleClick} className={treeNodeClass}>
        {props.isFolder
          ? <ChevronRight className={arrowClass}/>
          : <div className="w-4 h-4"/>
        }
        {props.isFolder
          ? <Folder className="h-4 w-4 shrink-0"/>
          : <File className="h-4 w-4 shrink-0"/>
        }
        <div className="flex-1 min-w-0">{props.label}</div>
      </div>
      {props.children && (
        <ul className={childrenClass}>
          {Children.map(props.children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                depth: (props.depth || 0) + 1,
              } as any)
            }

            return child
          })}
        </ul>
      )}
    </li>
  )
}

export const Tree = ({children}: { children: ReactNode }) => {
  return <ul className="text-sm">{children}</ul>
}

