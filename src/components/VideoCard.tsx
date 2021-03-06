import React, { ReactNode } from 'react'
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import { genVideoSlug } from '../utils'
import { Video } from '../utils/video'

const getEmbedSrc = (id: string, provider: Provider) => {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}`
  }
  if (provider === 'vimeo') {
    return `https://player.vimeo.com/video/${id}`
  }
}

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  media: {
    minHeight: 300,
    height: 'min(450px, min(800px, 100vw / 1.5))',
  },
})

interface Props extends Video {
  className?: string
}

const VideoCard = ({
  className,
  engagement,
  date,
  id,
  provider = 'youtube',
  title,
  url,
}: Props) => {
  const classes = useStyles()

  const ContentWrapper = ({
    children: wrapperChildren,
  }: {
    children: ReactNode
  }) => {
    if (url) {
      return (
        <CardActionArea component={Link} to={url} underline="none">
          {wrapperChildren}
        </CardActionArea>
      )
    }

    return <>{wrapperChildren}</>
  }

  return (
    <Card
      id={genVideoSlug(id)}
      variant="outlined"
      className={`${classes.root} ${className}`}
    >
      <CardMedia
        component="iframe"
        src={getEmbedSrc(id, provider)}
        title={title}
        className={classes.media}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <ContentWrapper>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            color="textPrimary"
            component="h3"
            noWrap
          >
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textPrimary"
            component="h4"
          >
            {engagement}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {date}
          </Typography>
        </CardContent>
      </ContentWrapper>
    </Card>
  )
}

export default VideoCard
