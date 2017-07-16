FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 888 available to the world outside this container
EXPOSE 8888

# Run app.py when the container launches
CMD ["node", "app"]