# Đánh giá thời gian và kích thước Production Build với React Compiler

## 1. Mục đích

So sánh **thời gian build** và **kích thước tệp đầu ra** khi **tắt (OFF)** và **bật (ON)** React Compiler trong ứng dụng React sử dụng **Vite 8.3.1**.

## 2. Phương pháp

- Đặt biến môi trường `REACT_COMPILER` lần lượt là `off` và `on`.
- Thực hiện lệnh `npm run build` **5 lần** ở mỗi trạng thái.
- Ghi lại thời gian `built in ...`, số module được xử lý và kích thước tài nguyên do Vite hiển thị.
- So sánh các giá trị trung bình, lấy trạng thái **OFF** làm mốc.

## 3. Kết quả thời gian build

| Lần đo | Compiler OFF | Compiler ON |
|:--:|--:|--:|
| 1 | 559 ms | 1.460 ms |
| 2 | 568 ms | 1.430 ms |
| 3 | 558 ms | 1.490 ms |
| 4 | 571 ms | 1.450 ms |
| 5 | 572 ms | 1.480 ms |
| **Trung bình** | **565,6 ms** | **1.462,0 ms** |

Khi bật Compiler, thời gian build tăng trung bình **896,4 ms**, tương đương **158,49%** (khoảng **2,58 lần** so với OFF).

## 4. Kết quả kích thước bản build

| Chỉ số | Compiler OFF | Compiler ON | Thay đổi |
|---|---:|---:|---:|
| Modules transformed | 1.973 | 1.975 | +2 module |
| JavaScript (chưa nén) | 336,91 kB | 356,86 kB | +5,92% |
| JavaScript (gzip) | 104,43 kB | 112,72 kB | +7,94% |
| CSS (chưa nén) | 24,21 kB | 24,21 kB | 0% |
| CSS (gzip) | 6,00 kB | 6,00 kB | 0% |

Các lần build trong cùng cấu hình hiển thị cùng kích thước các tệp đầu ra.

## 5. Nhận xét và kết luận

Trong thí nghiệm, **bật React Compiler làm tăng thời gian build và kích thước JavaScript bundle**. Điều này phù hợp với việc Compiler phải thực hiện thêm các bước phân tích và biến đổi mã nguồn để hỗ trợ Automatic Memoization. Tuy nhiên, log build chưa đủ để xác định chính xác thời gian tiêu tốn tại từng bước hoặc nguyên nhân tăng dung lượng của từng đoạn mã.

Kết quả cho thấy sự đánh đổi giữa **chi phí biên dịch (build-time cost)** và **khả năng tối ưu render khi chạy ứng dụng (runtime performance)**. Chỉ số `built in` do Vite báo cáo không phải toàn bộ thời gian chạy npm, và kích thước bundle không phản ánh trực tiếp tốc độ tải trang thực tế.

**Nguồn dữ liệu:** Ảnh chụp terminal `compiler-off.png` và `compiler-on.png`, mỗi ảnh gồm 5 lần build.

---

**English summary:** Enabling React Compiler increased the average Vite build time from **565.6 ms** to **1,462.0 ms** (+**158.49%**) and increased gzipped JavaScript size from **104.43 kB** to **112.72 kB** (+**7.94%**). CSS output size remained unchanged.
