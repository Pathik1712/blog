import React from "react"

const Newpost = ({ submit }) => {
  return (
    <main className='newpost'>
      <h1>New Post:</h1>
      <form
        onSubmit={submit}
        className='postform'
      >
        <div className='wrap'>
          <input
            required
            className='inp'
            type='text'
            placeholder=' '
            id='1'
          />
          <label
            htmlFor='1'
            className='lbl'
          >
            Title
          </label>
        </div>
        <div className='wrap'>
          <textarea
            className='inp'
            required
            placeholder=' '
            id='2'
            cols='20'
            rows='8'
          ></textarea>
          <label
            htmlFor='2'
            className='lbl'
          >
            Post Blog
          </label>
        </div>
        <button
          className='btn'
          type='submit'
        >
          post
        </button>
      </form>
    </main>
  )
}

export default Newpost
