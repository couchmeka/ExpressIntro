// Bring in Express code
const express = require('express')

const app = express()
const port = 3000

app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

const favoriteMovieList = [{
  title: "Star Wars",
  starRating: 5,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
}, {
  title: "The Avengers",
  starRating: 4,
  isRecommended: true,
  createdAt: new Date(),
  lastModified: new Date()
}];

app.get('/', (req, res) => {
  res.send('Hello World!')

})


app.get('/all-movies', (req, res) => {
    

const favoriteMovies = favoriteMovieList.map((movie) =>{

      return movie
  })
    
    res.json({

        success: true,
        allMovies: favoriteMovies
    })
  
  })


  app.get('/single-movie/:titleToFind', (req, res) => {
    
    const titleToFind = req.params.titleToFind

    
      const movieSingle = favoriteMovieList.find((movie)=>{
    
           return movie.title === titleToFind
      })
       
        res.json({
    
            success: true,
            singlemovie: movieSingle
            
        })
      
      })


      app.post('/new-movie', (req, res)=>{

        if (req.body.title === undefined || typeof(req.body.title) !== "string") {
          res.json({
            success: false,
            message: "a movie name is required and must be a string"
          })
          return
        }
        if (req.body.starRating === undefined || typeof(req.body.starRating) !== 'number' || req.body.starRating >=6 ){
          res.json({
            success: false,
            message: "star rating must be a valid integer and must be a number 1 --> 5"
          })
          return
        }
        if (req.body.isRecommended === undefined || typeof (req.body.isRecommended) !== 'boolean' ){
            res.json({
              success: false,
              message: "Recommended must be of type boolean"
            })
            return
          }
        
    
      
        const newMovie = {}
        newMovie.title = req.body.title
        newMovie.starRating = req.body.starRating
        newMovie.isRecommended = req.body.isRecommended
        newMovie.createdAt = new Date
        newMovie.lastModified = new Date
      
        favoriteMovieList.push(newMovie)
        console.log(favoriteMovieList)
      
        res.json({
          success: true
        })
      })



      app.put('/update-movie/:titleToUpdate', (req, res)=>{

        const movietoFind = req.params.titleToUpdate
        
        const originalMovie = favoriteMovieList.find((movie)=>{
          return movie.title === movietoFind
        })

        const movieIndex = favoriteMovieList.findIndex((movie)=>{
          return movie.title === movietoFind
        })
      
        if (!originalMovie) {
          res.json({
            success: false,
            message: "Could not find movie"
          })
          return
        }
      
        const updatedMovie = {}

        if (req.body.title !== undefined){
            updatedMovie.title = req.body.title
          } else {
            updatedMovie.title = originalMovie.title
          }
        
          if (req.body.starRating !== undefined){
            updatedMovie.starRating = req.body.starRating
          } else {
            updatedMovie.starRating = originalMovie.starRating
          }
        
          if (req.body.isRecommended !== undefined){
            updatedMovie.isRecommended = req.body.isRecommended
          } else {
            updatedMovie.isRecommended = originalMovie.isRecommended
          }
      
          updatedMovie.createdAt = new Date
          updatedMovie.lastModified = new Date
      
        favoriteMovieList[movieIndex] = updatedMovie
        console.log(favoriteMovieList)
        res.json({
          success: true
        })
      })
      
      
      app.delete('/delete-movie/:titleToDelete', (req,res) => {
      
        const movieToDelete = req.params.titleToDelete
      
      const indexOFMovie = favoriteMovieList.findIndex((movie)=>{
      
      return movie.title === movieToDelete
      
      })

      favoriteMovieList.splice(indexOFMovie, 1)
      
      console.log(favoriteMovieList)

      res.json({
        success: true
      })
      })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})