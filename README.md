# Movie Discovery App

Ứng dụng khám phá phim và chương trình truyền hình, sử dụng dữ liệu từ [The Movie Database (TMDB)](https://www.themoviedb.org/). Tài liệu này giới thiệu công nghệ, chức năng, phân công nhóm và cách cài đặt, sử dụng dự án.

## Công nghệ và thư viện

| Công nghệ/thư viện | Vai trò trong dự án |
| --- | --- |
| React 19 | Xây dựng giao diện theo component. |
| Vite 8 | Chạy máy chủ phát triển và đóng gói ứng dụng. |
| React Router 7 | Điều hướng phía trình duyệt và khai báo các route. |
| TanStack Query 5 | Truy vấn, cache và cập nhật dữ liệu bất đồng bộ; hỗ trợ mutation. |
| Sass | Tổ chức style theo component và dùng biến style chung. |
| Lucide React | Cung cấp icon cho giao diện. |
| React Compiler | Thử nghiệm tự động tối ưu render thông qua Babel preset của Vite React plugin. Bật mặc định trong cấu hình dự án. |
| Rollup Visualizer | Tạo sơ đồ bundle để xem thành phần và kích thước các module sau build. |
| TMDB API | Cung cấp dữ liệu phim, TV, tìm kiếm, trailer, chi tiết và watchlist. |

## Chức năng theo ba tầng

### Tầng 1 – Bắt buộc: lõi và công nghệ chính

- Trang chủ hiển thị phim thịnh hành theo ngày/tuần và phim phổ biến.
- Tìm kiếm phim và chương trình TV, chuyển loại kết quả và phân trang.
- Mở trang chi tiết phim, xem mô tả, điểm đánh giá, thể loại, dàn diễn viên và nội dung tương tự.
- Xem trailer YouTube trong cửa sổ modal hoặc mở trang chính thức nếu có.
- Điều hướng giữa trang chủ, tìm kiếm, watchlist và trang chi tiết.

### Tầng 2 – Chuẩn kỹ nghệ phần mềm theo đặc thù nền tảng

- Tách giao diện thành pages, components và custom hooks.
- Dùng TanStack Query để quản lý truy vấn, cache và trạng thái tải/lỗi.
- Dùng React Router cho route động, query parameters và điều hướng phía client.
- Dùng Sass để tổ chức style; các thành phần giao diện dùng lại như movie card, header và footer.
- Có trạng thái đang tải, danh sách rỗng và lỗi truy vấn ở các trang dữ liệu chính.

### Tầng 3 – Kỹ thuật nâng cao tự chọn

- Tải trang bằng `React.lazy` kết hợp `Suspense` và `PageLoader`.
- Dùng `ErrorBoundary` để hiển thị giao diện dự phòng khi component gặp lỗi render.
- Dùng TanStack Query mutation để thêm/xóa watchlist và yêu thích TMDB, với cập nhật lạc quan và hoàn tác cache khi API lỗi.
- Lưu danh sách cá nhân trong `localStorage`.
- Tích hợp React Compiler và Rollup Visualizer; lưu các báo cáo build và React DevTools Profiler để so sánh.

## Phân công đề xuất cho 4 thành viên

| Thành viên | Phạm vi phụ trách | Nội dung trình bày |
| --- | --- | --- |
| **Thành viên 1 – Nền tảng ứng dụng** | Router, layout dùng chung, Header/Footer, lazy loading, Suspense, PageLoader, ErrorBoundary và cấu hình bundle. | Cấu trúc ứng dụng, điều hướng, xử lý trạng thái tải/lỗi và cách đọc báo cáo Visualizer. |
| **Thành viên 2 – Khám phá trang chủ** | Banner, Trending, Popular, movie card, truy vấn TMDB cho trang chủ, lấy trailer và trailer modal. | Luồng dữ liệu trang chủ, bộ lọc Trending và cách xem trailer; cấu hình React Compiler. |
| **Thành viên 3 – Tìm kiếm và chi tiết** | Tìm kiếm phim/TV, chuyển loại kết quả, phân trang, dữ liệu và giao diện chi tiết phim/TV. | Query parameters, gọi API, trạng thái tải/lỗi và các thông tin hiển thị ở trang chi tiết. |
| **Thành viên 4 – Tính năng cá nhân** | Watchlist phim/TV, xóa khỏi watchlist, yêu thích TMDB, danh sách cá nhân trong `localStorage` và mutation/cache. | Cách cập nhật watchlist, cập nhật lạc quan, rollback khi lỗi và yêu cầu cấu hình tài khoản TMDB. |

Đây là phân công tham khảo theo cấu trúc hiện tại; nhóm có thể thay tên thành viên theo người thực sự thực hiện từng phần.

## Cài đặt và chạy

### Yêu cầu

- Node.js và npm.
- TMDB Read Access Token để tải dữ liệu trực tiếp từ TMDB và sử dụng thao tác tài khoản.

### Các bước cài đặt

1. Cài dependencies:

   ```bash
   npm install
   ```

2. Tạo file `.env` từ mẫu `.env.example`.

   PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   macOS/Linux:

   ```bash
   cp .env.example .env
   ```

3. Mở `.env` và điền thông tin TMDB:

   ```dotenv
   VITE_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token
   VITE_TMDB_ACCOUNT_ID=your_tmdb_account_id
   ```

   Không chia sẻ hoặc commit token thật. `.env` đã được Git bỏ qua; chỉ commit `.env.example` không chứa thông tin bí mật.

4. Khởi chạy ứng dụng:

   ```bash
   npm run dev
   ```

   Mở địa chỉ local mà Vite hiển thị trong terminal. Sau khi sửa `.env`, khởi động lại máy chủ phát triển.

## Hướng dẫn sử dụng

1. Ở trang chủ, chọn **Today** hoặc **This Week** trong khu vực Trending để đổi khoảng thời gian; cuộn xuống để xem Popular và Latest Trailers.
2. Nhập từ khóa vào ô tìm kiếm trên Header. Kết quả được cập nhật sau khi ngừng nhập; có thể chuyển giữa Movies và TV Shows, sau đó dùng Previous/Next để phân trang.
3. Chọn một thẻ phim trên trang chủ để mở chi tiết. Trang chi tiết cung cấp thông tin phim, trailer nếu TMDB có dữ liệu, và các nút thêm vào danh sách, yêu thích hoặc watchlist.
4. Mở menu hồ sơ và chọn **Danh sách theo dõi** để xem watchlist phim/TV và xóa một mục. Watchlist và yêu thích được lưu trên tài khoản TMDB đã cấu hình; danh sách cá nhân lưu trong trình duyệt hiện tại.

## Phạm vi hiện tại

- Các route có trang chức năng là `/`, `/search`, `/watchlist` và `/movies/:movieId` (TV dùng query `?type=tv`). Các route còn lại hiển thị trang đang phát triển.
- Kết quả tìm kiếm hiện là thông tin hiển thị, chưa có liên kết từ từng kết quả sang trang chi tiết.
- Một số nút Header/Footer, bộ lọc trailer **Popular / In Theaters**, lịch watchlist và bộ lọc ngày mới là giao diện mẫu hoặc chưa có xử lý hoàn chỉnh.
- Chưa có đăng nhập người dùng trong ứng dụng. Watchlist/yêu thích sử dụng TMDB account ID cấu hình; danh sách riêng sử dụng `localStorage`.
- Khi thiếu token, một số phần trang chủ có dữ liệu dự phòng; tìm kiếm, chi tiết và thao tác tài khoản yêu cầu token TMDB hợp lệ.

## Phân tích bundle và React Compiler

Vite config tích hợp Rollup Visualizer để tạo `stats.html` dạng treemap trong quá trình build. Plugin đang bật tùy chọn tự mở báo cáo sau build.

React Compiler bật mặc định. Để build khi tắt compiler:

PowerShell:

```powershell
$env:REACT_COMPILER = "off"; npm run build
```

macOS/Linux:

```bash
REACT_COMPILER=off npm run build
```

Để build với compiler bật, bỏ biến môi trường hoặc đặt nó thành `on`, rồi chạy `npm run build`. Mỗi lần build tạo/cập nhật `stats.html`; hãy mở và lưu báo cáo cần giữ trước khi tạo báo cáo khác.

- [Kết quả so sánh build và kích thước bundle](build-result/react-compiler-build-results.md): báo cáo ghi nhận trung bình build OFF 565,6 ms và ON 1.462,0 ms; JavaScript gzip lần lượt 104,43 kB và 112,72 kB.
- [Kết quả React DevTools Profiler](profiler-result/react-compiler-profiler-results.md): trong phép đo `TrendingSection`, thời gian render trung bình được ghi nhận 21,25 ms/commit khi OFF và 7,48 ms/commit khi ON.

Các số liệu trên thuộc môi trường và kịch bản đo đã ghi trong báo cáo; chúng không đại diện cho tốc độ toàn ứng dụng trên mọi máy hoặc mọi lượt sử dụng.

## Lệnh dự án

| Lệnh | Tác dụng |
| --- | --- |
| `npm run dev` | Chạy máy chủ phát triển. |
| `npm run build` | Tạo bản production và báo cáo Visualizer. |
| `npm run preview` | Xem thử bản build production. |
| `npm run lint` | Chạy ESLint. |
