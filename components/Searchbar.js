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