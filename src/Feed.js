import React from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
const Feed = ({ posts }) => {
  useEffect(() => {
    const a = document.getElementsByClassName("post")
    let delay = 0.05
    for (let i = 0; i < a.length; i++) {
      a[i].style.animation = `load 0.2s ease-in ${delay}s forwards`
      delay += delay
    }
  }, [])
  return (
    <>
      {posts.map((item, num) => (
        <article
          className='post'
          key={num}
        >
          <Link
            to={`/post/${item.id}`}
            onClick={() => {}}
          >
            <h2 className='title'>{item.title}</h2>
            <p className='date'>{item.date}</p>
          </Link>
          <p className='art'>
            {item.art.length <= 45 ? item.art : `${item.art.slice(0, 45)}...`}
          </p>
        </article>
      ))}
    </>
  )
}

export default Feed
