import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/store'

export type StoreProviderOptions = {
  children: React.ReactNode
}

export const StoreProvider = ({ children }: StoreProviderOptions) => {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}