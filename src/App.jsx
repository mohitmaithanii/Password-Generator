import { useState, useCallback, useEffect, useRef } from "react";

function App() {
   const [length, setLength] = useState(8);
   const [numberAllowed, setNumberAllowed] = useState(false);
   const [charAllowed, setCharAllowed] = useState(false);
   const [password, setPassword] = useState("");

   //useRef hook
   const passwordRef = useRef(null);

   const passwordGenerator = useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";
      if (charAllowed) str += "!@#$%^&*_-+=~`";

      for (let i = 0; i < length; i++) {
         let char = Math.floor(Math.random() * str.length);
         pass += str.charAt(char);
      }
      setPassword(pass);
   }, [length, numberAllowed, charAllowed]);

   const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0, 20);
      window.navigator.clipboard.writeText(password);
   }, [password]);

   useEffect(() => {
      passwordGenerator(); // Call passwordGenerator in the useEffect
   }, [length, numberAllowed, charAllowed, passwordGenerator]);

   return (
      <>
         {/* main container */}
         <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-4 my-20 text-orange-500 bg-white pb-4 shadow-gray-500 ">
            <h1 className="text-black text-center py-4 font-semibold">
               Password
               <span className="text-orange-500 text-xl "> Generator</span>{" "}
            </h1>
            {/* input box */}
            <div className="flex shadow-lg rounded-lg overflow-hidden mb-8 mt-4">
               <input
                  type="text"
                  value={password}
                  className="outline-none w-full py-1 px-3 "
                  placeholder="Password"
                  readOnly
                  ref={passwordRef}
               />
               {/* Copy button */}
               <button
                  onClick={copyPasswordToClipboard}
                  className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700">
                  Copy
               </button>
            </div>
            {/* range */}
            <div className="flex text-sm gap-x-2">
               <div className="flex items-center gap-x-1">
                  <input
                     type="range"
                     min={6}
                     max={18}
                     className="cursor-pointer"
                     value={length} // Add value attribute
                     onChange={(e) => {
                        setLength(e.target.value);
                     }}
                  />
                  <label>Length: {length}</label>
               </div>
               {/* number checkbox */}
               <div className="flex text-sm gap-x-1">
                  <input
                     type="checkbox"
                     checked={numberAllowed} // Change defaultChecked to checked
                     id="numberInput"
                     onChange={() => {
                        setNumberAllowed((prev) => !prev); // Correct the function name
                     }}
                  />
                  <label htmlFor="numberInput">Numbers</label>
               </div>
               {/* special characters checkbox */}
               <div className="flex items-center gap-x-1">
                  <input
                     type="checkbox"
                     checked={charAllowed} // Change defaultChecked to checked
                     id="charInput"
                     onChange={() => {
                        setCharAllowed((prev) => !prev); // Correct the function name
                     }}
                  />
                  <label htmlFor="charInput">Special Characters</label>
               </div>
            </div>
         </div>
      </>
   );
}

export default App;
