import axios, { AxiosInstance } from "axios"
import { FileObject, UploadResponse } from "~/types/imagekit"

class ApiService {
  base: AxiosInstance
  constructor() {
    this.base = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_SUFIX}`,
    })
  }

  getFromImageKit(folder: string): Promise<FileObject[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get(`/imagekit/${folder}`)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  uploadToImageKit(file: File, folder: string): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append("file", file)

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.post(`imagekit/${folder}`, formData)

        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  updateImageKit(file: File, folder: string, oldFileId: string): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("oldFileId", oldFileId)

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.put(`imagekit/${folder}`, formData)

        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default new ApiService()
