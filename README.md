# 2021-songjas-backend


## 2021 Korea Hacks 고카톤

![timmo_title](https://user-images.githubusercontent.com/54926663/104111553-90e93f80-5326-11eb-9118-a42f4874be72.png)

- 프로젝트 기간: 2020.01.09 ~ 2020.01.10
- [프로젝트 발표 자료](https://drive.google.com/file/d/1GlH8ZLYTxTZygCWB-f1G6wEP0iegCgmp/view?usp=sharing)

<br>
 
## 🤩 [TIMMO Notion](https://www.notion.so/tnsy/f75a5d26ba13465494153144a3ca8005)

<br>

## 😂 [REST API DOCS](https://www.notion.so/REST-API-c3a1c22d8f9b47c08800bf10129fd816)

<br>

## 😊 Project

프로 팀플러들의 스토리브 리그, 팀모입니다.

팀모는 언택트 시대의 대학생들을 위한 팀 빌딩 + 팀 협업 서비스로, 팀으로 진행하는 활동에서 
<br>팀원을 찾기 어려워 고민하는 대학생들을 위해 만들어졌습니다. 
<br>팀모의 팀원 모집/찾기를 통해 나와 딱 맞는 팀원을 찾아보세요! 그리고 협업을 시작하세요!

<br>

## 🤔 Function

- 팀모 (팀원 모집)
- 팀글 (팀원 찾기)
- 마이페이지

<br>

## 😱 Code Convention

- 변수와 함수명은 `camelCase`

- 상수는 `UPPER_CASE`

- `var` 사용 지양하고, `let` 이나 `const` 사용

- 한 번에 하나의 변수만 선언

- 파일명은 `lower-case`

- 들여쓰기는 에디터 자동 완성으로

- 문장의 끝에는 `;` 입력.

- 한 줄에는 하나의 구문만.

- `Arrow Function` 사용 지향

- 템플릿 리터럴 사용

- 작은 따옴표 사용

- `try, catch`는 자동 완성으로

- 속성 단축 구문

- 등가식은 `===` `!==` 을 사용

- git branch

  ```
  main
  |
  |--sy
  |
  |---yg
  ```

- git commit message [(Visual Studio Code Commitizen Support 활용)](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-commitizen)

![commit msg](https://user-images.githubusercontent.com/54926663/104111682-55e80b80-5328-11eb-90e9-8528e383dc31.png)


  ```
  ex) feat(users): [POST] signin 
  
  => 기능(상위 라우터): [메소드] 세부 내용
  ```

<br>

## 😤 Dependency Module

사용 패키지 모듈은 다음과 같습니다.

- nodemailer - 회원가입시 이메일 인증을 위한 이메일 전송
- ejs - 이메일 전송 포맷
- bcrypt - 비밀번호 암호화 및 복호화
- jsonwebtoken - JWT 생성 및 인증
- aws-sdk, multer, multer-s3 - NCP Storage Object에 이미지 업로드
- sequelize - ORM(Object-relational Mapping)

```json
{
  "name": "timmo",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "pm2 ./bin/www",
    "stop": "pm2 ./bin/www"
  },
  "dependencies": {
    "aws-sdk": "^2.824.0",
    "bcrypt": "^5.0.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "^3.1.5",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.2.5",
    "nodemailer": "^6.4.17",
    "path": "^0.12.7",
    "sequelize": "^6.3.5"
  }
}
```

<br>

## 😲 Architectuer

![시스템 구조도](https://user-images.githubusercontent.com/54926663/104111514-f5f06580-5325-11eb-85ed-c9839477cfe2.png)

<br>

## 😬 ERD Diagram

![DB 설계](https://user-images.githubusercontent.com/54926663/104111377-6f875400-5324-11eb-9d3e-b5f870a99ad0.png)

<br>

## 🥱 Develop Framework & Environment

- Node.js
- Express.js
- NPM
- PM2
- MySQL
- MySQL Workbench
- VS Code
- Naver Cloude Platform Server - mysql(5.7)-centos-7.2-64
- Naver Cloude Platform Storage Object

<br>

## 😎 Team Role

##### 💙박윤경

- Database 설계 [DB 설계 및 구현](https://www.notion.so/DB-965eb588a60241238c0ebc06861a505c)
- Nodemailer를 이용해 이메일 인증 구현
- Bcrypt를 사용한 비밀번호 암호화 및 복호화 구현
- Sequelize로 모델 생성 및 ERD 작성
- REST API 설계 및 구현 [REST API 문서](https://www.notion.so/REST-API-c3a1c22d8f9b47c08800bf10129fd816)

##### 💛조수연

- Database 설계 [DB 설계 및 구현](https://www.notion.so/DB-965eb588a60241238c0ebc06861a505c)
- Node.js + Expesee.js + MySQL 개발 환경 구성 (기본 모듈 구성 및 구조 설계)
- Multer와 Naver Cloude Platform의 Object Storage로 이미지 업로드 구현
- REST API 설계 및 구현 [REST API 문서](https://www.notion.so/REST-API-c3a1c22d8f9b47c08800bf10129fd816)

<br>
