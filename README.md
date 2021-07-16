# Hammerhead for Data Tech

Hammerhead for Data Tech is a web application that our team built to provide Data Tech a platform for uploading, sharing, and visualizing data sets in charts. The site can be broken down in to three main functionalities: the ability to view charts, the ability to upload charts (.csvs), and an employee management section for admins to manage access. Security was a big priority for Data Tech, so we implemented a custom-built, cookie-based authentication system.

## Technologies Used
- React
  - React Router
  - Recharts
- SASS
- Express
- Node
- PostgreSQL

## The Team
- Alex Gaillard - [Github](https://github.com/AlexGaillard)
- Kate Darby - [Github](https://github.com/kate-darby)
- Edward Cramer - [Github](https://github.com/EddieCramer)
- Sam Imhoff - [Github](https://github.com/samimhoff)
- Fabrice Defay - [Github](https://github.com/fdefay00)
- Alex Armstrong - [Github](https://github.com/AlexArms)

## Image Gallery
### Log In
Some features to note about the login screen and functionality include:
- Not just anyone can create an account. An admin must create an account for you, adding an extra layer of protection to your data.
- User sessions are cookie and session based.
- If you try and view any page other than the login page without being logged in, you will be redirected to the login page.
![Screen Shot 2021-07-16 at 7 24 35 PM (2)](https://user-images.githubusercontent.com/51707305/126017521-9b5d115a-ca2d-4508-bd68-a9ed7e3c7ada.png)
### Dashboard
- The general dashboard view lets you view recently uploaded data sets. You can sort based on the team (category), owner, and age of the chart.
- If someone has shared a chart with you, you will get a notification in the top left in the notification indicator under the logo.
![Screen Shot 2021-07-16 at 7 24 58 PM 2](https://user-images.githubusercontent.com/51707305/126017550-e56e1580-81d0-4d2a-b5a4-ac56fb780ca0.png)
### Chart Display
- This uses the Rechart library to dynamically render data sets uploaded and stored in the Postgres database.
- You can leave comments, or notes, about a chart for others to see.
![Screen Shot 2021-07-16 at 7 25 12 PM 2](https://user-images.githubusercontent.com/51707305/126017594-f23bd641-9a74-4228-9562-092b4235a258.png)
### Chart Upload
- Here you can title your chart (the name must be unique), upload it and see a preview of it, as well as share it with other users.
![Screen Shot 2021-07-16 at 7 25 31 PM 2](https://user-images.githubusercontent.com/51707305/126017577-51992360-428c-4b80-9fd9-eb12386a01d8.png)
### Employee Management
- This section is only visible to admins, and allows the creation and modification of both teams and employees.
- Even though non-admins should never be able to see this page, there is an extra check behind the scenes in the server for every interaction allowed on this page to make sure the user has admin access before making any changes.
![Screen Shot 2021-07-16 at 7 25 20 PM 2](https://user-images.githubusercontent.com/51707305/126017565-fd4ce792-9e5d-4fb9-9aa0-91440a8a3526.png)




