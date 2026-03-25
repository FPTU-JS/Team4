# BÁO CÁO BẢO VỆ DỰ ÁN CO-CHE (COOKING CHEF)
*Tài liệu chuẩn bị cho buổi bảo vệ dự án / đồ án*

---

## I. GIỚI THIỆU CHUNG (ĐẶT VẤN ĐỀ)
### 1. Bối cảnh
Trong cuộc sống bận rộn hiện đại, việc suy nghĩ "Hôm nay ăn gì?", làm sao để nấu ăn ngon với những nguyên liệu sẵn có, và đặc biệt là ăn uống sao cho đủ dinh dưỡng, hợp lý đang là một bài toán khó với nhiều cá nhân và gia đình.

### 2. Mục tiêu dự án
Dự án **CO-CHE (Cooking Chef)** ra đời nhằm cung cấp một nền tảng toàn diện hỗ trợ người dùng từ khâu lên ý tưởng thực đơn dựa trên nguyên liệu hiện có, tính toán dinh dưỡng (BMI, Eat-Clean), cho đến việc theo dõi lộ trình ăn uống. Đặc biệt, hệ thống tích hợp công nghệ AI (Chat tư vấn, Nhận diện hình ảnh) và mạng xã hội thu nhỏ để chia sẻ công thức.

---

## II. KIẾN TRÚC HỆ THỐNG & CÔNG NGHỆ CHÍNH (TECH STACK)
Hệ thống được thiết kế theo mô hình Client-Server phân tán (Frontend - Backend tách rời):

### 1. Phía Backend (Server-side)
- **Ngôn ngữ & Framework:** Java 17, Spring Boot (phiên bản 4.x).
- **Cơ sở dữ liệu:** MySQL (qua `coche_db.sql`), giao tiếp qua khối Data Layer Spring Data JPA & Hibernate `MySQLDialect`.
- **Tối ưu Code:** Sử dụng thư viện `Lombok` thiết kế DTO/Entity linh hoạt. 
- **Tài liệu API:** `springdoc-openapi` (Swagger) giúp tự động hoá docs API.
- **Giao tiếp Real-time:** Spring Websocket (cho tính năng Mạng xã hội/Thông báo).

### 2. Phía Frontend (Client-side)
- **Framework & Build Tool:** React 19.x kết hợp ViteJS giúp tối ưu tốc độ build và Hot-Reload.
- **Kiểm soát State & Form:** React Hook Form + Yup Validation (Kiểm tra dữ liệu khắt khe phía client).
- **Giao diện & Hiệu ứng:** Vanilla CSS, `framer-motion` (cho animation) & `Lucide React` (Icon).
- **Bản đồ:** Tích hợp OpenStreetMap với `react-leaflet`.
- **Đa ngữ:** `i18next` hỗ trợ hệ thống linh hoạt English/Vietnamese.
- **Lưu trữ tĩnh:** Firebase Storage kết hợp xử lý ảnh.

---

## III. CHI TIẾT CÁC MODULE CHỨC NĂNG CHÍNH
Dự án được chia thành 5 phân hệ (module) lõi:

### 1. Hệ thống Xác Thực & Phân Quyền (Security & Auth)
Đây là lõi bảo mật cốt thép của toàn bộ nền tảng:
- **Stateless Auth với JWT:** Sử dụng JwtAuthenticationFilter để cấp phát và uỷ quyền Token.
- **SSO (Single Sign-On):** Hỗ trợ tính năng Đăng nhập qua Google (OAuth2).
- **Phân quyền Backend (Role-based):** Sử dụng `@PreAuthorize("hasRole('ADMIN')")` ở mức API-level, chỉ định rõ những ai có quyền CRUD thực đơn, nguyên liệu (`ProductController`, `CategoryService`).
- **Bảo Vệ Luồng Frontend (Route Guard):** Component `ProtectedRoute` tự động kiểm tra tính hợp lệ của Token qua `AuthContext` trước khi cho phép vào các trang như `/profile`, `/healthy-plan`, `/ai-assistant`... Nếu vi phạm sẽ bị reject về cổng `/login`.

### 2. Trợ Lý AI & Thị Giác Máy Tính (Vision)
- **AI Assistant (`AIAssistant.jsx`):** Bot trò chuyện trực tuyến, tiếp nhận yêu cầu và gợi ý món ăn, tư vấn công thức.
- **Computer Vision (`CameraCapture.jsx`):** Người dùng có thể quét các nguyên liệu hiện có trong tủ lạnh bằng Camera, hệ thống sẽ nhận diện sinh ảnh và đề xuất công thức phù hợp ngay lập tức.

### 3. Phân Hệ Dinh Dưỡng (Healthy Plan)
- **Cá nhân hoá (Onboarding):** Tính toán chỉ số BMI, nhận diện người dùng đang muốn Tăng cân, Giảm cân hay Giữ dáng.
- **Dashboard Tracking:** Lên kế hoạch Eat-Clean theo tuần (`HealthyPlanDashboard`), theo dõi "Streak" độ thiết thực của việc ăn uống đều đặn.

### 4. Dữ liệu Công Thức & Bản Đồ Địa Điểm
- **Tra cứu:** Hệ thống lọc (Filter/Search) tìm kiếm công thức tiên tiến.
- **Map:** Tích hợp `react-leaflet`, gợi ý các nhà hàng, cửa hàng thực phẩm tốt dành cho lộ trình ăn uống.

### 5. Hệ thống Cộng đồng (Social)
- **Tương tác thời gian thực:** Trang `Community.jsx` hoạt động như một Forum siêu nhỏ, dùng **Websocket/StompJS** để tự động "đẩy" (push) comment/post mới xuống tất cả các user đang online mà không cần tải lại trang.

---

## IV. ĐIỂM NHẤN KỸ THUẬT (DÀNH CHO HỘI ĐỒNG BẢO VỆ)
*Phần này dùng để show-off các kiến thức khó mà bạn đã chinh phục trong dự án:*
1. **Quản lý đa luồng & Realtime (Websocket):** Việc tích hợp SockJS/Stomp với Spring Boot Websocket xử lý mượt mà luồng dữ liệu cộng đồng.
2. **Kiểm soát luồng Stateless Auth bảo mật cao:** Dùng JWT chặn bắt request tại Axios Interceptor phía Frontend và Filter phía Backend, vá triệt để lỗ hổng Rò rỉ quyền (Role Permission Leakage).
3. **Tích hợp Model AI / Computer Vision:** Không chỉ là form nhập liệu đơn thuần, việc đưa tính năng scan nguyên liệu đồ ăn bằng thiết bị Camera làm tăng giá trị ứng dụng thực tiễn của phần mềm.
4. **Kiến trúc Clean Code & Scalable:** Tổ chức project bài bản (DTO, Service Layer phân tách ở Backend) + Kiến trúc Component hóa chặt chẽ (Context/Protected Route) ở React Frontend.

---

## V. ĐỊNH HƯỚNG PHÁT TRIỂN TƯƠNG LAI
- Phân tích độ sâu dữ liệu: Gọi API ChatGPT/Gemini để làm phong phú thêm phản hồi của AI Assistant.
- Hệ thống Recommendation System: Đề xuất công thức dựa trên thói quen lịch sử User (Collaborative Filtering).
- Đẩy mạnh khả năng mở rộng E-commerce: Bán những Box nguyên liệu (Meal Kit) cấu hình sẵn theo công thức.

---
**Chúc bạn tự tin và hoàn thành xuất sắc buổi bảo vệ!**
