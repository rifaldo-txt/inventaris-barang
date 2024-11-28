import { useState } from 'react'
import Routes from './routes'
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes/>
    </QueryClientProvider>
  )
}

export default App
