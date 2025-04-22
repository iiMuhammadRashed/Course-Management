import asyncHandler from '../../utils/asyncHandler.js';
import deleteFile from '../../utils/deleteFile.js';
import Course from '../../models/course.model.js';
import ApiFeatures from '../../services/apiFeatures.js';
import AppError from '../../utils/appError.js';
import processImage from '../../utils/processImage.js';
import path from 'path';

export const createCourse = asyncHandler(async (req, res, next) => {
  const courseData = { ...req.body };

  if (req.file) {
    const filename = await processImage(req.file, {
      width: 1000,
      format: 'webp',
      quality: 80,
    });
    courseData.image = `courses/${filename}`;
  }

  const course = await Course.create(courseData);

  res.status(201).json({
    success: true,
    data: course,
  });
});

export const getCourses = asyncHandler(async (req, res, next) => {
  const features = new ApiFeatures(Course.find(), req.query)
    .filter()
    .sort(req.query.sort)
    .limitFields(req.query.fields)
    .paginate(req.query.page, req.query.limit);

  const [docs, total] = await Promise.all([
    features.query,
    Course.countDocuments(features.queryString),
  ]);

  res.status(200).json({
    success: true,
    data: docs,
    pagination: {
      total,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      totalPages: Math.ceil(total / (req.query.limit || 10)),
      hasNextPage:
        (req.query.page || 1) < Math.ceil(total / (req.query.limit || 10)),
      hasPrevPage: (req.query.page || 1) > 1,
    },
  });
});

export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

export const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  const updateData = { ...req.body };

  if (req.file) {
    if (course.image) {
      const filePath = path.join(process.cwd(), 'uploads', course.image);
      await deleteFile(filePath);
    }
    const filename = await processImage(req.file, {
      width: 1000,
      format: 'webp',
      quality: 80,
    });
    updateData.image = `courses/${filename}`;
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    data: updatedCourse,
  });
});

export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  if (course.image) {
    const filePath = path.join(process.cwd(), 'uploads', course.image);
    await deleteFile(filePath);
  }

  await Course.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
  });
});
