import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
  //This method handles POST requests to create a new review. It extracts the movie ID, review content, and user information from the request body, then calls the addReview method of the ReviewsDAO to insert the new review into the database. If successful, it responds with a JSON object containing a success status. If an error occurs, it responds with a 500 status code and the error message.
  static async apiPostReview(req, res, next) {
    try{
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      res.json({ status: "success" })
    }catch(e){
      res.status(500).json({ error: e.message })
    }
  }
  //This method handles GET requests to retrieve a specific review by its ID. It extracts the review ID from the request parameters and calls the getReview method of the ReviewsDAO to fetch the review from the database. If the review is not found, it responds with a 404 status code and an error message. Otherwise, it responds with the retrieved review.
  static async apiGetReview(req, res, next){
    try{
      let id = req.params.id || {}
      let review = await ReviewsDAO.getReview(id)
      if (!review) {
        res.status(404).json({ error: "not found" })
        return
      }
      res.json(review)
    }
    catch (e){
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
  //This method handles PUT requests to update an existing review. It extracts the review ID, updated review content, and user information from the request body, then calls the updateReview method of the ReviewsDAO to update the review in the database. If the update operation fails or if the review is not found, it responds with an appropriate error message. Other it responds with a JSON object containing a success status.
  static async apiUpdateReview(req, res, next){
    try{
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )
      var {error} = reviewResponse
      if (error){
        res.status(400).json({error})
      }
      if (reviewResponse.modifiedCount === 0){
        throw new Error(
          "unable to update review"
        )
      }
      res.json({ status: "success" })
    } catch(e){
      res.status(500).json({ error: e.message })
    }
  }
  //This method handles DELETE requests to delete an existing review. It extracts the review ID from the request parameters and calls the deleteReview method of the ReviewsDAO to delete the review from the database. If successful, it responds with a JSON object containing a success status. If an error occurs, it responds with a 500 status code and the error message.
  static async apiDeleteReview(req, res, next){
    try{
      const reviewId = req.params.id
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({ status: "success" })
    } catch (e){
      res.status(500).json({ error: e.message })
    }
  }
  //This method handles GET requests to retrieve all reviews associated with a specific movie ID. It extracts the movie ID from the request parameters and calls the getReviewsByMovieId method of the ReviewsDAO to fetch the reviews from the database. If no reviews are found, it responds with a 404 status code and an error message. Otherwise, it responds with the retrieved reviews.
  static async apiGetReviews(req, res, next){
    try{
      let id = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByMovieId(id)
      if(!reviews){
        res.status(404).json({ error: "not found" })
        return
      }
      res.json(reviews)
    } catch(e){
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}
