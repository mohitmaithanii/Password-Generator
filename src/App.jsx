import { useState } from "react";
import "./App.css";

function App() {
   const [length, setLength] = useState(8);
   const [number, setNumber] = useState(false);
   const [character, setCharacter] = useState(false);
   const [password, setPasssword] = useState("");

   const passwordGenerator = () => {}

   return (
      <>
         <h1 className="text-4xl text-center font-semibold">
            Password Generator
         </h1>
      </>
   );
}

export default App;
