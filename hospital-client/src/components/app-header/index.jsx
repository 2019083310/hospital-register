import React, { memo } from 'react'
import { AppHeaderWrapper } from './style'

const AppHeader = memo(() => {
  return (
    <AppHeaderWrapper>
      <h2>头部</h2>
    </AppHeaderWrapper>
  )
})

export default AppHeader