const env = import.meta.env;

const constants = {
    appwriteUrl: String(env.VITE_APPWRITE_URL),
    appwriteProjectId: String(env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId: String(env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketId: String(env.VITE_APPWRITE_BUCKET_ID),
}


export default constants;
