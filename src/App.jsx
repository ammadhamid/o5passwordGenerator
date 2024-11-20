import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  let [length, setlength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);

  const [pass, setPass] = useState();

  const passGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPass(pass);
  },
  [length, numAllowed, charAllowed, setPass]);
    const passRef = useRef(null);
    const copyPasstoClipboard = useCallback(() => {
    passRef.current?.select();   //"Agar passRef ki current value exist krti hai (null nahi hai), toh uska select() method call krdo, otherwise kuch mat kro"
    passRef.current?.setSelectionRange(0 , 8); // just for value select hongi pass 8 se ziada nahi ho 
    window.navigator.clipboard.writeText(pass);
  }, [pass])

  useEffect(() => {
    passGenerator();
  }, [length, numAllowed, charAllowed])

  return (
    <>
      <div className='w-full  max-w-md mx-auto rounded-lg shadow-md px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-orange-500 text-center my-5'>Password Generator</h1>
        <div className='flex shadow rouned-lg overflow-hidden mb-4'>
          <input type="text"
            value={pass}
            className='rounded-md outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passRef}  //ref ki value change hogi uper passRef.current  bhi change hojayega isi liye .select() call hoga 
          />
          <button onClick={() => { copyPasstoClipboard() }}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-md ml-5' >
            Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              className='cursor-pointer'
              value={length}
              onChange={(e) => {
                setlength(e.target.value)
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='numberInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label >Character </label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
