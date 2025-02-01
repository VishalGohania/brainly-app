import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useContent = () => {
  const [contents, setContents] = useState([]);

  async function refresh(){
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      console.log("API Response:", response.data); // Log the response
      setContents(response.data.content);
    } catch (error) {
      console.error("Error fetching content", error);
    }  
  
  }

  useEffect(() => {
    refresh()
    let interval = setInterval(() => {
      refresh()
    }, 10 * 1000)

    return () => {
      clearInterval(interval)
    }
  },[])

  return {contents, refresh}
}

