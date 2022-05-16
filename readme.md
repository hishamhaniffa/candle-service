# App - candle serice

# Server
Writted in nodejs with express for API out. Using redis for cache and websocket client to read stream data

# Client
Its a CRA app which connects to the exposed API for UI interface


# To setup the project

 - Clone the repo to your local machine
 - run `compose up -d` (-d to run as demon)
 - Once all the services starts going to `http://localhost` should load the frontend app
 - The backend API is accessible via port `8000`
 