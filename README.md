# Twitter-Clone

## 📌 Twitter-Clone

- ### 프로젝트 개요

  - https://isdebrave-twitter-clone.shop/
  - 테스트 계정  
    email : test@example.com  
    password : qwer1234
  - 실제 트위터를 모델로 구현한 프로젝트입니다.  
    게시글 작성, 팔로우/팔로잉, 이미지 삽입 등 다양한 기능을 추가하였습니다.

- ### 주요 기능

  - **로그인/회원가입**

    > a. **토큰**이 있어야 홈에 접속할 수 있다.  
    > b. 회원가입의 경우, **이메일 인증**까지 통과해야 한다.  
    > c. 로컬 로그인 말고, **sns 로그인**으로도 접속할 수 있다.

  - **게시글 작성**

    > a. db에 게시글을 저장하는 동안, **게시글 더미 데이터**를 보여준다.  
    > &ensp;&ensp;저장이 완료되면 더미 데이터를 실제 데이터와 바꾼다.  
    > b. 이미지는 등록하기 전에 **미리볼 수 있다.**  
    > c. **게시글 작성 modal**이 있어서 어디서든 추가할 수 있다.

  - **무한 스크롤**

    > a. 게시글은 3개씩 보여주고, 더 필요할 때마다 http request를 보낸다.  
    > b. **lastId 기법**과 **Intersection Observer**로 구현했다.

  - **이미지 삽입**

    > a. 이미지는 4개까지 등록할 수 있다.  
    > &ensp;&ensp;1개, 2개, 3개, 4개일 때의 모습은 실제 트위터와 똑같이 구현했다.  
    > b. 이미지를 클릭하면 **carousel**이 되도록 만들었다.

  - **팔로우/팔로잉**

    > a. 팔로우를 누르면 팔로우 또는 팔로잉이 증가한다.  
    > &ensp;&ensp;**redux + 유저 더미 데이터**로 불필요한 http request를 막았다.  
    > &ensp;&ensp;새로고침을 하면 http request로 저장한 유저 정보를 가져온다.  
    > b. profile 대상이 바뀔 때마다 http request로 유저 정보를 받아오도록 만들었다.

  - **알림**
    > a. 댓글 작성 또는 게시글 좋아요를 누르면 게시글을 작성한 유저에게 알림이 간다.

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

![시스템 다이어그램](https://github.com/isdebrave/twitter-clone/assets/148482966/f123267e-4703-4019-a8ba-74d86db80a64)

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
