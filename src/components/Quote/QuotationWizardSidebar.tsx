"use client"

import React, { useState } from 'react'
import {
  PlaneIcon,
  HomeIcon,
  CarIcon,
  PawPrintIcon,
  InfoIcon,
} from 'lucide-react'
interface SidebarProps {
  currentProduct: ProductType
  onProductChange: (product: ProductType) => void
}
export type ProductType = 'travel' | 'home' | 'auto' | 'pet'
interface NavItem {
  id: ProductType
  label: string
  icon: React.ReactNode
}
export function QuotationWizardSidebar({ currentProduct, onProductChange }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<ProductType | null>(null)
  const navItems: NavItem[] = [
    {
      id: 'travel',
      label: 'Travel Assistance',
      icon: <PlaneIcon className="w-5 h-5" />,
    },
    {
      id: 'home',
      label: 'Assurance maladie',
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      id: 'auto',
      label: 'Assurance auto',
      icon: <CarIcon className="w-5 h-5" />,
    },
  ]
  return (
    <div className='bg-white'>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-brand-secondary min-h-screen sticky top-0 border-r border-r-gray-300">
        <div className="p-6">
          <h2 className="text-text-inverse text-xl font-bold mb-8">
            Insurance Portal
          </h2>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentProduct === item.id
              const isHovered = hoveredItem === item.id
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => onProductChange(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-orange-500/15 text-text-inverse border-l-4 border-orange-500' : 'text-text-inverse text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10'}`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </span>
                  </button>

                  {!isActive && isHovered && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-text-main text-text-inverse text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-10 flex items-center gap-2">
                      <InfoIcon className="w-3 h-3" />
                      Switching will reset current quote
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden sticky top-0 bg-brand-secondary z-40 overflow-x-auto">
        <div className="flex min-w-max">
          {navItems.map((item) => {
            const isActive = currentProduct === item.id
            return (
              <button
                key={item.id}
                onClick={() => onProductChange(item.id)}
                className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all ${isActive ? 'text-text-inverse border-b-4 border-orange-500 bg-orange-500/15' : 'text-text-inverse text-opacity-70'}`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
