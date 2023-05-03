import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "./api"

const Edit = ({ url, posts, setpost, loc }) => {
  const { id } = useParams()
  let item = posts.find((i) => i.id.toString() === id)
  const [e, sete] = useState("")
  const [a, seta] = useState("")
  useEffect(() => {
    if (item) {
      sete(item.title)
      seta(item.art)
    }
  }, [item])
  const submitedit = async (i) => {
    i.preventDefault()
    const requrl = url + `/${id}`
    const method = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ art: a, title: e }),
    }
    const res = await api(requrl, method)
    let temp = posts.filter((it) => it.id !== item.id)
    setpost([
      ...temp,
      {
        id: item.id,
        date: item.date,
        title: e,
        art: a,
      },
    ])
    loc(-1)
  }
  return (
    <>
      {a && (
        <main className='newpost'>
          <h1>Edit:</h1>
          <form
            onSubmit={(e) => submitedit(e)}
            className='postform'
          >
            <div className='wrap'>
              <input
                contentEditable
                required
                className='inp'
                type='text'
                value={e}
                placeholder=' '
                id='e_1'
                onChange={(i) => {
                  sete(i.target.value)
                }}
              />
              <label
                htmlFor='e_1'
                className='lbl'
              >
                Edit Title
              </label>
            </div>
            <div className='wrap'>
              <textarea
                onChange={(e) => {
                  seta(e.target.value)
                }}
                className='inp'
                required
                value={a}
                placeholder=' '
                id='e_2'
                cols='20'
                rows='8'
              ></textarea>
              <label
                htmlFor='e_2'
                className='lbl'
              >
                Edit Blog
              </label>
            </div>
            <button
              className='btn'
              type='submit'
              style={{ fontWeight: "600" }}
            >
              Edit
            </button>
          </form>
        </main>
      )}
      {item === undefined && (
        <>
          <h3>can't edit server problem</h3>
          <p
            style={{
              color: "GrayText",
              textDecoration: "underline",
              textDecorationColor: "GrayText",
            }}
            onClick={loc("/")}
          >
            go back to post
          </p>
        </>
      )}
    </>
  )
}

export default Edit
