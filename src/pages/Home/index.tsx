import { useEffect, useState } from 'react'

import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductList'

import fifa from '../../assets/images/fifa.png'
import streetfighter from '../../assets/images/street_fighter.png'
import resident from '../../assets/images/resident.png'
import diablo from '../../assets/images/diablo.png'
import zelda from '../../assets/images/zelda.png'
import starWars from '../../assets/images/star_wars.png'

export interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

export type Game = {
  title: string
  id: number
  name: string
  description: string
  release_date?: string
  price: {
    discount?: number
    old?: number
    current?: number
  }
  details: {
    infos: string[]
    category: string
    system: string
    developer: string
    publisher: string
    language: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  }
}

const Home = () => {
  const [promocoes, setPromocoes] = useState<Game[]>([])
  const [emBreve, setEmBreve] = useState<Game[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/eplay/promocoes')
      .then((res) => res.json())
      .then((res) => setPromocoes(res))
  }, [])

  return (
    <>
      <Banner />
      <ProductsList games={promocoes} title="Promoções" background="gray" />
      <ProductsList games={emBreve} title="Em breve" background="black" />
    </>
  )
}

export default Home
