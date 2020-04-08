/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'home') {
    return '/'
  }

  if (doc.type === 'exercise') {
    return '/exercises/' + doc.uid
  }

  if (doc.type === 'article') {
    return '/articles/' + doc.uid
  }

  if (doc.type === 'about') {
    return '/about/'
  }

  return '/not-found'
}
