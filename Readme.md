# 🏠 Adoption Status Pet Service - Shaggy Mission

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
</div>

<div align="center">
  <h3>📋 Pet Adoption Status Management Microservice</h3>
  <p><em>Part of the Shaggy Mission ecosystem - Track adoption progress and manage pet availability! 🐕🐱</em></p>
</div>

---

## 🌟 Overview

The **Adoption Status Service** is a critical microservice in the Shaggy Mission platform that manages the adoption workflow and status tracking for pets. This service enables rescue organizations, adoption centers, and volunteers to efficiently track the adoption progress of pets, from initial arrival to successful placement in forever homes.

## 🎯 What This Service Does

- **Adoption Status Tracking**: Create and manage adoption status records for pets
- **Workflow Management**: Track pets through the adoption process (not_adopted → reserved → adopted)
- **Data Integrity**: Prevent duplicate status records with unique constraints
- **Status Validation**: Enforce valid status states with enum validation
- **Notes Management**: Add contextual information and adoption history
- **Timestamp Tracking**: Automatic timestamp management for status updates
- **Administrative Control**: Provide adoption workflow oversight for rescue organizations

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Data Validation**: Mongoose schema validation with enum constraints
- **Unique Constraints**: Prevent duplicate status records per pet
- **RESTful Design**: Clean POST endpoint for status creation
- **Documentation**: Swagger UI for interactive API documentation
- **Error Handling**: Comprehensive validation and error management

## 📡 API Endpoints

### Adoption Status Creation
**`POST /adoption/status`**
- Creates a new adoption status record for a pet
- Enforces unique constraint (one status per pet)
- Validates status enum values
- Supports optional notes for additional context

**Request Body:**
```json
{
  "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
  "status": "not_adopted",
  "notes": "Healthy golden retriever ready for adoption"
}
```

**Successful Response (201):**
```json
{
  "_id": "64f8b2a1c3d4e5f6a7b8c9d4",
  "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
  "status": "not_adopted",
  "notes": "Healthy golden retriever ready for adoption",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

**Error Responses:**
- `400 Bad Request`: Status already exists or invalid data
  ```json
  {
    "message": "Status for this pet already exists."
  }
  ```
- `500 Internal Server Error`: Database or server issues
  ```json
  {
    "message": "Failed to create status",
    "error": "Database connection failed"
  }
  ```

### API Documentation
**`GET /adoptionStatus-docs`**
- Interactive Swagger UI documentation
- Complete API specification with examples
- Request/response schemas and validation rules
- Try-it-out functionality for testing the status endpoint

## 🔧 Core Functionality

### Status Management System
The service implements three distinct adoption statuses:

- **`not_adopted`**: Pet is available for adoption (default status)
- **`reserved`**: Pet is reserved by a potential adopter
- **`adopted`**: Pet has been successfully adopted

### Data Integrity Features
- **Unique Constraint**: Each pet can only have one status record
- **Status Validation**: Enum validation ensures only valid status values
- **Required Fields**: Enforces petId and status as mandatory fields
- **Automatic Timestamps**: Tracks when status records are created/updated

### Workflow Support
- **Adoption Tracking**: Monitor pets through the adoption process
- **Status History**: Notes field provides context and history
- **Administrative Oversight**: Track adoption progress across the organization
- **Integration Ready**: Designed to work with other Shaggy Mission services

## 🌐 Service Integration

This microservice integrates seamlessly with other Shaggy Mission platform components:

- **Pet Registration Service**: Link status records to registered pets
- **Pet List Service**: Filter pets by adoption status
- **Adoption Management**: Track adoption workflows and progress
- **Administrative Dashboard**: Provide adoption analytics and reporting
- **Notification System**: Trigger alerts for status changes

## 🔒 Data Security & Validation

- **Schema Validation**: Mongoose schema ensures data integrity
- **Unique Constraints**: Prevent duplicate status records per pet
- **Enum Validation**: Restrict status values to valid options
- **Error Handling**: Comprehensive validation and error management
- **Data Consistency**: Maintain consistent adoption workflow states
- **Input Sanitization**: Validate and sanitize all input data

## 🗃️ Database Schema

### AdoptionStatus Document Structure
```javascript
{
  _id: ObjectId,                    // MongoDB unique identifier
  petId: String (required, unique), // Pet's unique identifier
  status: String (enum: [           // Current adoption status
    'not_adopted',                  // Available for adoption
    'reserved',                     // Reserved by adopter
    'adopted'                       // Successfully adopted
  ], default: 'not_adopted'),
  notes: String (optional),         // Additional context/notes
  updatedAt: Date (auto-generated) // Last update timestamp
}
```

### Status Workflow
```
not_adopted → reserved → adopted
     ↑           ↑          ↑
  Pet arrives  Reserved   Final
  at shelter  by adopter  adoption
