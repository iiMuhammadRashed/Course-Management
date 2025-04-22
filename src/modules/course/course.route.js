import { Router } from 'express';
import * as courseController from './course.controller.js';
import { uploadSingle } from '../../middleware/file.js';
import { validateRequest } from '../../middleware/validation.js';
import * as courseValidation from './course.validation.js';

const courseRoutes = Router();

courseRoutes
  .route('/')
  .post(
    uploadSingle('image', 'courses'),
    validateRequest(courseValidation.createCourseSchema),
    courseController.createCourse,
  )
  .get(
    validateRequest(courseValidation.getCoursesSchema, 'query'),
    courseController.getCourses,
  );

courseRoutes
  .route('/:id')
  .get(
    validateRequest(courseValidation.getCourseParamsSchema, 'params'),
    courseController.getCourse,
  )
  .put(
    uploadSingle('image', 'courses'),
    validateRequest(courseValidation.updateCourseSchema),
    validateRequest(courseValidation.getCourseParamsSchema, 'params'),
    courseController.updateCourse,
  )
  .delete(
    validateRequest(courseValidation.deleteCourseSchema, 'params'),
    courseController.deleteCourse,
  );

export default courseRoutes;
