## Distributed OS Project - Library Store Backend with Microservices

Welcome to the Distributed OS project repository for the Library Store Backend! This project leverages microservices architecture to provide a scalable and efficient solution for managing library store operations. With a front-end microservice handling user interactions and API requests, along with separate microservices for managing logging and the library database, this project ensures modularity and flexibility. Each microservice is isolated within its own Docker container, managed and orchestrated using Docker Compose.

## Microservices Overview

### Frontend Microservice
- **Responsibility**: Handles user interactions and API requests.
- **Functionality**: Manages user authentication, interacts with the backend microservices, and serves as the interface for accessing library store functionalities.
- **Technology**: Utilizes Nodejs backend with Docker.

### Library Database Microservice
- **Responsibility**: Manages the library store database.
- **Functionality**: Stores and retrieves data related to books, users, transactions, and other library store entities.
- **Technology**: Utilizes a database management system suitable for microservices architecture, such as MongoDB or PostgreSQL.

## Features
- **Scalability**: Each microservice can be scaled independently based on demand, ensuring optimal resource utilization.
- **Flexibility**: Microservices architecture allows for easy addition, removal, or modification of functionalities without impacting
