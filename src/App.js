import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [newTaskIds, setnewTaskIds] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [resultImage, setResultImage] = useState('');



  const fetchResultImage = async (newTaskId) => {
    try {
      const endpoint = 'https://api.midjourneyapi.xyz/mj/v2/fetch';
      const data = {
        task_id: newTaskId,
      };
      const response = await axios.post(endpoint, data);
      setResultImage(response.data.task_result.image_url);

      console.log("fetch:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const X_API_KEY = "e98cf0fb44af48f3e1b0de6e99441a352a25b71ac07f68fc2c46b84919423c80"; 
      const endpoint = 'https://api.midjourneyapi.xyz/mj/v2/imagine';
      const options = {
        headers: {
          "X-API-KEY": X_API_KEY,
        },
        data: {
          "prompt": prompt,
          "aspect_ratio": "4:3",
          "process_mode": "mixed",
          "webhook_endpoint": "",
          "webhook_secret": ""
        },
        url: endpoint,
        method: 'post'
      };

      const response = await axios(options);
      console.log("Prompt API Response:", response.data);

      const newTaskId = response.data.task_id;
      console.log("taskidnewTaskId:", newTaskId);

      // Fetch task IDs after submitting the prompt
      
    } catch (error) {
      console.error("Prompt API Error:", error);
    }
  };

  useEffect(() => {
    // Fetch task IDs initially
    
    fetchResultImage();
    // Fetch results every 30 seconds
    const interval = setInterval(() => {
        fetchResultImage();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <h1>Drawing App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Prompt:
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h2>Historical Task IDs:</h2>
      <ul>
        {newTaskIds.map((newTaskId) => (
          <li key={newTaskId}>
            <button onClick={() => fetchResultImage(newTaskId)}>Fetch Result</button> - {newTaskId}
          </li>
        ))}
      </ul>
      {resultImage && (
        <div>
          <h2>Result Image:</h2>
          <img src={resultImage} alt="Result" />
        </div>
      )}
    </div>
  );
};

export default App;
