export class UploadFile {
    
  key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date;
  
  constructor(file:File) {
    this.file = file;
    this.createdAt = new Date();
  }
}