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

  getFilePreview(fileId) {
    // Returns a URL string for viewing the file
    // Using getFileView instead of getFilePreview to avoid transformation limits on free plan
    const url = this.bucket.getFileView(
      constants.appwriteBucketId,
      fileId
    );
    return url.toString();
  }
}

const bucketService = new BucketService();

export default bucketService;
