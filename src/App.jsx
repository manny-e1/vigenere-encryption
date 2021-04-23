import { useState } from "react";

const isUpperCase = letter => {
	const ascii = letter.charCodeAt()
	if (ascii > 64 && ascii < 91) return true
	return false 
}

const isLowerCase = letter => {
	const ascii = letter.charCodeAt()
	if (ascii > 96 && ascii < 123 ) return true
	return false 
}


const mod = (n,m) => ((n % m) + m) % m



function App() {

  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')
  const [encryptedText, setEncryptedText] = useState('')
  const encrypt = (text,secretKey) => {
    let encrypted = ''
    let j = 0
    for (let i = 0; i < text.length; i++){
      let currentLetter = text[i]
      const A = 65
      const a = 97
      
      if (isUpperCase(currentLetter)) {
        let pi = (currentLetter.charCodeAt() -A)
        let ki = (secretKey[j % secretKey.length].toUpperCase().charCodeAt() - A)
        let upperLetter = mod(pi + ki, 26)
        encrypted += String.fromCharCode(upperLetter + A)
        j++
      }
      else if (isLowerCase(currentLetter)){
        let pi = (currentLetter.charCodeAt() -a)
        let ki = (secretKey[j % secretKey.length].toLowerCase().charCodeAt() - a)
        let upperLetter = mod(pi + ki, 26)
        encrypted += String.fromCharCode(upperLetter + a)
        j++
      }else {
        encrypted += currentLetter
      }
    }
    setEncryptedText(encrypted)
  } 
  return (
    <div className="Container">
      <div className="row justify-content-md-center">
      <header className="col col-xs-12 col-md-6 m-5">
        <h1>Vigenere Cipher Encryption <i class="fa fa-lock" aria-hidden="true"></i></h1>
      </header>

      <main className="col col-xs-12 col-md-6 my-5">
                <div className="form-group">
                    <label htmlFor="message">Message: </label>
                    <textarea 
                        type="message" 
                        name="message" 
                        id="message" 
                        className="form-control"
                        value={message}
                        onChange={e=>setMessage(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="key">Key: </label>
                    <input 
                        type="text" 
                        name="key" 
                        id="key" 
                        className="form-control"
                        value={key}
                        onChange={e=>setKey(e.target.value)}/>
                </div>
                <div className="form-group">
                <label>{encryptedText.length > 0 ? 'Encrypted Message:' : ''}</label>
                    <h3 className='text-success'>{encryptedText.length > 0 ? <i class="fa fa-lock" aria-hidden="true"></i>: ''} {encryptedText}</h3>
                </div>
                <button
                    className='btn btn-primary'
                    type="submit"
                    onClick={() => encrypt(message,key)}>Encrypt</button>
           
      </main>
      </div>
     
    </div>
  );
}

export default App;
