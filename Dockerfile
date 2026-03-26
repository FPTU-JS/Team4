# Build stage (Giai đoạn xây dựng mã nguồn)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY Backend_FPT/pom.xml .
COPY Backend_FPT/src ./src
RUN mvn clean package -DskipTests

# Run stage (Giai đoạn khởi chạy ứng dụng)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]