const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attachedFiles: { 
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
      }],
      default: [] 
    }
  });
  
  postSchema.methods.addToAttachedFiles  = function(file) {
    const attachedFileIndex = this.attachedFiles.findIndex(cp => {
      return cp._id.toString() === file._id.toString();
    });
    const updatedAttachedFiles = [... this.attachedFiles];

    if(attachedFileIndex >= 0)
    {
      updatedAttachedFiles[attachedFileIndex].path = file.path
      updatedAttachedFiles[attachedFileIndex].uploadTime = Date.now()
    } 
    else 
    {
      updatedAttachedFiles.push({
        path: file.path,
        uploadTime: Date.now()
      })
    }
    this.attachedFiles = updatedAttachedFiles;
    return this.save()
  };


  postSchema.methods.removeFromAttachedFiles = function(fileId) {
    const updatedAttachedFiles = this.attachedFiles.filter( item => { 
      return item._id.toString() !== fileId.toString();
    });
    this.attachedFiles = updatedAttachedFiles;
    return this.save()
  }


  module.exports = mongoose.model('Post', postSchema);