import { useState, useEffect } from 'react'
import './App.css'
import EmojiData from './EmojiData'

function App() {
  const [allEmoji, setallEmoji] = useState([])


  useEffect(() => {

    async function fetchData() {
      try {
        const res = await fetch("https://emoji-api.com/emojis?access_key=80789f1e1f918524c01804aa2b5916cabc7101e3")
        if (!res.ok) throw new Error("Could Not Fetch Data")
        const json = await res.json()

        setallEmoji(json)

      } catch (error) {
        console.error("error occured", error.message)
      }
    } fetchData()
  }, [])

  return (
    <>
      <EmojiData data={allEmoji}
      />
    </>
  )
}

export default App
