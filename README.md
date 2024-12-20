 

# Insurance Admin Website

## Instructions for Running the Server on Your Local Machine

### Steps to Follow:

#### Step 1: Clone the Repository
Use the provided GitHub link to clone the repository onto your local machine.

```bash
git clone <repository-link>
```

#### Step 2: Install Dependencies
Navigate to the project directory and install the required dependencies by running the following command in your terminal:

```bash
npm install
```

#### Step 3: Start the Server
After installing the dependencies, start the server with this command:

```bash
npm start
```

#### Step 4: Log in to the Application
Once the server is running, it will open the login page in your browser. Use the following credentials to log in:

- **Username**: `user90`
- **Password**: `port90pw`

---

## Tech Stack Used

The application is built using the following technologies:

- **Frontend**: React.js (Frontend Framework)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Backend**: Spring Boot

---

## Application Overview

This application serves as an **Admin Portal for an Insurance Company (Fintech)**. It offers user-customized access based on login credentials, enabling the admin to manage and monitor insurance-related data efficiently.

### Key Features:
1. **Policy Management:**
   - View details of:
     - Policies Sold
     - Active Policies
     - Inactive Policies
     - Cancelled Policies
     - Expired Policies
     - Renewed Policies
   - Manage:
     - Policy Numbers
     - Policy Types
     - Expiry Dates

2. **User Management:**
   - View user details (e.g., Name, Policy Type, Expiry Date)
   - Add or edit user profiles (Admin, User, etc.)

3. **Claim Management:**
   - View claim data (e.g., Claim Number, Claim Type, Expiry Date)
   - Manage claim entries

4. **Report Generation:**
   - Generate reports (Yearly, Monthly, Daily)

5. **Dashboard Insights:**
   - Summary of Policies, Claims, and Leads with filters and timeline-based data
   - Options to edit, delete, or add new entries

6. **Settings:**
   - Add users and admins
   - Configure global settings
   - Add clients

---

## Application Pages

### **Dashboard/Homepage**
- Displays an overview of:
  - Policies Sold
  - Upcoming Renewals
  - Active Policies
  - Claims and Leads
- Includes filters for summarizing policies over time.
- Allows editing, deleting, or adding new data entries.

### **Other Pages**
- **Leads Management**: Manage insurance leads.
- **Renewals**: Track and handle policy renewals.
- **Claims**: View and manage claims.
- **Reports**: Generate detailed reports.
- **Data Entry**:
  - Leads Entry
  - Policy Entry
  - Claims Entry

### **Settings Page**
- Manage application settings:
  - Add new users and list existing admins.
  - Add new clients.
  - Configure global application settings.

---

## About the Application
This end-to-end working admin portal simplifies insurance company operations, enabling seamless management of policies, claims, users, and reports, ensuring a hassle-free experience for administrators.

 