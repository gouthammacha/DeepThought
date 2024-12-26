# Task - 1

# API Creation and performing CRUD Operations
# These files are for the challenge provided by Deep Thought as a test.

Available Scripts
In the project directory, you can run:

 'npm start'

Runs the app in development mode.

Open http://localhost:3000 to view it in the browser.

You can test these APIs directly on Postman: Postman Collection Link.

# API Endpoints

1. Create a New Event
Endpoint: /api/v3/app/events
Method: POST
Description: Creates a new event.

2. Get Event by ID
Endpoint: /api/v3/app/events?id=<event_id>
Method: GET
Description: Retrieves an event based on its unique ID.

3. Update an Event
Endpoint: /api/v3/app/events/<event_id>
Method: PUT
Description: Updates an event based on its ID.
Example JSON Body: Use the same format as in creating a new event.

4. Delete an Event
Endpoint: /api/v3/app/events/<event_id>
Method: DELETE
Description: Deletes an event based on its ID.

### API
 Sample Examples:

 `POST`  http://localhost:3000/api/v3/app/events 
        >Run the above url in the postman by using POST method followed by entering json data in the body
        
        Example:
        Enter the below json data in the body to store by id
        
    {
    "name": "Event Name",
    "tagline": "Event Tagline",
    "schedule": "2024-12-25T10:00:00.000Z",
    "description": "Event Description",
    "moderator": "Moderator Name",
    "category": "Event Category",
    "sub_category": "Event Subcategory",
    "rigor_rank": 5,
    "attendees": [],
    "image": "image.jp"
    }

    Note: Already the above json data is stored in my DB(Try changing the values)

 `GET`  http://localhost:3000/api/v3/app/events?id= **event_id** \
 
        Example:
        CheckOut this link to see the above stored data by id: 
        Link: http://localhost:3000/api/v3/app/events?id=676d0a3a1d924a837e8edbfc

 `PUT`  http://localhost:3000/api/v3/app/events/ **:id** \
 
        Example:
        CheckOut this link to Update the stored data by id:
        Link: http://localhost:3000/api/v3/app/events/676d0a3a1d924a837e8edbfc
        Enter the below updated json data in the body to update by id:

    {
    "name": "Updated Event",
    "tagline": "New Tagline",
    "schedule": "2024-12-26T10:00:00.000Z",
    "description": "Updated Event Description",
    "moderator": "New Moderator",
    "category": "Updated Category",
    "sub_category": "Updated Subcategory",
    "rigor_rank": 6,
    "attendees": [],
    "image": "updated_image.jpg"
    }

  
 `DEL`  http://localhost:3000/api/v3/app/events/ **:id** 
 
        Example:
        CheckOut this link to Delete the event by id:
        Link: http://localhost:3000/api/v3/app/events/676d0a3a1d924a837e8edbfc
        
Note: The provided examples are tried locally they may not work for you.

# How to Run

Clone this repository:

git clone https://github.com/your-username/your-repository.git

Navigate to the project directory:

cd your-repository

Install all the necessary dependencies

Then run the index.js file using nodejs (node index.js)

# Task - 2

API Documentation GoogleDrive link : [https://drive.google.com/file/d/15sqFZYvTnIJ1GzSdQ8XG3-h3NC__plcY/view?usp=drive_link]
