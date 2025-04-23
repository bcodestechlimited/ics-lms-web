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

/**
 * {
  "course": {
    "_id": "67cee1842f8c56d684bc5469",
    "title": "Microservices with Node JS and React",
    "image": "https://res.cloudinary.com/di1erfrrf/image/upload/v1741611396/LMS/5bb429ccb44f0859ae91eb3bb7330c84_gsivuw.jpg"
  },
  "expiresAt": "2999-12-31T00:00:00.000Z",
  "_id": "67f6a6e279c08915bc49decd"
}
 */

export interface CourseEnrollmentInterface {
  _id: string;
  title: string;
  image: string;
  summary: string;
  expiresAt: Date;
}

export type {CourseInterface, CourseUser};
