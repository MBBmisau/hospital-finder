"use client"

import { useEffect, useRef, useState } from "react"

// https://www.google.com/maps?q=<latitude>,<longitude>&z=<zoom>
// https://www.google.com/maps/dir/?api=1&destination=latitude,longitude


const Modal = ({isOpen, hospital, handleCloseModal}) => {
  const modalRef = useRef(null)  

  useEffect(() => {
    const modalElement = modalRef.current
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal()
      } else {
        modalElement.close()
      }
    }
  }, [isOpen])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCloseModal()
    }
  }

  return (
    <dialog ref={modalRef} className="relative w-11/12 max-w-md flex backdrop:bg-black/80 flex-col rounded-lg bg-slate-300 py-4 px-4">
      <div className="flex justify-between items-center border-b border-orange-600/25 pb-2">
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.Location['Latitude']},${hospital.Location['Longitude']}&z=21`}
          target="_blank"
          className="bg-orange-600 cursor-pointer text-white font-bold text-base py-2 px-4 shadow-sm rounded-lg inline-flex gap-2 items-center">
          <svg width="16" height="20" viewBox="0 0 42 63" strokeWidth={20} fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white">
            <path fillRule="evenodd" clipRule="evenodd" d="M21 0.833344C32.2758 0.833344 41.4166 9.9742 41.4166 21.25C41.4166 24.6593 40.5834 27.8717 39.1039 30.6983L21 62.0833L3.31538 31.4595C1.57498 28.4542 0.583313 24.9693 0.583313 21.25C0.583313 9.9742 9.72416 0.833344 21 0.833344ZM21 6.66668C12.9458 6.66668 6.41665 13.1959 6.41665 21.25C6.41665 23.566 6.95093 25.7882 7.96198 27.7943L8.45197 28.6893L21 50.4167L33.6366 28.5362C34.9071 26.3423 35.5833 23.8555 35.5833 21.25C35.5833 13.1959 29.0541 6.66668 21 6.66668ZM21 12.5C25.8325 12.5 29.75 16.4175 29.75 21.25C29.75 26.0825 25.8325 30 21 30C16.1675 30 12.25 26.0825 12.25 21.25C12.25 16.4175 16.1675 12.5 21 12.5ZM21 18.3333C19.3891 18.3333 18.0833 19.6392 18.0833 21.25C18.0833 22.8608 19.3891 24.1667 21 24.1667C22.6108 24.1667 23.9166 22.8608 23.9166 21.25C23.9166 19.6392 22.6108 18.3333 21 18.3333Z"/>
          </svg>
          View in Google Maps
        </a>
        <button className="text-slate-600 font-bold text-base py-2 px-4 cursor-pointer shadow-sm border border-orange-600 rounded-lg"
          onClick={() => handleCloseModal()}>
          Close
        </button>
      </div>
      <h1 className="text-lg md:text-xl font-bold text-slate-700 mt-3">{hospital.Identifiers['Facility Name']}</h1>
      {hospital.Contacts['Phone Number'] && hospital.Contacts['Email Address'] && <p className="text-sm text-slate-500 ">
        <span>{hospital.Contacts['Phone Number']}</span>
        <span className="ml-6">{hospital.Contacts['Email Address']}</span>
      </p>}
      <div className="w-full mt-3">
        <h2 className="text-base font-bold text-orange-600">Basic Information</h2>
        <dl className="divide-y divide-slate-400">
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">Ownership</dt>
            <dd>{hospital.Identifiers['Ownership']}</dd>
          </div>
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">Ownership Type</dt>
            <dd>{hospital.Identifiers['Ownership Type']}</dd>
          </div>
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">Facility Level</dt>
            <dd>{hospital.Identifiers['Facility Level']}</dd>
          </div>
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">Hours of Operation</dt>
            <dd>{hospital.Identifiers['Hours of Operation']}</dd>
          </div>
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">Operational Status</dt>
            <dd>{hospital.Status['Operational Status']}</dd>
          </div>
        </dl>
      </div>
      <div className="w-full mt-3">
        <h2 className="text-base font-bold text-orange-600">Location</h2>
        <dl>
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">Ward</dt>
            <dd>{hospital.Location['Ward']}</dd>
          </div>
        </dl>
        <dl>
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">LGA</dt>
            <dd>{hospital.Location['LGA']}</dd>
          </div>
        </dl>
        <dl>
          <div className="w-full text-sm flex justify-between text-slate-600 py-2">
            <dt className="font-bold text-slate-600">State</dt>
            <dd>{hospital.Location['State']}</dd>
          </div>
        </dl>
      </div>
      <div className="w-full mt-3">
        <h2 className="text-base font-bold text-orange-600">Days of Operation</h2>
        <p className="w-full text-sm text-slate-600">{hospital.Identifiers['Days of Operation']}</p>
      </div>
    </dialog>
  )
}

export default Modal