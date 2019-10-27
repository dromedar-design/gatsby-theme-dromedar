import React from 'react'

import Img from 'gatsby-image'
import { RichText } from 'prismic-reactjs'

const style = {
    objectFit: 'cover',
}

const Image = ({
    image,
    imageSharp,
    caption = [],
}) => {
    const title = '' // TODO: where does this come from?
    const alt = image.alt || RichText.asText(title || [])

    return <figure>

        {imageSharp
            ? <Img style={style} fluid={imageSharp.childImageSharp.fluid} alt={alt} />
            : <img style={style} src={image.url} alt={alt} />
        }

        {caption &&
            <figcaption>
                {RichText.asText(caption)}
            </figcaption>
        }

    </figure>
}

Image.propTypes = {
    // image: PropTypes.,
    // imageSharp: PropTypes.,
}

export default Image