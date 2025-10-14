# Gardening App

## App Description

GardenTrack is a personal gardening companion that helps you organize, monitor, and improve your garden. Track the progress and health of each plant, set feeding and watering reminders, and access a community of gardeners for tips and troubleshooting advice. Stay on top of your growing season with data, insights, and shared knowledge—all in one place.

##
# User Stories

## As a user
- Want to keep track of which plants Im growing in a season
- Want to rate the plant based on my experience with it
- Want an account to keep my data
- Want to track health of plant
- Want a table like element to easily see all my plants and track daily watering/feeding schedules
- Want feeding/watering reminders
- Want troubleshooting tips for disease/dying plants


## As an admin
- Want to keep track of number of users
- Want to Have controll of Homepage/Community Board with usefull resources, news
- Want to add new plants to the plant collection



##
# Data Shape/Models

## User
- id
- username
- email
- password
- createdAt

## Plant
- id
- name (e.g. “Purple Carrot”)
- wateringFrequency
- feedingFrequency
- sunlightRequirements
- daysToHarvest
- description
- image


## GardenPlant
- id
- userId → references User
- plantId → references Plant
- season (“Spring 2025”)
- datePlanted
- lastWatered
- lastFed


##
# CRUD Routes

## User
- Create: User
- Read: Get all users (Admin)
- Update: User information
- Delete user account

## Plants
- Create new plant
- Read: Get plants by ID
      : Get all plants
- Update: plant by ID
- Delete: Plant by ID

## GardenPlant
- Create: new Garden Plant
- Read: Get GP by id
      : Get all GPs by userID
      : Get all GP's by plantID
- Update: GP by id
- Delete: GP
- Delete: Many: by userID and season





##
# Pages
- Login/Register
- Homepage/Community Board
- DashBoard/Tracking Page
- Plant Search Page





##
# All Stretch Goals

## Model Stretch

### Tips 
- id
- plantId → references Plant
- authorId → references User
- type (“tip”, “troubleshooting”, “general”)
- content
- createdAt
- upVotes
- comments (userId, text, createdAt)

### GP Stretch
- nickname (“Backyard Tomato Bed”) 
- nextWatering 
- nextFeeding
- images
- notes
- health (“healthy”, “diseased”, etc.)
- qualityRating

### Plant Stretch
- soilType
- difficultyRating (average from users)


## Story Stretch

### User Stories Stretch
- Recipes recomendations for different vegetables
- Want to see all data for each 'season' (year)
- Want to see care tips for each plant
- Want to see comments/tips from other users for differnt plants


## Route Stretch 

### Tips (with tips model)
- Create: new Tip
- Read: Get tips by plantType
      : Get tips by autherID
      : Get all tips
- Update: tip by autherID
- Delete: tip by autherID



# To Do:

## Create Routes

### User Routes
- POST register/create user account
- POST login user
- GET Profile info
- DELETE user account (--Stretch--)

### Admin Routes
- GET all user info

### Plant Routes
- POST new plants
- GET all plant information
- GET plant by id/name
- PUT update plant info by id (admin)
- DELETE plant by id (admin)

### UserPlant (GardenPlant)
-POST create new plant in garden
- GET all garden plants by userID
- GET all garden plants by plantID (--stretch--)
- PUT update gp by id
- DELETE gp by id







