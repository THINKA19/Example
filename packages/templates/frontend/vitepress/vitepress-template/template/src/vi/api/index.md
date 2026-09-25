# Tham Khảo API

Xem tài liệu API đầy đủ.

## API Cốt Lõi

### API Cấu Hình

Định nghĩa kiểu TypeScript và các tùy chọn có sẵn cho tệp cấu hình chính.

#### `defineConfig()`

Hàm trợ giúp để định nghĩa cấu hình VitePress với gợi ý kiểu.

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  // các tùy chọn cấu hình
})
```

### API Chủ Đề

Các giao diện và tùy chọn cấu hình để tùy chỉnh chủ đề.

#### `themeConfig`

Đối tượng cấu hình chủ đề chứa điều hướng, thanh bên, tìm kiếm và các tùy chọn khác.

```ts
interface ThemeConfig {
  nav?: NavItem[]
  sidebar?: Sidebar
  socialLinks?: SocialLink[]
  footer?: Footer
  // ...thêm tùy chọn
}
```

## API Quốc Tế Hóa

### `locales`

Đối tượng cấu hình đa ngôn ngữ.

```ts
interface LocaleConfig {
  label: string
  lang: string
  title?: string
  description?: string
  themeConfig?: ThemeConfig
}
```

Ví dụ:

```ts
export default defineConfig({
  locales: {
    root: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'My Docs',
    },
  },
})
```

## Tài Nguyên Khác

Xem [Tài Liệu API Chính Thức VitePress](https://vitepress.dev/reference/site-config) để biết danh sách API đầy đủ.
