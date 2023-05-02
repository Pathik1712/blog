import React, { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"

const Nav = ({ setsearch }) => {
  const inp = useRef(0)
  let l = document.getElementsByClassName("rev")
  const evn = (e) => {
    for (let i = 0; i < l.length; i++) {
      l[i].classList.remove("active")
    }
    l[e - 1].classList.add("active")
  }
  const temp = (n) => {
    for (let i = 0; i < l.length; i++) {
      l[i].classList.remove("active")
    }
    l[n].classList.add("active")
  }
  const loc = useLocation()
  try {
    if (loc.pathname === "/") {
      temp(0)
    } else if (loc.pathname === "/post") {
      temp(1)
    } else if (loc.pathname === "/about") {
      temp(2)
    } else {
      for (let i = 0; i < l.length; i++) {
        l[i].classList.remove("active")
      }
    }
  } catch (e) {}
  return (
    <nav className='nav'>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <label htmlFor='search'></label>
        <input
          type='text'
          placeholder='Enter'
          onChange={(e) => {
            setsearch(e.target.value)
          }}
        />
      </form>
      <ul>
        <li>
          <Link
            to='/'
            className='rev active'
            onClick={() => evn(1)}
          >
            <span></span>
            Home
          </Link>
        </li>
        <li>
          <Link
            to='/post'
            className='rev'
            onClick={() => evn(2)}
          >
            <span></span>
            Post
          </Link>
        </li>
        <li>
          <Link
            to='/about'
            className='rev'
            onClick={() => evn(3)}
          >
            <span></span>
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Nav
