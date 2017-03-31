import { fetchSFDA } from 'lib/utils'

// 获取注册证信息
export function getRegistrationCertificateInfo(params) {
  return fetchSFDA(`/RegistrationCertificate/${params.params.registractionCertificateNum}?productionDate=${params.params.timestamps}`, {
    method: 'GET'
  });
}
