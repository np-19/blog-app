import { Client, ID, Storage} from "appwrite";
import constants from "../configs/constants.js";

class BucketService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(constants.appwriteUrl)
      .setProject(constants.appwriteProjectId);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    return this.bucket.createFile({
      bucketId: constants.appwriteBucketId,
      fileId: ID.unique(),
      file: file,
    });
  }

  async deleteFile(fileId) {
    await this.bucket.deleteFile({
      bucketId: constants.appwriteBucketId,
      fileId: fileId,
    });
    return true;
  }

  async getFilePreview(fileId) {
    // Returns a URL for previewing the file; callers can use directly in <img src="..." />
    return await this.bucket.getFileView({
      bucketId: constants.appwriteBucketId,
      fileId: fileId,
    });
  }
}

const bucketService = new BucketService();

export default bucketService;
