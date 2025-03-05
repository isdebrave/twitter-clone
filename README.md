# Twitter-Clone

<div align=center>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/redux toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
  <img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=react query&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
  <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
  <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">
  <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwind css&logoColor=white">
  <img src="https://img.shields.io/badge/webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black">
</div>

## 📌 Twitter-Clone

- ### 프로젝트 개요

  - 실제 트위터를 모델로 구현한 프로젝트  
    게시글 작성, 팔로우/팔로잉, 이미지 삽입 등 다양한 기능을 추가했다.

- ### 주요 기능

  - **로그인**

    > 쿠키와 세션을 사용해 인증을 진행하고, 인증이 완료되면 로컬 스토리지에 auth 키를 저장한다.

  - **이메일 회원가입**

    > 양식 작성 후, 유효한 이메일인지 확인하기 위해 이메일 인증 -> 통과하면 db에 저장한다.

  - **게시글 작성**

    > backend의 저장 결과를 기다린 후 반영하는 것이 아니라, backend에서 데이터를 저장하는 도중에 redux state에 작성한 게시글 결과를 반영한다.

  - **무한 스크롤**

    > Intersection Observer, redux, react-query로 구현한다.

  - **이미지 삽입**

    > 이미지는 4개까지 등록할 수 있고, carousel로 볼 수 있다.

  - **팔로우/팔로잉**

    > backend의 저장 결과를 기다린 후 반영하는 것이 아니라, backend에서 데이터를 저장하는 도중에 redux state에 팔로우/팔로잉 결과를 반영한다.

  - **알림**
    > 댓글 작성 또는 게시글 좋아요를 누르면 게시글을 작성한 유저에게 알림이 간다.

- ### 향후 계획
  - 팔로우/팔로잉 리스트 구현
  - 게시글 공유(카카오톡)
  - 게시글 북마크
  - 이미지 리사이징
  - GIF 삽입
  - 대댓글
  - 다크 모드
  - PWA
  - 코드 리팩토링

## 📌 시스템 아키텍쳐

- ### Frontend

  ![시스템 아키텍쳐](https://github.com/isdebrave/twitter-clone/assets/148482966/72c3fc95-39d7-461f-ba77-d91cf91e098a)

- ### Backend
  ![시스템 아키텍쳐2](https://github.com/isdebrave/twitter-clone/assets/148482966/350ae025-1f61-43a4-847d-5cac9e367316)

## 📌 시퀀스 다이어그램

### 1. 로컬 로그인

![image](https://github.com/isdebrave/twitter-clone/assets/148482966/a4b06188-94cc-4019-a5b7-5da5c3847a6c)

### 2. 이메일 회원가입

![image](https://github.com/isdebrave/twitter-clone/assets/148482966/a74ce5a6-f79c-4c27-a533-3d3d644b0de4)

### 3. 무한 스크롤

![image](https://github.com/isdebrave/twitter-clone/assets/148482966/5b65deff-c920-4ad3-b45f-9cf139f57435)

## 📌 서비스 소개

### 1. 로그인/회원가입

- **데스크탑**

  ![image](https://github.com/isdebrave/twitter-clone/assets/148482966/466a031c-b60f-455b-828f-048f968cbb45)

- **로그인 GIF**

  ![1](https://github.com/isdebrave/twitter-clone/assets/148482966/3d1e43e3-4f7f-41f1-9ac5-2d547cfcd832)

### 2. 홈

- **데스크탑**
  ![image](https://github.com/isdebrave/twitter-clone/assets/148482966/5da03b16-d003-4579-865f-27ca598ca078)

### 3. 게시글 작성

- **게시글 작성 GIF**

  ![2](https://github.com/isdebrave/twitter-clone/assets/148482966/cb30cba1-0c0c-4c0c-85f0-08f153b32250)

- **게시글 modal 작성 GIF**

  ![3](https://github.com/isdebrave/twitter-clone/assets/148482966/701ea629-d8eb-4f0d-9b4f-a7a98289ca91)

### 4. 무한 스크롤

- **무한 스크롤 GIF**

  ![4](https://github.com/isdebrave/twitter-clone/assets/148482966/f1bde797-83bc-447b-813a-984ba8e13638)

### 5. 이미지 삽입

- **이미지 GIF**

  ![5](https://github.com/isdebrave/twitter-clone/assets/148482966/7ae5b395-3a18-40a0-8d20-31eec4718f6f)

- **carousel GIF**

  ![6](https://github.com/isdebrave/twitter-clone/assets/148482966/bfb5abff-8e1f-4706-95f3-55e0b683cc49)

### 6. 팔로우/팔로잉

- **팔로우/팔로잉 GIF**

  ![7](https://github.com/isdebrave/twitter-clone/assets/148482966/4140c2d5-bcaa-4d77-a8c1-e959ec054d6b)

### 7. 알림

- **댓글 알림 GIF**

  ![8](https://github.com/isdebrave/twitter-clone/assets/148482966/38639de5-d325-4086-a05f-0f95341db297)
