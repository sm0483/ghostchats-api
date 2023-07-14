# Chat API

Chat API is a simple chat application that enables users to send and receive messages in real-time. The app utilizes Socket.io for real-time communication and provides support for multiple chat rooms, allowing users to participate in group conversations.

## Features

- Real-time messaging: Users can send and receive messages instantly using WebSockets.
- Chat rooms: Users can join different chat rooms to engage in group conversations.
- Room IDs: Users can retrieve a list of available room IDs to join.

## Getting Started

Follow the steps below to get started with the Chat API:

### Prerequisites

- Node.js and npm should be installed on your system.

### Installation

1. Clone this repository to your local machine:



2. Navigate to the project directory:



3. Install the dependencies:


### Usage

#### Development Mode

To run the application in development mode, use the following command:


The application will be available at `http://localhost:{PORT}`.

#### Production Build

To build and run the application in production mode, follow these steps:

1. Build the application:


2. Start the application:


The application will be available at `http://localhost:{PORT}`.

#### Running with Docker

To run the application in a Docker container, follow these steps:

1. Build the Docker image:


2. Run the Docker container:


The application will be accessible at `http://localhost:5000`.




