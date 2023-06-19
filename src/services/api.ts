import axios, { AxiosInstance } from "axios"
import { FileObject } from "~/types/imagekit"

class ApiService {
  base: AxiosInstance
  constructor() {
    this.base = axios.create({
      baseURL: "http://localhost:8080/api",
    })
  }

  // ImageKit Images
  getImageKitBackgrounds(): Promise<FileObject[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/imagekit/backgrounds")
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  getImageKitTemplates(): Promise<FileObject[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/imagekit/templates")
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  uploadImageKitTemplate(file: File): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.post("imagekit/templates", formData)

        // {
        //   onUploadProgress: (e) => {
        //     const progress = parseInt(Math.round((e.loaded * 100) / e.total))

        //     updateFile(file.id, {
        //       progress,
        //     })
        //   },
        // }

        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default new ApiService()
