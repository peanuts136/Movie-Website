//imports the express framework
import express from "express"
//imports the reviewsCtrl object
import ReviewsCtrl from "./reviews.controller.js"
//creates router object used to organize routes
const router = express.Router()
//gets an http get request with a specific movie id, calls the apiGetReviews function to handle request
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)
//Should handle post requests
router.route("/new").post(ReviewsCtrl.apiPostReview)
//When a get/put/delete request is made to the route "/:id", calls the respective function
router.route("/:id")
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)
//allows the import of this router
export default router