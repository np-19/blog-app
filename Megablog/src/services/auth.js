import { Client, Account, ID } from "appwrite";
import constants from "../configs/constants.js";


class AuthService {
    client = new Client();
    account;
   
    constructor() {
        this.client
            .setEndpoint(constants.appwriteUrl)
            .setProject(constants.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        const userAccount = await this.account.create({userId: ID.unique(), email, password, name});
        if (userAccount) {
            return this.login({ email, password });
        }
        return null;
    }
    async login({email, password}) {
        return this.account.createEmailPasswordSession({ email, password });
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) return null;
            console.log("Appwrite Service Error :: getCurrentUser ", error );
            return null;
        }
    }
    async logout() {
        return this.account.deleteSessions();
    }
}

const authService = new AuthService();


export default authService;