import {useGetAllMyCertificates} from "@/hooks/use-user";
import DashboardLayout from "@/layouts/dashboard-layout";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {format} from "date-fns";
import {Link} from "react-router";
import {CertificateInterface} from "@/interfaces/dashboard.interface";

const DashboardCertificate = () => {
  const {data, isLoading} = useGetAllMyCertificates();

  const certificates = data?.responseObject?.data || [];
  // const meta = data?.responseObject?.meta;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-2 col-end-12 py-16 space-y-16">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">All My Certificates</h1>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-64 rounded-xl" />
                ))}
              </div>
            ) : (
              <>
                {certificates.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No certificates found
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((certificate: CertificateInterface) => (
                      <Card
                        key={certificate._id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col h-full">
                          <img
                            src={certificate.course_image}
                            alt={certificate.course_title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-semibold mb-2">
                              {certificate.course_title}
                            </h3>
                            <div className="mt-auto space-y-2">
                              <p className="text-sm text-muted-foreground">
                                Issued:{" "}
                                {format(
                                  new Date(certificate.issuedAt),
                                  "MMM dd, yyyy"
                                )}
                              </p>
                              <Button asChild className="w-full">
                                <Link to={`/certificates/${certificate._id}`}>
                                  View Certificate
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Pagination can be added here using meta data */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCertificate;
