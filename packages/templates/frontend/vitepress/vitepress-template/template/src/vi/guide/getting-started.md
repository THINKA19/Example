# Bắt Đầu Nhanh

Hướng dẫn này sẽ giúp bạn nhanh chóng thiết lập một trang tài liệu VitePress.

## Yêu Cầu

- Node.js 18+
- pnpm 8+ (khuyến nghị) hoặc npm/yarn

## Cài Đặt

Tạo dự án mới bằng mẫu của chúng tôi:

```bash
# Sử dụng npx
npx @dengzhibo/vitepress-template

# Hoặc sử dụng pnpm
pnpm create vitepress-template
```

## Cấu Trúc Dự Án

Sau khi tạo, bạn sẽ thấy cấu trúc thư mục sau:

```
my-docs/
├── .vitepress/
│   ├── config/          # Các module cấu hình
│   │   ├── i18n.ts      # Cấu hình i18n
│   │   ├── nav.ts       # Cấu hình điều hướng
│   │   ├── sidebar.ts   # Cấu hình thanh bên
│   │   └── ...
│   ├── config.ts        # Tệp cấu hình chính
│   └── theme/           # Chủ đề tùy chỉnh
├── src/
│   ├── zh/              # Tài liệu tiếng Trung
│   ├── en/              # Tài liệu tiếng Anh
│   ├── vi/              # Tài liệu tiếng Việt
│   └── index.md         # Trang chủ
├── public/              # Tài nguyên tĩnh
└── package.json
```

## Phát Triển

Khởi động máy chủ phát triển:

```bash
pnpm dev
```

Truy cập http://localhost:5173 để xem trang tài liệu của bạn.

## Xây Dựng

Xây dựng cho sản xuất:

```bash
pnpm build
```

Sau khi xây dựng, các tệp tĩnh sẽ được xuất ra thư mục `dist`.

## Xem Trước

Xem trước bản dựng sản xuất:

```bash
pnpm preview
```

## Các Bước Tiếp Theo

- Tìm hiểu cách [cấu hình](/vi/guide/configuration) trang của bạn
- Xem [Tham Khảo API](/vi/api/) để biết thêm các tính năng
