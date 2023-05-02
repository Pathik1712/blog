import React, { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
const Postpage = ({ posts }) => {
  const { id } = useParams()
  const item = posts.find((item) => item.id === Number(id))
  const loc = useNavigate()
  return (
    <>
      {item && (
        <article className='m-post'>
          <h2>{item.title}</h2>
          <p className='m-date'>{item.date}</p>
          <p>{item.art}</p>
          <button
            className='btn'
            onClick={() => {
              loc(`/post/${id}/edit`)
            }}
            style={{
              padding: " 0.2rem 0",
              fontWeight: "600",
              marginTop: "1rem",
            }}
          >
            edit
          </button>
        </article>
      )}
    </>
  )
}

export default Postpage
