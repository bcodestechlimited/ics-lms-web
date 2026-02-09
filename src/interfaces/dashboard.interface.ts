export interface CertificateInterface {
  _id: string;
  student: string;
  course: {
    image: string;
  };
  studentName: string;
  courseTitle: string;
  certificateNumber: string;
  issuedAt: string;
  pdfUrl: string;
  cloudinaryPublicId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
