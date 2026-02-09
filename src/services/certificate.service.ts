import apiClient from "@/lib/api-client";

class CertificateService {
  public async fetchAllMyCertificatesService() {
    const { data } = await apiClient("/certificates");

    return data;
  }
}

export const certificateService = new CertificateService();
export default CertificateService;
