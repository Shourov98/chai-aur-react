import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState()

  // useRef hook to refer text 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllow) str += "0123456789"
    if(charAllow) str += "~`!@#$%^&*()_-+={}[]/><"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)



  }, [length, numberAllow,charAllow, setPassword])


  // Function to copy the password which created in textbox
  const copyPasswordToClipboard = useCallback(() => {
    // Selects the copyed text for user to show good UI effect
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20)
    // Copy text in clipboard
    window.navigator.clipboard.writeText(password)
  }, [password])

  
  // Recreate or Rerender text when change any of these parameter
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charAllow, passwordGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center my-3 py-4'>
          Password Generator
        </h1>

        <div className='flex shadow rounded-lg overflow-hidden mb4'>
          <input type="text" 
          value={password} 
          placeholder="password" 
          className="outline-none w-full py-1 px-3 my-3 rounded-lg" readOnly ref={passwordRef} 
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className='flex items-center gap-4 py-3'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label >Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={numberAllow}
              id='numberInput'
              onChange={() => {setNumberAllow((prev) => !prev)}}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={charAllow}
              id='charInput'
              onChange={() => {setCharAllow((prev) => !prev)}}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
        
      </div>

      
    </>
  )
}

export default App
