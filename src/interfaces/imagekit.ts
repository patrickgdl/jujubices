/**
 * Type of returned item. It can be either file or folder.
 */
export declare type Item = "file" | "folder"

/**
 * Type of files to include in result set. Accepts three values:
 * all - include all types of files in result set
 * image - only search in image type files
 * non-image - only search in files which are not image, e.g., JS or CSS or video files.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api/list-and-search-files}
 */
export declare type FileType = "all" | "image" | "non-image"

/**
 *
 * File object.
 *
 * @see {@link https://docs.imagekit.io/api-reference/media-api#file-object-structure}
 */
export interface FileObject {
  /**
   * The unique fileId of the uploaded file.
   */
  fileId: string
  /**
   * Type of item. It can be either file or folder.
   */
  type: Item
  /**
   * Name of the file or folder.
   */
  name: string
  /**
   * The relative path of the file. In case of image, you can use this
   * path to construct different transformations.
   */
  filePath: string
  /**
   * Array of tags associated with the image. If no tags are set, it will be null.
   */
  tags?: string[] | null
  /**
   * Is the file marked as private. It can be either true or false.
   */
  isPrivateFile: boolean
  /**
   * Value of custom coordinates associated with the image in format x,y,width,height.
   * If customCoordinates are not defined then it is null.
   */
  customCoordinates: string | null
  /**
   * A publicly accessible URL of the file.
   */
  url: string
  /**
   * In case of an image, a small thumbnail URL.
   */
  thumbnail: string
  /**
   * The type of file, it could be either image or non-image.
   */
  fileType: FileType
  AITags?: object[]
  extensionStatus?: {
    [key: string]: string
  }
  embeddedMetadata?: object | null
  customMetadata?: object
  size: number
  createdAt: string
  updatedAt: string
  height: number
  width: number
  hasAlpha: boolean
  mime?: string
  /**
   * An object containing the file or file version's id (versionId) and name.
   */
  versionInfo?: object
}