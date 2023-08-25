const mongoose = require('mongoose'); // db 모듈 경로에 맞게 수정
const faker = require('faker');
const File = require('../models/file'); // file 모델 경로에 맞게 수정
const Post = require('../models/post'); // post 모델 경로에 맞게 수정
const ObjectId = mongoose.Types.ObjectId;

const createDummyData = async () => {
    try {
      await Promise.all([
        File.deleteMany(),
        Post.deleteMany()
      ]); // 기존 데이터 삭제
  
      const files = [];
      for (let i = 0; i < 10; i++) {
        const newFile = new File({
          path: faker.system.filePath(),
          uploadTime: faker.date.past()
        });
        files.push(await newFile.save());
      }
      const objectId = new ObjectId('64e56b7c346c96def594d258')
      for (let i = 0; i < 10; i++) {
        const newPost = new Post({
          title: faker.lorem.words(3),
          imageUrl: faker.image.imageUrl(),
          description: faker.lorem.paragraph(),
          userId: objectId, // 실제 userId로 수정
          attachedFiles: [files[i]._id] // 파일의 ObjectId를 참조
        });
        await newPost.save();
      }
  
      console.log('Dummy data created successfully.');
    } catch (error) {
      console.error('Error creating dummy data:', error);
    } 
  };
  
  module.exports = createDummyData;