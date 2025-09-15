# build-nodejs-backend-architecture-eCommerce

Đây là project backend Node.js cho hệ thống eCommerce, được khởi tạo và cài đặt theo các bước ban đầu.

## Khởi tạo dự án

```bash
# Khởi tạo package.json
npm init -y
```

## Cài đặt dependencies

```bash
# Express cho việc xây dựng API
npm i express --save
```

## Cài đặt devDependencies

```bash
# Morgan để log request
npm i morgan --save-dev

# Helmet để tăng bảo mật cho ứng dụng
npm i helmet --save-dev

# Compression để nén response (giúp tăng hiệu năng)
npm i compression --save-dev
```

## Mô tả các package đã cài đặt

- **express**: Framework web cho Node.js, sử dụng để xây dựng API và server
- **morgan**: Middleware logging HTTP requests (development)
- **helmet**: Middleware bảo mật giúp bảo vệ ứng dụng Express
- **compression**: Middleware nén HTTP responses để tối ưu hiệu năng

## Cấu trúc thư mục đề xuất

```
project-root/
├── src/
│   ├── app.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth/
│   │   ├── products/
│   │   └── orders/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── services/
│   ├── utils/
│   └── config/
├── tests/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Setup cơ bản

1. Clone repository
2. Cài đặt dependencies: `npm install`
3. Tạo file `.env` cho các biến môi trường
4. Chạy ứng dụng: `npm start` hoặc `node src/app.js`

## Scripts đề xuất cho package.json

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest"
  }
}
```

## Các bước tiếp theo

- [ ] Cấu hình database (MongoDB/PostgreSQL)
- [ ] Setup authentication & authorization
- [ ] Tạo API routes cho products, orders, users
- [ ] Thêm validation middleware
- [ ] Setup error handling
- [ ] Cấu hình CORS
- [ ] Thêm rate limiting
- [ ] Setup testing environment
