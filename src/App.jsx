import "./App.css"
import Body from "./components/Body"
import { validateEnvironmentVariables } from "./utils/apiKeyValidator"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    try {
      validateEnvironmentVariables()
    } catch (error) {
      console.error("Environment Configuration Error:", error)
      // Optionally, you could show a user-friendly error modal here
    }
  }, [])

  return (
    <>
      <Body/>
    </>
  )
}

export default App
