import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSlugUrl } from '../Hooks/useSlugUrl'

export const ItemDetail = () => {
    const {slugUrl} = useSlugUrl()
    const [detail, setDetail] = useState([])
    useEffect(() => {
        axios.get(slugUrl).then((response) => {
            setDetail(response.data.item)
        })
    })
  return (
    <div>
        <h1>{detail.title}</h1>
    </div>
  )
}
