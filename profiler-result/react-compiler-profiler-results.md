# Đánh giá React Compiler bằng React DevTools Profiler

## 1. Mục đích

So sánh thời gian render được React DevTools Profiler ghi nhận khi **tắt (OFF)** và **bật (ON)** React Compiler trên component `TrendingSection`.

## 2. Phương pháp

- Sử dụng cùng ứng dụng và cùng component `TrendingSection` ở hai cấu hình React Compiler.
- Ghi lại **5 phiên đo cho mỗi trạng thái**, mỗi phiên gồm **5 commit** (25 commit/trạng thái).
- Xuất kết quả từ React DevTools Profiler thành JSON.
- Tính thời gian trung bình của mỗi phiên từ `commitData.duration`:

  **Thời gian trung bình/commit = Tổng duration của phiên / 5.**

> Số liệu bên dưới là thời gian render của commit do Profiler ghi nhận cho cây React được profile, không phải thời gian tải trang hay tổng thời gian tương tác của người dùng.

## 3. Kết quả

| Lần đo | OFF (ms/commit) | ON (ms/commit) | Mức giảm |
|:--:|--:|--:|--:|
| 1 | 21,78 | 7,58 | 65,20% |
| 2 | 20,68 | 7,24 | 64,99% |
| 3 | 21,24 | 7,70 | 63,75% |
| 4 | 21,52 | 7,60 | 64,68% |
| 5 | 21,02 | 7,26 | 65,46% |
| **Trung bình** | **21,25** | **7,48** | **64,82%** |

- **Số commit:** 5 commit/phiên ở cả ON và OFF.
- **Thời gian trung bình:** giảm khoảng **13,77 ms/commit** khi bật Compiler.
- Trạng thái `compiledWithForget` của `TrendingSection` được ghi nhận là `false` (OFF) và `true` (ON).

## 4. Nhận xét và kết luận

Khi bật React Compiler, thời gian render trung bình trong phạm vi khảo sát giảm khoảng **64,82%**, trong khi **số commit không đổi**. Kết quả phù hợp với mục tiêu của React Compiler là hạn chế công việc render không cần thiết thông qua **Automatic Memoization**, thay vì nhất thiết giảm số lần commit.

Kết quả chỉ phản ánh thành phần, kịch bản tương tác và môi trường profiling đã đo; không thể suy ra rằng toàn bộ ứng dụng nhanh hơn 64,82%.

**Nguồn dữ liệu:** 10 file JSON React DevTools Profiler của bộ đo lại (`compiler-off-1th.json` đến `compiler-off-5th.json` và các file ON tương ứng).

---

**English summary:** Across five runs per configuration, React Compiler reduced the average recorded render duration from **21.25 ms** to **7.48 ms per commit** (approximately **64.82%**), with **5 commits per run** in both configurations.
