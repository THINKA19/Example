# Hướng Dẫn Cấu Hình

Tìm hiểu cách cấu hình trang tài liệu VitePress của bạn.

## Cấu Hình Cơ Bản

Tệp cấu hình chính nằm tại `.vitepress/config.ts`, đóng vai trò là điểm vào cho tất cả các cấu hình.

### Metadata Trang

Cấu hình thông tin cơ bản của trang trong `.vitepress/config/site.ts`:

```ts
export const siteConfig = {
  title: 'Trang Tài Liệu Của Tôi',
  description: 'Tài liệu dự án dựa trên VitePress',
  lang: 'vi-VN',
  base: '/',
}
```

### Cấu Hình Chủ Đề

Cấu hình các tùy chọn liên quan đến chủ đề trong `.vitepress/config/theme.ts`:

```ts
export const themeConfig = {
  logo: '/logo.svg',
  nav: [...],
  sidebar: {...},
  footer: {...},
}
```

## Quốc Tế Hóa

### Thêm Ngôn Ngữ Mới

Thêm cấu hình ngôn ngữ mới trong `.vitepress/config/i18n.ts`:

```ts
export const jaConfig = {
  label: '日本語',
  lang: 'ja-JP',
  title: 'マイドキュメント',
  themeConfig: {
    nav: [...],
    sidebar: {...},
  }
}
```

### Cấu Trúc Thư Mục Ngôn Ngữ

Tạo các thư mục nội dung tương ứng cho mỗi ngôn ngữ:

```
src/
├── zh/          # Tiếng Trung
├── en/          # Tiếng Anh
├── vi/          # Tiếng Việt
└── ja/          # Tiếng Nhật (mới)
```

## Cấu Hình Điều Hướng

Cấu hình thanh điều hướng trên cùng trong `.vitepress/config/nav/index.ts`.

## Cấu Hình Thanh Bên

Cấu hình menu thanh bên trong `.vitepress/config/sidebar/index.ts`.

## Cấu Hình Tìm Kiếm

Cấu hình tìm kiếm cục bộ trong `.vitepress/config/search.ts`.

## Cấu Hình SEO

Cấu hình các thẻ meta liên quan đến SEO trong `.vitepress/config/seo.ts`.

## Tài Nguyên Khác

- [Tài Liệu Chính Thức VitePress](https://vitepress.dev)
- [Tham Khảo Cấu Hình](https://vitepress.dev/reference/site-config)
