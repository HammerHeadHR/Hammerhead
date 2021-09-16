# Hammerhead

<img src="https://user-images.githubusercontent.com/50185022/126042637-f3bae407-ae38-417c-8012-250451cbd294.png" alt="hammerhead logo">

Hammerhead is a web application built to provide a platform for uploading, sharing, and visualizing data sets in chart format. The site is separated into three main functionalities: the ability to view and share charts, the ability to upload data sets (.csv) to be rendered as charts, and an admin section to manage access. The app also makes use of a custom-built, cookie-based authentication system for added security.

## Technologies Used
- [React](https://reactjs.org/)
  - [React Router](https://reactrouter.com/)
  - [Recharts](https://recharts.org/en-US/)
- [SASS](https://sass-lang.com/)
- [Express](http://expressjs.com/)
- [Node](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## The Team
- Alex Gaillard - [Github](https://github.com/AlexGaillard)
- Kate Darby - [Github](https://github.com/kate-darby)
- Edward Cramer - [Github](https://github.com/EddieCramer)
- Sam Imhoff - [Github](https://github.com/samimhoff)
- Fabrice Defay - [Github](https://github.com/fdefay00)
- Alex Armstrong - [Github](https://github.com/AlexArms)

## Image Gallery
### The login screen
- Only admins can create accounts for Hammerhead. This can be done from the admin interface inside the app.
- User session data is secured with a custom-built cookie system.

![Screen Shot 2021-07-16 at 7 24 35 PM (2)](https://user-images.githubusercontent.com/51707305/126017521-9b5d115a-ca2d-4508-bd68-a9ed7e3c7ada.png)
### The Dashboard
- The dashboard view allows the user to view a list of recently uploaded data sets.
- These can be sorted by team, owner, and the upload date of the chart.
- If a chart is shared with a user, they will receive a notification prompt on the notification indicator in the top left of the dashboard.

![Screen Shot 2021-07-16 at 7 24 58 PM 2](https://user-images.githubusercontent.com/51707305/126017550-e56e1580-81d0-4d2a-b5a4-ac56fb780ca0.png)
### Rendering charts
- Hammerhead uses the Rechart library to dynamically render data sets uploaded and stored in a Postgres database.
- Users can also leave notes appended to a chart for others to see.

![Screen Shot 2021-07-16 at 7 25 12 PM 2](https://user-images.githubusercontent.com/51707305/126017594-f23bd641-9a74-4228-9562-092b4235a258.png)
### Uploading charts
- Every chart requires a unique title before it can be submitted.
- Uploading a chart will render a preview of it.
- Charts can be shared with other users by clicking the share button and selecting their name from the list.

![Screen Shot 2021-07-16 at 7 25 31 PM 2](https://user-images.githubusercontent.com/51707305/126017577-51992360-428c-4b80-9fd9-eb12386a01d8.png)
### Managing Access
- This section is only visible to admins, and allows the creation and modification of teams and employees.
- Even though non-admins should never be able to see this page, there is an extra check behind the scenes in the server for every interaction allowed on this page to make sure the user has admin access before making any changes.

![Screen Shot 2021-07-16 at 7 25 20 PM 2](https://user-images.githubusercontent.com/51707305/126017565-fd4ce792-9e5d-4fb9-9aa0-91440a8a3526.png)

### API documentation

![Hammerhead API Doc 1](https://user-images.githubusercontent.com/50185022/126043494-6567a49f-df9b-4cce-8c3f-d7a3b4b09902.jpg)
![Hammerhead API Doc 2](https://user-images.githubusercontent.com/50185022/126043496-5265cafd-dd52-43aa-9c60-3b7ad2b41cd1.jpg)




