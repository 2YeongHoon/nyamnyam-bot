# 베이스 이미지로 Node.js를 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 복사
COPY . .

# 애플리케이션 포트 설정
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["node", "index.js"]