# Web + driver + admin tracking application 

![image](https://github.com/user-attachments/assets/3ca6af55-a398-4d71-b334-e7607bbaa87b)
![image](https://github.com/user-attachments/assets/d1681032-8778-488e-a54b-26c9931d6476)
![image](https://github.com/user-attachments/assets/97c1856f-9871-4cd5-966a-374ada733ef7)
![image](https://github.com/user-attachments/assets/c98f1c02-3c08-4318-8142-88bedfb82b2d)



# Web Tracker

## Overview

The Web Tracker application allows users to track their packages by entering a package ID. The application leverages REST APIs to fetch package details and delivery status. If a package has an active delivery, the app establishes a WebSocket connection to listen for real-time updates on the delivery. It also displays the package and delivery details and updates the map with the package's source, destination, and current delivery location.

## Features

- **Enter Package ID**: Users can input a package ID to track the status of their package.
- **Track Package**: The application fetches the package details from the REST API.
- **Fetch Delivery Details**: If the package has an active delivery, the application fetches the delivery details.
- **WebSocket Integration**: Establishes a WebSocket connection to receive real-time delivery update events.
- **Map Display**: Updates the map with:
  - **Package Source Location**: The location where the package was sent from.
  - **Package Destination**: The final destination of the package.
  - **Current Delivery Location**: The real-time location of the delivery if available.

## API Endpoints

### Package API

- `GET /api/package/:id`: Retrieve package details by its ID.

### Delivery API

- `GET /api/delivery/:id`: Retrieve delivery details by its ID.
- `PUT /api/delivery/:id`: Update the status of the delivery.

## Components

### WebTracker Component

The main component for tracking packages. It includes:
- An input field to enter the package ID.
- A button to submit the tracking request.
- Displays package details.
- Fetches and displays delivery details if available.
- Updates the map with the package's source, destination, and current delivery location.

### MapProvider Component

Handles the rendering of the map using `react-map-gl` and updates the map view based on:
- **From Location**: The sender's location.
- **To Location**: The recipient's location.
- **Current Location**: The current location of the package if available.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>

