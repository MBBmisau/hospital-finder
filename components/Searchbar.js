"use client"

import { useEffect, useState } from "react";
//import data from "@/data/hospitalsRegional.json"
import Modal from "./Modal";

const Searchbar = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentHospital, setCurrentHospital] = useState({})
  const [inputValue, setInputValue] = useState('')

  const fetchFilteredSuggestions = async (value) => {

    if (!value) {
      setFilteredSuggestions([]); // Clear suggestions if input is empty
      return;
    }

    try {
      const response = await fetch(`api/hospital?q=${value}`)
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }
      const filteredSuggestions = await response.json()
      setFilteredSuggestions(filteredSuggestions)
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
    }
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchFilteredSuggestions(inputValue)
    }, 300)
    return () => clearTimeout(delayDebounce)
  }, [inputValue,])

  const handleSelect = (hospital) => {
    setCurrentHospital(hospital)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
    { isModalOpen ?
       <Modal isOpen={isModalOpen} hospital={currentHospital} handleCloseModal={handleCloseModal}/> :
    <div className='max-h-[500px] flex flex-col gap-0 w-full max-w-md mx-auto rounded-3xl shadow-md bg-slate-300 z-10'>
      <div className="flex rounded-full z-10 bg-slate-200 px-4 py-2 w-full">
        <button className="self-center flex p-1 cursor-pointer bg-slate-200"> 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 64 64" 
            width="24" 
            height="24" 
            fill="currentColor"
            className="fill-orange-500"
          >
            <rect x="2" y="2" width="60" height="60" rx="8" ry="8" className="fill-orange-400"/>
            <rect x="26" y="12" width="12" height="40" className="fill-slate-200" />
            <rect x="12" y="26" width="40" height="12" className="fill-slate-200" />
          </svg>
        </button>
        <input
          type="text"
          className="w-full flex bg-transparent pl-2 text-slate-700 outline-0"
          placeholder="Search by Name, LGA, or Ward"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}

        />
      </div>
      <ul className="w-full divide-y divide-slate-300 h-full overflow-y-scroll">
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} className='cursor-pointer p-2 text-slate-700  px-10 py-4 w-full'
            onClick={() => handleSelect(suggestion)}>
              <h3 className="text-sm font-medium text-slate-700">{suggestion.Identifiers['Facility Name']}</h3>
              <span className="text-xs text-slate-500 leading-3">Level: {suggestion.Identifiers['Facility Level']}</span>  <br />
              <p className="text-xs leading-3 text-orange-800 inline-flex gap-1 items-center">
                <svg width="12" height="14" viewBox="0 0 42 63" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-orange-800">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21 0.833344C32.2758 0.833344 41.4166 9.9742 41.4166 21.25C41.4166 24.6593 40.5834 27.8717 39.1039 30.6983L21 62.0833L3.31538 31.4595C1.57498 28.4542 0.583313 24.9693 0.583313 21.25C0.583313 9.9742 9.72416 0.833344 21 0.833344ZM21 6.66668C12.9458 6.66668 6.41665 13.1959 6.41665 21.25C6.41665 23.566 6.95093 25.7882 7.96198 27.7943L8.45197 28.6893L21 50.4167L33.6366 28.5362C34.9071 26.3423 35.5833 23.8555 35.5833 21.25C35.5833 13.1959 29.0541 6.66668 21 6.66668ZM21 12.5C25.8325 12.5 29.75 16.4175 29.75 21.25C29.75 26.0825 25.8325 30 21 30C16.1675 30 12.25 26.0825 12.25 21.25C12.25 16.4175 16.1675 12.5 21 12.5ZM21 18.3333C19.3891 18.3333 18.0833 19.6392 18.0833 21.25C18.0833 22.8608 19.3891 24.1667 21 24.1667C22.6108 24.1667 23.9166 22.8608 23.9166 21.25C23.9166 19.6392 22.6108 18.3333 21 18.3333Z"/>
                </svg>
                <span>{suggestion.Location['Ward']}, {suggestion.Location['LGA']} LGA, {suggestion.Location['State']} State</span>
              </p>
          </li>
        ))}
      </ul>
    </div>
    }
    </>
  )
}

export default Searchbar


//<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//<g id="SVGRepo_bgCarrier" strokeWidth="0"/>
//<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
//<g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z" stroke="#ff5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path fillRule="evenodd" clipRule="evenodd" d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z" stroke="#ff5c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z" fill="#ff5c5c"/> </g>
//</svg>\