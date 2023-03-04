import React, { memo } from 'react'

import { HomeWrapper } from './style'

const Home = memo(() => {
  return (
    <HomeWrapper>
      <h2>home首页</h2>
    </HomeWrapper>
  )
})

export default Home