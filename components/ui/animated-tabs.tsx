"use client"
import { useEffect, useRef } from "react"

export interface AnimatedTabsProps {
  tabs: { label: string }[]
  activeTab: string
  onTabChange: (label: string) => void
}

export function AnimatedTabs({ tabs, activeTab, onTabChange }: AnimatedTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container && activeTab) {
      const activeTabElement = activeTabRef.current

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement

        const clipLeft = offsetLeft + 16
        const clipRight = offsetLeft + offsetWidth + 16

        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100,
        ).toFixed()}% 0 ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 17px)`
      }
    }
  }, [activeTab])

  return (
    <div className="relative bg-slate-100/80 border border-slate-300/40 mx-auto flex w-fit flex-col items-center rounded-full py-2 px-4 shadow-sm">
      <div
        ref={containerRef}
        className="absolute z-10 w-full overflow-hidden [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]"
      >
        <div className="relative flex w-full justify-center bg-indigo-600">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(tab.label)}
              className="flex h-8 items-center rounded-full p-3 text-sm font-medium text-white"
              tabIndex={-1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex w-full justify-center">
        {tabs.map(({ label }, index) => {
          const isActive = activeTab === label

          return (
            <button
              key={index}
              ref={isActive ? activeTabRef : null}
              onClick={() => onTabChange(label)}
              className="flex h-8 items-center cursor-pointer rounded-full p-3 text-sm font-medium text-slate-600"
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
