# Gardening App

## As a user
- Want to keep track of which plants Im growing in a season
- Want to see care tips for each plant
- Want to rate the plant based on care difficulty, quality of harvest
- Want an account to keep my data
- Want to see comments/tips from other users for differnt plants
- Want to see all data for each 'season' (year)
- Want to track health of plant
- Want a table like element to easily see all my plants and track daily watering/feeding schedules
- Want feeding/watering reminders
- Want troubleshooting tips for disease/dying plants

### Stretch
- Recipes recomendations for different vegetables


## As an admin
- Want to keep track of number of users
- Want to Have controll of Homepage/Community Board with usefull resources, news




# Questions

## What is your app and why?
GardenTrack is a personal gardening tracker for each plant in your garden, to easily see and track progress, feeding/watering schedules and reminders, and community resources. See tips from others on each plant, troubleshooting tips for sick and dying plants.

Enhanced Version:
GardenTrack is a personal gardening companion that helps you organize, monitor, and improve your garden. Track the progress and health of each plant, set feeding and watering reminders, and access a community of gardeners for tips and troubleshooting advice. Stay on top of your growing season with data, insights, and shared knowledge—all in one place.



## What is the shape/model of your data?

## First Option:

### Users
- email
- password
- current crop: []
- createdAt
- seasons: [Season]
- reminders: [Reminder]
- isAdmin


### Season
- userId
- year
- name
- plants: [Plant]
- notes



### Plants
- seasonID
- userId
- plantType
- nicknames
- datePlanted
- growthStage
- health
- difficultyRating
- notes
- images
- wateringFrequency
- lastWaterd
- feedingFrequency
- lastFed

### Reminders ?
- userId
- plantID
- type (watering or feeding)
- frequency
- nextDueDate
- completedDates: [Date]
- active: Boolean



### Comments/Tips
- plantType
- autherId
- tipText
- createdAt
- comments
- diseaseTroubleshooting


# CRUD Routes

## User
- Create: User
- Read: Get all users (Admin)
- Update: User information
- Delete user account

## Season
- Create: new season doc
- Read: Get season by userID of _id
- Update: season info by ID
- Delete: Seasons

## Plants
- Create new plant
- Read: Get plants by userId
      : Get plants by seasonID
      : Get all plants
      : Get plants by plantType
- Update: plant by userID
- Delete: Plant by userID

## Tips
- Create: new Tip
- Read: Get tips by plantType
      : Get tips by autherID
      : Get all tips
- Update: tip by autherID
- Delete: tip by autherID


## Second Option:



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
- sunlight
- soilType
- daysToHarvest
- description
- difficultyRating (average from users)
- image


## GardenPlant
- id
- userId → references User
- plantId → references Plant
- nickname (“Backyard Tomato Bed”) (stretch)
- season (“Spring 2025”)
- datePlanted
- lastWatered
- lastFed
- nextWatering?
- nextFeeding?
- health (“healthy”, “diseased”, etc.)
- qualityRating
- notes
- images?


## Tips (stretch)
- id
- plantId → references Plant
- authorId → references User
- type (“tip”, “troubleshooting”, “general”)
- content
- createdAt
- upVotes
- comments (userId, text, createdAt)


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


## Tips
- Create: new Tip
- Read: Get tips by plantType
      : Get tips by autherID
      : Get all tips
- Update: tip by autherID
- Delete: tip by autherID


## Tips
- id
- plantId → references Plant
- authorId → references User
- type (“tip”, “troubleshooting”, “general”)
- content
- createdAt
- upVotes
- comments (userId, text, createdAt)




# Pages
- Login/Register
- Homepage/Community Board
- DashBoard/Tracking Page
- Plant Search Page