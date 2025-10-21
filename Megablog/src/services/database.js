import { Client, ID, TablesDB, Storage, Query } from "appwrite";
import constants from "../configs/constants.js";

class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(constants.appwriteUrl)
      .setProject(constants.appwriteProjectId);
    this.databases = new TablesDB(this.client);
  }

  async createPost(payload) {
    const { title, content, featuredImage, status, userId, slug } = payload;
    return this.databases.createRow({
      databaseId: constants.appwriteDatabaseId,
      tableId: constants.appwriteTableId,
      rowId: ID.unique(),
      data: {
        title,
        content,
        featuredImage,
        status,
        userId,
        slug,
      },
    });
  }

  async updatePost(postId, data) {
    const { title, content, featuredImage, status, slug } = data;
    return this.databases.updateRow({
      databaseId: constants.appwriteDatabaseId,
      tableId: constants.appwriteTableId,
      rowId: postId,
      data: {
        title,
        content,
        featuredImage,
        status,
        slug,
      },
    });
  }
  async deletePost(postId) {
    return this.databases.deleteRow({
      databaseId: constants.appwriteDatabaseId,
      tableId: constants.appwriteTableId,
      rowId: postId,
    });
  }
  async getPostsByUser(userId) {
    return this.databases.listRows({
      databaseId: constants.appwriteDatabaseId,
      tableId: constants.appwriteTableId,
      queries: [Query.equal("userId", userId)],
    });
  }

  async getPost(postId) {
    const result = await this.databases.listRows({
      databaseId: constants.appwriteDatabaseId,
      tableId: constants.appwriteTableId,
      queries: [Query.equal("$id", postId)],
    });
    // TablesDB returns { rows: [...] }
    return result?.rows && result.rows.length > 0 ? result.rows[0] : null;
  }
  async getAllPosts() {
    return this.databases.listRows({
      databaseId: constants.appwriteDatabaseId,
      tableId: constants.appwriteTableId,
      queries: [Query.equal("status", "active")],
    });
  }
}
const databaseService = new DatabaseService();

export default databaseService;
