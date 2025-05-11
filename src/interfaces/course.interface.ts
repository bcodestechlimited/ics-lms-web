/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LaunchCoursePayload {
  courseId: string;
}

export interface FilterProps {
  onFilterChange: (filters: {
    search: string;
    rating: number | "";
    topic: string;
  }) => void;
}

interface CourseUser {
  avatar: string;
  progress: any[];
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  extraPath: string;
  privilege: string;
  isAdmin: boolean;
  courses: any[];
  slug: string;
}

interface CourseInterface {
  _id: string;
  user: CourseUser;
  title: string;
  summary: string;
  description: string;
  image: string;
  benefits: any[];
  language: string;
  softwares: any[];
  progress: any[];
  module: any[];
  course_modules: any[];
  course_assessment: any[];
  coupon_codes: any[];
  resource: any[];
  rating: any[];
  status: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: Date;
  __v: number;
}

export interface ExpiredCoursesInterface {
  course: CourseInterface;
  expiresAt: Date;
  _id: string;
}



export interface CourseEnrollmentInterface {
  _id: string;
  title: string;
  image: string;
  summary: string;
  expiresAt: Date;
}

export type {CourseInterface, CourseUser};

export interface CourseAssessmentOption {
  id: number;
  text: string;
}

export interface CourseAssessment {
  _id: string;
  question: string;
  type: string;
  options: CourseAssessmentOption[];
  courseId: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface EnrolledCourse {
  _id: string;
  title: string;
  image: string;
  summary: string;
  course_assessment: CourseAssessment[];
}

export interface EnrolledCoursesResponse {
  success: boolean;
  message: string;
  responseObject: {
    data: EnrolledCourse[];
  };
  statusCode: number;
}