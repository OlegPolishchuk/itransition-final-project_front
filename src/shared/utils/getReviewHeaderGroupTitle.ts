export const getReviewHeaderGroupTitle = (group: string) => {

  switch (group) {
    case 'books':
      return 'app.review-header.group-books.title'

    case 'games':
      return 'app.review-header.group-games.title'

    case 'movies':
      return 'app.review-header.group-movies.title'

    case 'music':
      return 'app.review-header.group-music.title'
  }

}