# OneBaranggay

A simple desktop application for managing barangay resident information, voter eligibility, and certificate generation.

## Features

- **Dashboard** — overview statistics of residents
- **Residents** — add, edit, and delete resident records including voter eligibility
- **Certificates** — generate Barangay Indigency certificates automatically from resident input

---

## Tech Stack

### Frontend
- React + TypeScript + Vite

### Backend
- Spring Boot (Java)
- Spring Data JPA
- REST API

### Development Database
- MySQL (used during development)

### Desktop Application (Installer Build)
- Electron
- Bundled JRE (Java Runtime Environment)
- H2 Database (embedded / offline mode)

---

## Architecture Overview

This project supports two environments:

### Development Mode
- Backend connects to MySQL
- Used for full development and testing

### Desktop Installer Mode
- Runs fully offline
- Uses bundled JRE
- Uses H2 embedded database
- No external server required

---

## Folder Structure

```
OneBaranggay/
├── client/
│   ├── electron/
│   │   └── main.cjs
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Navbar.tsx
│   │   ├── pages/
│   │   │   ├── Certificates.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Residents.tsx
│   │   ├── services/
│   │   │   ├── CertificateService.ts
│   │   │   └── ResidentService.ts
│   │   ├── styles/
│   │   │   ├── certificates.css
│   │   │   ├── dashboard.css
│   │   │   ├── modal.css
│   │   │   ├── navbar.css
│   │   │   └── residents.css
│   │   ├── types/
│   │   │   ├── CertificateType.ts
│   │   │   └── ResidentType.ts
│   │   ├── utils/
│   │   │   ├── DownloadFile.ts
│   │   │   └── Modal.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig-app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── server/
├── src/
│   └── main/
│       ├── java/com/onebarangay/
│       │   ├── controller/
│       │   │   ├── CertificateController.java
│       │   │   └── ResidentController.java
│       │   ├── dto/
│       │   │   ├── CertificateRequest.java
│       │   │   └── ResidentRequest.java
│       │   ├── model/
│       │   │   ├── Certificate.java
│       │   │   └── Resident.java
│       │   ├── repository/
│       │   │   ├── CertificateRepository.java
│       │   │   └── ResidentRepository.java
│       │   ├── service/
│       │   │   ├── CertificateService.java
│       │   │   └── ResidentService.java
│       │   └── OneBarangay.java
│       └── resources/
│           ├── templates/
│           │   └── brgy_indigency.docx
│           └── application.properties
└── pom.xml
```


---

## Requirements

- Node.js 18+
- Java 17+ (development only; bundled in installer)

---

## Development Setup

### Backend
```bash
cd server

mvn spring-boot:run
```

### Frontend
```bash
cd client

npm install

npm run dev
```

## Author

Adrian Quillain
