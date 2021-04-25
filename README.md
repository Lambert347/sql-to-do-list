# Project Name: To Do list app



## Description

The starting point for this project was creating a google doc in which I walked through the process of creating this app. I did some preliminary thinking about how I wanted to app to look and how the logic would flow. I attempted to organize it in order of when each step would be completed but there was a fair bit of bouncing around as issues and ideas popped up in the creation process. 

Speaking fo the creation process, the first actual programming started with setting up the folders in the main project folder and the server by installing node, express, and pg. I then moved to the server.js file and set up express and for the server to hook into a yet to exist pool.js file (for accessing the database) and tasks.router.js (where all the request functions for the server will be stored). I created the files for those modules but left them empty for the time being. 

Once the skeleton of the server was formed, I pivoted to Postico to create the database and table of tasks. Once the table was tested and was working, I copy-pasted the query into a database.sql file in the project folder for those who access this source code later. 

The last bit of pre-work required setting up and detailing the index.html file. I added a header for the app, two input fields for the name of the task and a short description, and a submit button. Lastly, I added a div to be filled in with data from the database later through the client.js functions. I circled back to the pool.js file to config it to access the database of tasks.

Regarding functions, it makes the most sense for me logically to start with the server-side requests since it allows for me to define the urls that I will use later and reduce the amount of complications with 404 errors. I created the put, post, get, and delete functions in the router file and then moved on to the client. 

In the client, I created the complimentary get, post, put, and delete functions alongside the handlers for the button clicks. Before moving on to any additional logic and styling, I tested to make sure that all 4 requests to the server were working and made any fixes as necessary. There were not many issues on this front so I moved on to the additional styling that was required in the instructions for the put function to mark a task as complete. 

This is where I encountered by far my biggest problem. Changing the color of the task after it was marked as complete in the database was far harder than I anticipated. I used logic from a previous project to add a css class to change the background color of the task when the button was clicked. This kind of worked. It changed the color but only briefly. I added a piece of code to the render function for the tasks that would check if the isComplete in the tasks table was true at each iteration of the loop and add the new color css class. This worked so I moved on to the more heavy styling. 

However this issue came back to haunt me as I worked on the styling. The default background color for the taskCard element started overriding that new class color. Through some sick google searching I found an attribute called !important that allowed me to override the default color with the new color. But now when one button was clicked on one task, all present tasks changed color even if their isComplete was still false. Adding a .last() before the addClass in the complete handler fixed this problem by only changing the current element. I went back to the tasks.router.js file to order the table by ID so that the tasks were not getting shifted around when the complete button was clicked. 

With that nightmare behind me, I did some more minor styling including changing the button icons and spending way too much time on the color palette before considering the app to be both functional and visually pleasing. 

## Usage
The program is fairly straightforward. The user enters a task name and a short (under 250 character) description for each task. Then the user clicks the submit button that looks like an archive button to submit the task to the database. The task and any other tasks are displayed to the DOM. The trashcan icon deletes the task and the checklist icon marks it as completed, changing the color to grey and adding some opacity to the card and the complete button.

The information is cleanly displayed on the DOM and is easy to read.


## Built With Javascript, jQuery, CSS, and HTML 

## Thanks to Prime Digital Academy for the instruction and knowledge to create this application 

## Support 
Email lambe347@umn.edu for any suggestions or problems. 
