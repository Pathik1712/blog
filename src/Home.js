import React from "react"
import Feed from "./Feed"
const Home = ({ posts }) => {
  return (
    <main className='home'>
      {posts.length ? (
        <Feed
          posts={posts}
          className='an'
        />
      ) : (
        <p>no post to display</p>
      )}
    </main>
  )
}

export default Home
