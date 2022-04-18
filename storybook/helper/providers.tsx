import React from 'react'
import { CryptoProvider } from '../hooks/crypto'
import { DataProvider } from '../hooks/data'
import { StorageProvider } from '../hooks/storage'

export const PwaProviders: React.FC = ({ children }) => (
  <StorageProvider>
    <CryptoProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </CryptoProvider>
  </StorageProvider>
)
