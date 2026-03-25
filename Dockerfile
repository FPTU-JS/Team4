# Build stage (Giai đoạn xây dựng mã nguồn)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
# Khác với hướng dẫn gốc, vì project của bạn chia thành 2 thư mục (Frontend và Backend)
# Nên cần trỏ đúng vào thư mục Backend_FPT để copy mã nguồn:
COPY Backend_FPT/pom.xml .
COPY Backend_FPT/src ./src
RUN mvn clean package -DskipTests

# Run stage (Giai đoạn khởi chạy ứng dụng)
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
