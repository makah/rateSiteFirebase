import { Injectable } from '@angular/core';
import { UploadFile } from '../models/upload-file';

import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';

@Injectable()
export class ImageService {

    private logoBasePath = 'logos';
    private photoBasePath = 'photos';
    private menuPath = 'menus';
    
    constructor(private db: AngularFireDatabase) { }
    
    //storageRef.getDownloadURL().then(url => this.image = url);
    
    uploadLogo(storeID: string, upload: UploadFile) {
        let storageRef = firebase.storage().ref().child(`${this.logoBasePath}/${storeID}`);
        let uploadTask = storageRef.put(upload.file);
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) =>  {
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
            },
            () => {
                upload.url = uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.db.object(`stores/${storeID}`).update({logo: upload});
            }
        );
    }
    
    uploadMenu(storeID: string, upload: UploadFile) {
        let storageRef = firebase.storage().ref().child(`${this.menuPath}/${storeID}`);
        let uploadTask = storageRef.put(upload.file);
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) =>  {
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
            },
            () => {
                upload.url = uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.db.object(`stores/${storeID}`).update({menu: upload});
            }
        );
    }
    
    getMenu(upload: UploadFile) {
        let storageRef = firebase.storage().ref().child(`${this.menuPath}/${upload.name}`);
        
        storageRef.getDownloadURL().then(function(url) {
            window.location.assign(url);
        }).catch(function(error) {
            // Handle any errors
        });
    }
    
    uploadPhoto(storeID: string, upload: UploadFile) {
        let storageRef = firebase.storage().ref().child(`${this.photoBasePath}/${storeID}_${upload.file.name}`);
        let uploadTask = storageRef.put(upload.file);
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) =>  {
                upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
            },
            () => {
                upload.url = uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.db.list(`stores/${storeID}/photos`).push(upload);
            }
        );
    }
    
    deletePhoto(storeID: string, uploadID: string, fileName: string) {
        if(uploadID === undefined || uploadID.length == 0){
            console.log('empty uploadID')
            return;
        }
        
        let basePath = 'photos';
        let photoRef = firebase.storage().ref().child(`${basePath}/${storeID}_${fileName}`);
        let uploadTask = photoRef.delete();
        
        uploadTask.then(() => {
            this.db.list(`stores/${storeID}/photos/`).remove(uploadID);
        }).catch((error) => {
            console.log(error);
        });
    }
  
}
