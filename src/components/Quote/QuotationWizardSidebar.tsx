"use client"

import React, { useState } from 'react'
import {
  PlaneIcon,
  HomeIcon,
  CarIcon,
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
      {/* 
          Desktop Sidebar 
          - hidden by default, flex on lg screens
          - w-64 to match your previous width
      */}
      <aside className="hidden lg:flex fixed pt-[100px] top-0 left-0 flex-col w-64 px-5 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out border-r border-gray-200 z-40">
         <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          {/* <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-8">
            Insurance Portal
          </h2> */}
          <nav className="mb-6">
             <h2 className="text-gray-900 dark:text-white text-xl font-bold mb-8">
            Insurance Portal
          </h2>
            {navItems.map((item) => {
              const isActive = currentProduct === item.id
              const isHovered = hoveredItem === item.id
              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => onProductChange(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-orange-500/15 text-orange-600 border-l-4 border-orange-500' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </span>
                  </button>

                  {!isActive && isHovered && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-50 flex items-center gap-2">
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

      {/* 
          Mobile Tab Bar 
          - visible by default, hidden on lg screens
          - sticky to stay at top during scroll
      */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 z-40 overflow-x-auto">
        <div className="flex min-w-max px-2">
          {navItems.map((item) => {
            const isActive = currentProduct === item.id
            return (
              <button
                key={item.id}
                onClick={() => onProductChange(item.id)}
                className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all border-b-4 ${
                  isActive 
                    ? 'text-orange-600 border-orange-500 bg-orange-500/15' 
                    : 'text-gray-500 border-transparent'
                }`}
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








// "use client"

// import React, { useState } from 'react'
// import {
//   PlaneIcon,
//   HomeIcon,
//   CarIcon,
//   PawPrintIcon,
//   InfoIcon,
// } from 'lucide-react'
// interface SidebarProps {
//   currentProduct: ProductType
//   onProductChange: (product: ProductType) => void
// }
// export type ProductType = 'travel' | 'home' | 'auto' | 'pet'
// interface NavItem {
//   id: ProductType
//   label: string
//   icon: React.ReactNode
// }
// export function QuotationWizardSidebar({ currentProduct, onProductChange }: SidebarProps) {
//   const [hoveredItem, setHoveredItem] = useState<ProductType | null>(null)
//   const navItems: NavItem[] = [
//     {
//       id: 'travel',
//       label: 'Travel Assistance',
//       icon: <PlaneIcon className="w-5 h-5" />,
//     },
//     {
//       id: 'home',
//       label: 'Assurance maladie',
//       icon: <HomeIcon className="w-5 h-5" />,
//     },
//     {
//       id: 'auto',
//       label: 'Assurance auto',
//       icon: <CarIcon className="w-5 h-5" />,
//     },
//   ]
//   return (
//     <div className='bg-white h-full'>
//       {/* Desktop Sidebar */}
//       {/* <aside className="hidden lg:block w-64 bg-brand-secondary min-h-screen sticky top-0 border-r border-r-gray-300"> */}
//       <aside className="fixed pt-[100px] top-0 left-0 flex flex-col px-5 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out border-r border-gray-200">
//         <div className="p-2 md:p-4">
//           <h2 className="text-text-inverse text-xl font-bold mb-8">
//             Insurance Portal
//           </h2>
//           <nav className="space-y-2">
//             {navItems.map((item) => {
//               const isActive = currentProduct === item.id
//               const isHovered = hoveredItem === item.id
//               return (
//                 <div key={item.id} className="relative">
//                   <button
//                     onClick={() => onProductChange(item.id)}
//                     onMouseEnter={() => setHoveredItem(item.id)}
//                     onMouseLeave={() => setHoveredItem(null)}
//                     className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-orange-500/15 text-text-inverse border-l-4 border-orange-500' : 'text-text-inverse text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10'}`}
//                   >
//                     <span className="flex items-center gap-3">
//                       {item.icon}
//                       <span className="font-medium">{item.label}</span>
//                     </span>
//                   </button>

//                   {!isActive && isHovered && (
//                     <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-text-main text-text-inverse text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-10 flex items-center gap-2">
//                       <InfoIcon className="w-3 h-3" />
//                       Switching will reset current quote
//                     </div>
//                   )}
//                 </div>
//               )
//             })}
//           </nav>
//         </div>
//       </aside>

//       {/* Mobile Tab Bar */}
//       <div className="lg:hidden sticky top-0 bg-brand-secondary z-40 overflow-x-auto">
//         <div className="flex min-w-max">
//           {navItems.map((item) => {
//             const isActive = currentProduct === item.id
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => onProductChange(item.id)}
//                 className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-all ${isActive ? 'text-text-inverse border-b-4 border-orange-500 bg-orange-500/15' : 'text-text-inverse text-opacity-70'}`}
//               >
//                 {item.icon}
//                 <span className="font-medium text-sm">{item.label}</span>
//               </button>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }
