import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post("/", isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.get("/", getAllCourses);
courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);
courseRouter.put("/add-reply",isAuthenticated,authorizeRoles("admin"),addReplyToReview)
courseRouter.put("/:id/add-review", isAuthenticated, addReview);
courseRouter.get("/admin",isAuthenticated,authorizeRoles("admin"),getAllCoursesAdmin);
courseRouter.delete('/:id',isAuthenticated,authorizeRoles("admin"),deleteCourse)
courseRouter.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
courseRouter.get("/:id", getSingleCourse);

courseRouter.get("/course-content/:id", isAuthenticated, getCourseByUser);

export default courseRouter;
