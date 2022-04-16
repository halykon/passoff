import Fuse from 'fuse.js'
import { useCallback, useMemo, useState } from 'react'
import { createMetaStore } from './meta'

export interface IData {
  id: string
  name: string
  username: string
  password: string
}

// replace with db store later
const testData = [
  {
    id: '1',
    name: 'Google',
    username: 'johann@objekt.stream',
    password: 'supersecret42',
  },
  {
    id: '2',
    name: 'Facebook',
    username: 'johann@objekt.stream',
    password: 'supersecret42',
  },
  {
    id: '3',
    name: 'Twitter',
    username: 'undefined_prop',
    password: 'supersecret42',
  },
  {
    id: '4',
    name: 'Instagram',
    username: 'johann@objekt.stream',
    password: 'supersecret42',
  },
]

const [DataProvider, useData] = createMetaStore(() => {
  const [data, setData] = useState<IData[]>(testData)
  const fuse = useMemo(() => new Fuse(data, { keys: ['name', 'username'] }), [data])

  const setDataById = useCallback((id: string, data: Partial<IData>) => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, ...data } : item)))
  }, [])

  const delDataById = useCallback((id: string) => {
    setData(prev => prev.filter(item => item.id !== id))
  }, [])

  const genId = useCallback((): string => {
    const id = Math.random().toString(36).slice(2)
    if (data.find(item => item.id === id)) {
      return genId()
    }
    return id
  }, [data])

  const addData = useCallback((data: Omit<IData, 'id'>) => {
    setData(prev => [...prev, { ...data, id: genId() }])
  }, [genId])

  const searchData = useCallback((query: string) => {
    return fuse.search(query).map(i => i.item)
  }, [fuse])

  return {
    data,
    setData,
    setDataById,
    delDataById,
    addData,
    searchData,
  }
})

export {
  DataProvider,
  useData,
}
