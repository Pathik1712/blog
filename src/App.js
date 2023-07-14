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
import apit from "./apit"
const App = () => {
  const navigate = useNavigate()
  const loc = useLocation()
  const [search_result, setsearchresult] = useState([])
  const [search, setsearch] = useState("")
  const [posts, setpost] = useState([
    {
      id: 1,
      title: "first post",
      date: "jan 27,2022,11:37 am",
      art: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit provident officia aliquam rem cum debitis amet, perspiciatis cupiditate non. Veritatis libero eaque ab dolor deserunt earum quos a officia. Velit recusandae ex iusto eligendi, neque, id perferendis expedita debitis amet, aliquid libero ratione voluptatum exercitationem? Ipsam non voluptatum necessitatibus aspernatur. Suscipit quibusdam doloribus cumque voluptate inventore amet aspernatur perferendis voluptatibus consectetur. Quod ex debitis, enim nihil pariatur nostrum cumque ipsa dicta sint natus doloribus voluptates voluptas ad neque iusto totam incidunt iste ab perferendis atque non aliquam obcaecati dolorem molestias! Aliquam vero ullam nesciunt possimus consequuntur ipsum itaque voluptatem ipsam?",
    },
    {
      id: 2,
      title: "second post",
      date: "jan 27,2022,11:37 am",
      art: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit provident officia aliquam rem cum debitis amet, perspiciatis cupiditate non. Veritatis libero eaque ab dolor deserunt earum quos a officia. Velit recusandae ex iusto eligendi, neque, id perferendis expedita debitis amet, aliquid libero ratione voluptatum exercitationem? Ipsam non voluptatum necessitatibus aspernatur. Suscipit quibusdam doloribus cumque voluptate inventore amet aspernatur perferendis voluptatibus consectetur. Quod ex debitis, enim nihil pariatur nostrum cumque ipsa dicta sint natus doloribus voluptates voluptas ad neque iusto totam incidunt iste ab perferendis atque non aliquam obcaecati dolorem molestias! Aliquam vero ullam nesciunt possimus consequuntur ipsum itaque voluptatem ipsam?",
    },
    {
      id: 3,
      title: "third post",
      date: "jan 27,2022,11:37 am",
      art: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit provident officia aliquam rem cum debitis amet, perspiciatis cupiditate non. Veritatis libero eaque ab dolor deserunt earum quos a officia. Velit recusandae ex iusto eligendi, neque, id perferendis expedita debitis amet, aliquid libero ratione voluptatum exercitationem? Ipsam non voluptatum necessitatibus aspernatur. Suscipit quibusdam doloribus cumque voluptate inventore amet aspernatur perferendis voluptatibus consectetur. Quod ex debitis, enim nihil pariatur nostrum cumque ipsa dicta sint natus doloribus voluptates voluptas ad neque iusto totam incidunt iste ab perferendis atque non aliquam obcaecati dolorem molestias! Aliquam vero ullam nesciunt possimus consequuntur ipsum itaque voluptatem ipsam?",
    },
    {
      id: 4,
      title: "first blog",
      date: "mar 25,2023,04:01 pm",
      art: "hi welcome to this website.",
    },
  ])
  const url = " http://localhost:3500/posts"
  useEffect(() => {
    const func = async () => {
      const res = await fetch(url)
      const response = await res.json()
      let tempres = [...posts, response]
      setpost(tempres)
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
    await apit(url, method)
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
