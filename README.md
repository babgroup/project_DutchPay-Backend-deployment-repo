# Google OAuth2 NestJS with MySQL

- Google OAuth2를 통해 사용자를 인증하고, JWT를 발급하여 인증 상태를 유지하는 NestJS 기반 인증 백엔드입니다. MySQL과 TypeORM을 기반으로 사용자 정보를 저장합니다.

## 실행방법
```bash
git clone https://github.com/MunSeongyun/nest_mysql_login_google_oauth2.git
cd nest_mysql_login_google_oauth2
cp .env.example .env
cp server/.env.example server/.env
# modify .env
docker-compose up
```

## 디렉토리 구조 설명
```text
/server
├── auth       # 로그인 엔드포인트 및 JWT 발급
├── common     # 트랜잭션 유틸리티 및 추상 클래스
├── user       # 사용자 생성, 조회, 수정
└── shared     # guard, type 등 공통 정의
```

## 환경변수 설명

### /.env
- docker-compose.yml 파일에서 사용하는 환경변수 파일입니다.
    - DB_ROOT_PASSWORD: DB의 root 비밀번호 
    - DB_TYPE: DB의 종류
    - DB_HOST: docker-compose.yml파일에 정의된 DB서비스의 이름
    - DB_PORT: NestJS가 DB에 접속하기 위한 포트번호
    - DB_USERNAME: NestJS에서 DB에 접속할 때 사용할 유저이름
    - DB_PASSWORD: NestJS에서 DB에 접속할 때 사용할 비밀번호
    - DB_DATABASE: DB에 기본적으로 생성할 데이터베이스

### /server/.env
- NestJS프로젝트에서 사용하는 환경변수 파일입니다.
    - FRONTEND_URL: 구글 로그인이 성공한 후 사용자를 보낼 프론트엔드 주소입니다.
    - GOOGLE_CALLBACK_URL: 사용자가 구글 로그인 한 후 이동할 주소입니다. 반드시 auth.controller.ts의 googleRedirect 메서드로 이동하는 주소여야 합니다.
    - GOOGLE_CLIENT_ID: 구글 클라우드 콘솔에서 발급받은 OAuth 클라이언트 ID
    - GOOGLE_SECRET: 구글 클라우드 콘솔에서 발급받은 OAuth 클라이언트 Secret
    - JWT_SECRET: JWT 서명을 위한 비밀 키
    - JWT_EXPIRATION_TIME: JWT 토큰의 만료 시간 (예: 3600s, 1h, 7d 등)

## API 엔드포인트
- 실행 후 localhost:3000/api/doc 에서 확인할 수 있습니다.

## 주의사항
이 프로젝트는 https 환경에서만 동작합니다.