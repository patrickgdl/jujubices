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
  getImageKitTemplate(): Promise<FileObject[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/imagekit/templates")
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default new ApiService()
