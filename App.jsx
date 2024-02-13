
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [boldWords, setBoldWords] = useState([]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post('http://localhost:5000/upload', { image });
      console.log(response.data);

      // Extracting data from the response for display
      setTextContent(response.data.text_content);
      setBoldWords(response.data.bold_words);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {image && <img src={image} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />}
      <div>
        <h2>Extracted Text Content:</h2>
        <p>{textContent}</p>
      </div>
      <div>
        <h2>Bold Words:</h2>
        <ul>
          {boldWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
