# Entity Relationship Diagram - Ecommerce Project

## Database Schema Overview

This document describes the entity relationships in the ecommerce Laravel application.

## Entities and Relationships

### 1. Users Table
- **Primary Key**: id
- **Fields**: 
  - id (bigint, auto-increment)
  - name (string)
  - email (string, unique)
  - email_verified_at (timestamp, nullable)
  - password (string)
  - remember_token (string, nullable)
  - created_at, updated_at (timestamps)

### 2. Products Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - title (string, 2000)
  - slug (string, 2000)
  - image (string, 2000, nullable)
  - image_mime (string, nullable)
  - image_size (integer, nullable)
  - description (longtext, nullable)
  - price (decimal 10,2)
  - created_by (foreign key → users.id, nullable)
  - updated_by (foreign key → users.id, nullable)
  - deleted_by (foreign key → users.id, nullable)
  - deleted_at (timestamp, nullable - soft deletes)
  - created_at, updated_at (timestamps)

### 3. Cart Items Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - user_id (foreign key → users.id)
  - product_id (foreign key → products.id)
  - quantity (integer)
  - created_at, updated_at (timestamps)

### 4. Orders Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - total_price (decimal 20,2)
  - status (string, 45)
  - created_by (foreign key → users.id, nullable)
  - updated_by (foreign key → users.id, nullable)
  - created_at, updated_at (timestamps)

### 5. Order Details Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - first_name (string)
  - last_name (string)
  - phone (string, nullable)
  - address1 (string, 255)
  - address2 (string, 255)
  - city (string, 255)
  - state (string, 45, nullable)
  - zipcode (string, 45)
  - country_code (string, 3)
  - created_at, updated_at (timestamps)

### 6. Order Items Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - order_id (foreign key → orders.id)
  - product_id (foreign key → products.id)
  - quantity (integer)
  - unit_price (decimal)
  - created_at, updated_at (timestamps)

### 7. Payments Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - order_id (foreign key → orders.id)
  - amount (decimal 10,2)
  - status (string, 45)
  - type (string, 45)
  - created_by (foreign key → users.id, nullable)
  - updated_by (foreign key → users.id, nullable)
  - created_at, updated_at (timestamps)

### 8. Customers Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - first_name (string)
  - last_name (string)
  - phone (string, nullable)
  - status (string, 45, nullable)
  - created_by (foreign key → users.id, nullable)
  - updated_by (foreign key → users.id, nullable)
  - created_at, updated_at (timestamps)

### 9. Customer Addresses Table
- **Primary Key**: id
- **Fields**:
  - id (bigint, auto-increment)
  - type (string, 45)
  - address1 (string, 255)
  - address2 (string, 255)
  - city (string, 255)
  - state (string, 45, nullable)
  - zipcode (string, 45)
  - customer_id (foreign key → customers.id)
  - country_code (foreign key → countries.code)
  - created_at, updated_at (timestamps)

### 10. Countries Table
- **Primary Key**: code (string, 3)
- **Fields**:
  - code (string, 3, primary key)
  - name (string, 255)
  - states (jsonb, nullable)

## Relationships

### One-to-Many Relationships:

1. **Users → Products** (created_by, updated_by, deleted_by)
   - One user can create/update/delete many products

2. **Users → Cart Items**
   - One user can have many cart items

3. **Products → Cart Items**
   - One product can be in many cart items

4. **Users → Orders** (created_by, updated_by)
   - One user can create/update many orders

5. **Orders → Order Items**
   - One order can contain many order items

6. **Products → Order Items**
   - One product can be in many order items

7. **Orders → Payments**
   - One order can have many payments

8. **Users → Payments** (created_by, updated_by)
   - One user can create/update many payments

9. **Users → Customers** (created_by, updated_by)
   - One user can create/update many customers

10. **Customers → Customer Addresses**
    - One customer can have many addresses

11. **Countries → Customer Addresses**
    - One country can be referenced by many customer addresses

### Missing Relationships (Potential Issues):
- Orders table doesn't have a direct relationship to Customers
- Order Details table is isolated (no foreign keys to Orders)
- Sessions table has user_id but no explicit foreign key constraint

## Text-Based ERD

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     USERS       │       │    PRODUCTS     │       │   CART_ITEMS    │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──────┤ created_by (FK) │       │ id (PK)         │
│ name            │       │ updated_by (FK) │       │ user_id (FK)    │◄──┐
│ email           │       │ deleted_by (FK) │       │ product_id (FK) │   │
│ password        │       │ id (PK)         │◄──────┤ quantity        │   │
│ ...             │       │ title           │       │ ...             │   │
└─────────────────┘       │ price           │       └─────────────────┘   │
                          │ ...             │                             │
                          └─────────────────┘                             │
                                                                          │
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐   │
│     ORDERS      │       │   ORDER_ITEMS   │       │    PAYMENTS     │   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤   │
│ id (PK)         │◄──────┤ order_id (FK)   │       │ id (PK)         │   │
│ total_price     │       │ product_id (FK) │       │ order_id (FK)   │───┘
│ status          │       │ quantity        │       │ amount          │
│ created_by (FK) │───────┤ unit_price      │       │ status          │
│ updated_by (FK) │       │ ...             │       │ type            │
│ ...             │       └─────────────────┘       │ created_by (FK) │──────┐
└─────────────────┘                                 │ updated_by (FK) │      │
                                                    │ ...             │      │
                                                    └─────────────────┘      │
                                                                             │
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐      │
│   CUSTOMERS     │       │CUSTOMER_ADDRESS │       │   COUNTRIES     │      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤      │
│ id (PK)         │◄──────┤ customer_id(FK) │       │ code (PK)       │◄─────┤
│ first_name      │       │ type            │       │ name            │      │
│ last_name       │       │ address1        │       │ states          │      │
│ phone           │       │ address2        │       └─────────────────┘      │
│ status          │       │ city            │                                │
│ created_by (FK) │───────┤ state           │                                │
│ updated_by (FK) │       │ zipcode         │                                │
│ ...             │       │ country_code(FK)│────────────────────────────────┘
└─────────────────┘       │ ...             │
                          └─────────────────┘

┌─────────────────┐
│  ORDER_DETAILS  │  ← Isolated table (no FK relationships)
├─────────────────┤
│ id (PK)         │
│ first_name      │
│ last_name       │
│ phone           │
│ address1        │
│ address2        │
│ city            │
│ state           │
│ zipcode         │
│ country_code    │
│ ...             │
└─────────────────┘
```

## Notes:
- PK = Primary Key
- FK = Foreign Key
- Lines with arrows show foreign key relationships
- The ORDER_DETAILS table appears to be isolated with no foreign key relationships
- Consider adding relationships between Orders and Customers, and Orders and Order_Details
