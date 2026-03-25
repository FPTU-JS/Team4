# Báo cáo Tổng Quan & Chi Tiết Dự Án CO-CHE (Cooking Chef)

Phần báo cáo này tập trung đi sâu vào Kiến trúc của hệ thống, Phân tích kỹ thuật mô hình Xác Thực/Phân quyền bảo mật (Auth/Authorization) **ĐÃ HOÀN TẤT** cũng như Phân tách các nghiệp vụ tính năng của 2 khối Backend/Frontend.

---

## 1. Kiến Trúc Cơ Bản & Tech Stack (Chi Tiết)

### Backend (`Backend_FPT`)
- **Ngôn ngữ & Framework:** Java 17, Spring Boot 4.0.3.
- **Data Layer:** Spring Data JPA, Hibernate, cấu hình kết nối tới MySQL. Tận dụng `Lombok` để tối giản code cho Data Object, Controller.
- **RESTful API & Documentation:** Thiết kế chuẩn Rest API, có dùng `springdoc-openapi` để auto-gen tài liệu Swagger.
- **Giao tiếp Real-time:** Spring Websocket hỗ trợ tương tác tức thời (Chat và Thông báo real-time).

### Frontend (`FPT-Frontend/my-react-project`)
- **Core Engine:** React 19.x & Vite (tăng tốc độ build và dev).
- **Giao diện & Chuyển cảnh:** Vanilla CSS kết hợp thư viện `framer-motion` (hiệu ứng Animation mượt mà) và Lucide React (Icons UI).
- **Form Control:** React Hook Form tích hợp Yup cho chuẩn hoá Validation cực kì bảo mật.
- **Kết nối Mạng:** Axios (HTTP Rest), StompJS & SockJS (nhận tín hiệu Websocket từ Spring Boot).
- **Bản đồ:** Giải pháp OpenStreetMap qua `leaflet` & `react-leaflet`.
- **Đa ngữ & Khác:** `i18next` (Quản lý đa ngôn ngữ), Firebase (Cloud Storage / Ảnh).

---

## 2. Chi Tiết Luồng Xác Thực & Phân Quyền (Auth) Đã Cập Nhật

Hệ thống đã nâng cấp toàn diện lên cơ cấu xác thực vững chắc: **Stateless Authentication** thông qua **JWT** kết hợp cùng OAuth2 (Google Login).

### A. Phía Backend (Spring Security)
- **Xác minh người dùng (Authentication):**
  - Khởi động `JwtAuthenticationFilter` để giải mã và chứng nhận Token JWT.
  - Hỗ trợ OAuth2 (`OAuth2AuthenticationSuccessHandler`) cho ứng dụng Google Login.
- **Phân Bổ Quyền Hạn (Authorization):**
  - Tính năng Annotation `@EnableMethodSecurity` đã có hiệu lực để bảo vệ API theo từng Method.
  - Tích hợp `@PreAuthorize("hasRole('ADMIN')")` thành công trên nhánh kiểm soát: Tần suất Post Endpoint của các Ban quản trị (như `ProductController` cho CRUD Recipe, Product, Ingredient). Chỉ Admin mới truy xuất tài nguyên tạo thực đơn.

### B. Phía Frontend (React)
- **Lưu trữ Token:** Token JWT và Authentication State lưu tại `localStorage`.
- **Thực thể Quyền (Role Payload):** Context phân tán `AuthContext.jsx` giải mã JWT (`parseJwt`) và đồng bộ `role` của người dùng trên toàn hệ thống Component.
- **Lá Chắn Điều Hướng (Route Protection/Guards):**
  - **New Component `ProtectedRoute.jsx`:** Chặn toàn bộ sự nhảy trang không hợp lệ. Khi một khách ghé thăm gõ URL `http://.../profile` mà không có Token, họ lập tức nhận một "Toast Notification" cảnh báo và bị Redirect quay lại cổng `/login`.
  - Tích hợp khép kín lên lõi `App.jsx` điều tiết bảo vệ an toàn cho: `/profile`, `/community`, `/plan-setup`, `/healthy-plan`, `/ai-assistant` và `/camera`.

---

## 3. Các Mô-đun (Modules) Tính Năng Chi Tiết Hệ Thống

### 3.1. Người dùng (User & Onboarding)
- Nhận diện mục tiêu ăn uống (Onboarding Preferences).
- Trang `Profile.jsx`: Sửa đổi thông tin, thiết lập Avatar, theo dõi Streak hoạt động.

### 3.2. Trợ Lý AI & Computer Vision
- `AIAssistant.jsx`: Tính năng chat tư vấn, đưa ra danh mục nguyên liệu thông minh.
- `CameraCapture.jsx`: Nhận diện hình ảnh thực phẩm nhanh qua mô hình AI kết nạp từ Camera.

### 3.3. Dinh Dưỡng - Healthy Plan
- `HealthyPlanSetup.jsx`: Tính toán hệ số BMI cá nhân hoá.
- `HealthyPlanDashboard.jsx`: Bảng Dashboard Timeline để tracking quá trình Eat-Clean từng tuần.

### 3.4. Dữ Liệu Công Thức & Bản Đồ
- Tra cứu công thức Món Ăn, Category chuẩn xác (Search Filter).
- Bản đồ Nhà hàng Đề xuất `Map.jsx` sử dụng Engine bản đồ Leaflet mạnh mẽ.

### 3.5. Hệ Thống Cộng Đồng (Social/Websocket)
- Sân chơi `Community.jsx`: Mô hình mạng xã hội thu nhỏ (Post, Comment).
- Các Thread Thảo luận (Threads) chạy song song với Real-time Socket để nảy thông báo Notification khi có tương tác ngay lập tức.

---

> **Kết luận Hoàn Thiện:** Dự án đã chuyển mình trở thành một nền tảng full-stack ứng dụng vững vàng. Điểm yếu duy nhất trước đây là Rò rỉ Chặn Quyền trên UI và API (Role Permission Enforcement) hiện tại đã được khắc phục hoàn toàn. Sẵn sàng đem vào sử dụng thực chiến (Production) hoặc báo cáo Giảng Viên cho Đồ Án Cuối Môn/Tốt nghiệp.