```

## 📚 API Documentation

Complete API documentation is available through Swagger UI at `/adoptionStatus-docs` when the service is running. The documentation includes:

- **Interactive endpoint testing** with status creation examples
- **Comprehensive request/response schemas** with validation rules
- **Status enum documentation** with workflow explanations
- **Error handling scenarios** and status codes
- **Data integrity constraints** and validation requirements
- **Integration examples** and common use cases

## 🔧 Development

### Project Structure
```
├── config/
│   └── db.js                         # MongoDB connection setup
├── controllers/
│   └── status.controller.js          # Status management logic
├── models/
│   └── status.model.js               # Mongoose AdoptionStatus schema
├── routes/
│   └── status.routes.js              # API route definitions
├── docs/
│   └── swagger.yaml                  # OpenAPI specification
├── app.js                            # Express application setup
└── server.js                         # Server startup and configuration
```

### Environment Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Server runs on port 3012
```

### Testing the API
```bash
# Create adoption status
curl -X POST http://localhost:3012/adoption/status \
  -H "Content-Type: application/json" \
  -d '{
    "petId": "64f8b2a1c3d4e5f6a7b8c9d0",
    "status": "not_adopted",
    "notes": "Healthy golden retriever ready for adoption"
  }'

# Expected response: 201 Created with status object
```

## 🔄 Adoption Workflows

### New Pet Arrival Process
1. **Pet Registration**: Pet is registered in the system
2. **Status Creation**: Create "not_adopted" status record
3. **Health Assessment**: Add health notes and assessment details
4. **Availability**: Pet becomes available for adoption browsing

### Adoption Process Management
1. **Available Status**: Pet listed as "not_adopted"
2. **Interest Shown**: Status updated to "reserved" when adopter shows interest
3. **Application Review**: Notes track application and review process
4. **Finalization**: Status updated to "adopted" when adoption is complete

### Administrative Oversight
- **Status Reports**: Track adoption progress across all pets
- **Workflow Monitoring**: Identify bottlenecks in adoption process
- **Success Metrics**: Monitor adoption success rates and timelines
- **Data Analytics**: Generate reports on adoption patterns and outcomes

## ⚡ Performance Considerations

### Database Optimization
- **Unique Index**: petId field indexed for efficient uniqueness checks
- **Enum Validation**: Database-level validation for status values
- **Minimal Schema**: Optimized schema for fast read/write operations
- **Connection Pooling**: Efficient MongoDB connection management

### Data Integrity
- **Unique Constraints**: Prevent duplicate status records
- **Validation Rules**: Comprehensive input validation
- **Error Recovery**: Robust error handling for edge cases
- **Transaction Support**: Ready for transaction-based operations

## 🚀 Future Enhancements

- **Status History**: Track status change history with timestamps
- **Batch Operations**: Support bulk status updates
- **Status Notifications**: Real-time alerts for status changes
- **Advanced Querying**: Filter and search by status criteria
- **Integration APIs**: Enhanced integration with external systems
- **Analytics Dashboard**: Visual adoption workflow analytics
- **Status Automation**: Automated status transitions based on triggers
- **Audit Logging**: Comprehensive audit trail for status changes

## 📊 Common Use Cases

### Rescue Organization Management
- **Intake Process**: Set new arrivals to "not_adopted" status
- **Adoption Tracking**: Monitor pets through adoption workflow
- **Administrative Reports**: Generate adoption success reports
- **Volunteer Coordination**: Track pets needing attention

### Adopter Experience
- **Availability Filtering**: Show only available pets
- **Reservation System**: Track reserved pets during application process
- **Adoption Confirmation**: Update status when adoption is finalized
- **Follow-up**: Maintain adoption records for follow-up care

### Integration Scenarios
- **Pet Listing**: Filter pet lists by adoption status
- **Notification System**: Trigger alerts for status changes
- **Analytics Platform**: Provide data for adoption metrics
- **Mobile Applications**: Support mobile adoption workflows

---

<div align="center">
  <p><strong>Built with ❤️ for street dogs and cats everywhere 🐕🐱</strong></p>
  <p><em>Helping every pet find their perfect forever home!</em></p>
  <p>📖 <a href="/adoptionStatus-docs">View API Documentation</a></p>
</div>