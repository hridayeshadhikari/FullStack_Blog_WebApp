FROM eclipse-temurin:17-jdk-jammy as builder

# Set working directory
WORKDIR /app

# Copy the build files
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .
COPY src/ src/

# Build the JAR
RUN ./mvnw clean package -DskipTests

# Use a smaller runtime image
FROM eclipse-temurin:17-jre-jammy

# Set working directory
WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port (default for Spring Boot is 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]