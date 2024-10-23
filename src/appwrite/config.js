import conf from '../conf/conf.js';
import { Client, ID, DateBase, Storage, Query } from 'appwrite';

export class Service{

    client = new Client();
    datebases;
    storages;
    bucket;

    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.datebases = new DateBase(this.client);
            // this.storages = new Storage(this.client);
            this.bucket = new Storage(this.client);
    }


    async createPost({title, slug, content, featuredImage, status, userId}){


        try {

            return await this.datebases.createDocument(conf.appwriteDatebaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId,
                
            })
            } 
        

        catch(error) {

           console.log("Appwrite service :: createPost :: error", error);
        }
    }


    async updatePost(slug, {title, content, featuredImage, status, userId}){

        try{

            return await this.datebases.updateDocument(conf.appwriteDatebaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
            })
        }
        catch(error) {

            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {

        try{

            await this.datebases.delecteDocument(conf.appwriteDatebaseId, conf.appwriteCollectionId, slug);
                 
          return true;
        }
        catch (error) {

            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {

        try{

            return await this.datebases.getDocument(conf.appwriteDatebaseId, conf.appwriteCollectionId, slug)

        }
        catch(error) {

            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {

        try{

            return await this.datebases.listDocuments(conf.appwriteDatebaseId, conf.appwriteCollectionId, queries,)

            
        }
        catch(error) {

            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file) {

        try{

            return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
            )
        }
        catch(error) {

            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {

        try{

            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        }
        catch(error) {

            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {

        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;