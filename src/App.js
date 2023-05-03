import "./App.css"
import Edit from "./Edit"
import Header from "./Header"
import Nav from "./Nav"
import Home from "./Home"
import Newpost from "./Newpost"
import Postpage from "./Postpage"
import About from "./About"
import Missing from "./Missing"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "./api"
const App = () => {
  const navigate = useNavigate()
  const loc = useLocation()
  const [search_result, setsearchresult] = useState([])
  const [search, setsearch] = useState("")
  const [posts, setpost] = useState([])
  const url = " http://localhost:3500/posts"
  useEffect(() => {
    const func = async () => {
      const res = await fetch(url)
      const response = await res.json()
      setpost(response)
    }
    func()
  }, [])
  useEffect(() => {
    let b = document.querySelector(".form")
    if (loc.pathname !== "/") {
      b.style.transform = "translateX(-120%)"
    } else {
      b.style.transform = "translateX(0)"
    }
  }, [loc])
  useEffect(() => {
    const result = posts.filter(
      (item) => item.title.includes(search) || item.art.includes(search)
    )
    result.reverse()
    setsearchresult(result)
  }, [posts, search])

  const submit = async (e) => {
    e.preventDefault()
    const dt = new Date()
    const month = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "june",
      "july",
      "aug",
      "sept",
      "oct",
      "nov",
      "dec",
    ]
    let newobj = {
      id: posts.length + 1,
      title: e.target[0].value,
      date: `${
        month[dt.getMonth() - 1]
      } ${dt.getDate()},${dt.getFullYear()},${dt.toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      art: e.target[1].value,
    }
    let obj = [...posts, newobj]
    setpost(obj)
    e.target[0].value = ""
    e.target[1].value = ""
    navigate("/")
    const method = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newobj),
    }
    await api(url, method)
  }
  return (
    <div className='App'>
      <Header />
      <Nav setsearch={setsearch} />
      <Routes>
        <Route
          path='/'
          element={<Home posts={search_result} />}
        />
        <Route
          path='/post'
          element={<Newpost submit={submit} />}
        />
        <Route
          path='/post/:id'
          element={
            <Postpage
              posts={posts}
              loc={navigate}
            />
          }
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/post/:id/edit'
          element={
            <Edit
              posts={posts}
              setpost={setpost}
              url={url}
              loc={navigate}
            />
          }
        />
        <Route
          path='*'
          element={<Missing />}
        />
      </Routes>
    </div>
  )
}

export default App
