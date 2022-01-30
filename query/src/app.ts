import server, { handleEvent } from './server';
import axios from 'axios';

const PORT = 4002;

server.listen(PORT, async () => {
  console.log(`Query service listen on ${PORT}`);

  try {
    const response = await axios.get("http://localhost:4005/events");
    for (let event of response.data) {
      console.log("Processing event:", event.type);
    
      handleEvent(event.type, event.data);
    }
  } catch (error: any) {
    console.log(error.message);
  }
})