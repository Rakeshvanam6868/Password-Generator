import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import "./App.css";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";


function App() {
  const [length, setLength]=useState(4);
  const [checkboxData, setCheckboxData]=useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lower Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
     const updateCheckboxData = [...checkboxData];
     updateCheckboxData[i].state =! updateCheckboxData[i].state;
     setCheckboxData(updateCheckboxData);
  };

  const handleCopy = () => {
      navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(()=>{
        setCopied(false);
      },1000);
  };

  const {password, errorMessage, generatePassword} = usePasswordGenerator();

  return (
    <>
      <div className="container">
        {password && (
        <div className="heading">
          <div className="title">{password}</div>
          <Button 
             text={copied ? "copied" : "copy"} 
             onClick={handleCopy} 
             customClass="copyBtn"
           />
        </div>
        )}
        <div className="char">
          <span>
            <label htmlFor="">Character Length</label>
            <label>{length}</label>
          </span>
          <input type="range" name="" id="" min="4" max="20" onChange={(e)=>setLength(e.target.value)} value={length}/>
        </div>

        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <CheckBox 
                key={index}
                title={checkbox.title}
                state={checkbox.state}
                onChange={()=> handleCheckboxChange(index)}
                customClass="inputs"
              />
            );
          })}
        </div>

        <PasswordStrengthIndicator password={password}/>

        {errorMessage &&  <div className="errorMessage">
          {errorMessage}
        </div>}
        <Button 
           text="Generate Password" 
           onClick={() => generatePassword(checkboxData,length)} 
           customClass="generateBtn"
         />
      </div>
    </>
  );
}

export default App;
