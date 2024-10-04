import { useState } from 'react'

import Section from '../Section'
import { GalleryItem } from '../../pages/Home'

import { Item, Items, Action, Modal, ModalContent } from './styles'

import image_6 from '../../assets/images/image_6.png'
import hogwarts from '../../assets/images/hogwarts.png'

import play from '../../assets/images/play.png'
import zoom from '../../assets/images/zoom.png'
import fechar from '../../assets/images/fechar.png'

const mock: GalleryItem[] = [
  {
    type: 'image',
    url: image_6
  },
  {
    type: 'image',
    url: image_6
  },
  {
    type: 'image',
    url: image_6
  },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/yF29baX-IsA?si=UveVH8ZMZA0ptBYJ'
  }
]

type Props = {
  defaultCover: string
  name: string
}

const Gallery = ({ defaultCover, name }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalUrl, setModalUrl] = useState('')

  const getMediaCover = (item: GalleryItem) => {
    return item.type === 'image' ? item.url : defaultCover
  }

  const handleClick = (index: number) => {
    setModalUrl(index === 2 ? hogwarts : mock[index].url)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    if (modalUrl.startsWith('https://www.youtube.com')) {
      const iframe = document.getElementById(
        'video-iframe'
      ) as HTMLIFrameElement
      iframe?.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      )
    }
    setIsModalOpen(false)
    setModalUrl('')
  }

  return (
    <>
      <Section title="Galeria" background="black">
        <Items>
          {mock.map((media, index) => (
            <Item key={media.url} onClick={() => handleClick(index)}>
              <img
                src={getMediaCover(media)}
                alt={`Mídia ${index + 1} de ${name}`}
              />
              <Action>
                <img
                  src={media.type === 'video' ? play : zoom}
                  alt={`Clique para ${
                    media.type === 'image'
                      ? 'maximizar a imagem'
                      : 'assistir o vídeo'
                  }`}
                />
              </Action>
            </Item>
          ))}
        </Items>
      </Section>
      <Modal className={isModalOpen ? 'visivel' : ''}>
        <ModalContent className="container">
          <header>
            <h4>Hogwarts Legacy</h4>
            <img src={fechar} alt="Ícone de fechar" onClick={handleClose} />
          </header>
          {modalUrl.startsWith('https://www.youtube.com') ? (
            <iframe
              id="video-iframe"
              width="100%"
              height="400"
              src={modalUrl}
              title="Vídeo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img src={modalUrl} alt={`Exibição de mídia`} />
          )}
        </ModalContent>
        <div className="overlay"></div>
      </Modal>
    </>
  )
}

export default Gallery
