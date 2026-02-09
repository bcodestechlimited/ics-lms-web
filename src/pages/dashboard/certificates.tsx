import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllMyCertificates } from "@/hooks/use-user";
import { CertificateInterface } from "@/interfaces/dashboard.interface";
import DashboardLayout from "@/layouts/dashboard-layout";
import { format } from "date-fns";
import { Award, Download, ExternalLink } from "lucide-react";

const DashboardCertificate = () => {
  const { data, isLoading } = useGetAllMyCertificates();
  const certificates = data?.responseObject?.data || [];

  const handleDownload = (pdfUrl: string, certificateNumber: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${certificateNumber}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-2 col-end-12 py-16 space-y-8">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">My Certificates</h1>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              {certificates.length === 0 ? (
                <Card className="p-12">
                  <div className="text-center space-y-4">
                    <Award className="w-16 h-16 text-muted-foreground mx-auto" />
                    <p className="text-lg text-muted-foreground">
                      No certificates yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Complete a course to earn your first certificate!
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((certificate: CertificateInterface) => (
                    <Card
                      key={certificate._id}
                      className="hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                          src={certificate.course.image}
                          alt={certificate.courseTitle}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-3 left-4 right-4 z-20">
                          <span className="inline-block bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                            {certificate.certificateNumber}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">
                            {certificate.courseTitle}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Award className="w-4 h-4" />
                            <span>
                              Issued on{" "}
                              {format(
                                new Date(certificate.issuedAt),
                                "MMM dd, yyyy",
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleView(certificate.pdfUrl)}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              handleDownload(
                                certificate.pdfUrl,
                                certificate.certificateNumber,
                              )
                            }
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCertificate;
