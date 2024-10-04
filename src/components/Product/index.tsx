import Tag from '../Tag'

import { Card, Descricao, Titulo, Infos } from './styles'

type Props = {
  id: number
  title: string
  category: string
  system: string
  description: string
  infos: string[]
  image: string
}

const Product = ({
  id,
  title,
  category,
  system,
  description,
  infos,
  image
}: Props) => (
  <Card to={`/product/${id}`}>
    <img src={image} alt={title} />
    <Infos>
      {infos.map((info) => (
        <Tag key={info}>{info}</Tag>
      ))}
    </Infos>
    <Titulo>{title}</Titulo>
    <Tag>{category}</Tag>
    <Tag>{system}</Tag>
    <Descricao>{description}</Descricao>
  </Card>
)

export default Product
