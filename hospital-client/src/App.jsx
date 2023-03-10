import React, { memo } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './router'

import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import { AppWrapper } from './style'

const App = memo(() => {
  return (
    <AppWrapper>
      <AppHeader></AppHeader>
      {useRoutes(routes)}
      <AppFooter></AppFooter>
    </AppWrapper>
  )
})

export default App