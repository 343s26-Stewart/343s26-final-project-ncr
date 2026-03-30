# **Project Title:** Rate My Meal

**Team Name:** NCT

**Team Members:** Patrick Jabalee-Farrell, Dylan Dela Rosa, Grant Fell

---

## **Purpose**

“Good food is the foundation of genuine happiness.” – Auguste Escoffier

College students make daily decisions about where to eat, yet they often lack reliable, up-to-date information about dining hall quality, wait times, and overall satisfaction. This uncertainty can lead to wasted time, poor dining experiences, and frustration—especially for students on tight schedules or limited meal plans.

The purpose of this application is to create a simple, accessible, and informative platform that improves everyday dining choices. By leveraging community feedback and external data, *Rate My Meal* transforms individual opinions into actionable insights, ultimately enhancing the campus dining experience.

---

## **Users**

*Rate My Meal* is designed primarily for college students who regularly use campus dining services.

### **Background**

The intended audience includes both new and returning students. First-year students may be unfamiliar with campus dining options, while upperclassmen may want updated information about food quality or changing menus. The application is designed to be accessible to all users, including those with disabilities, by following "a11y" accessibility guidelines. This includes screen reader compatibility, proper labeling, and keyboard navigation.

### **Needs**

The intended users of *Rate My Meal* include those with needs such as:

* Quickly viewing dining hall ratings and reviews
* Sharing their own dining experiences
* Comparing options using both peer reviews and external data
* Accessing the app easily on both mobile and desktop devices

By addressing these needs, the application improves decision-making, saves time, and creates a more predictable and enjoyable dining experience.

---

## **Features**

People who use *Rate My Meal* will:

* Search for dining halls and view ratings and reviews
* Create, read, update, and delete (CRUD) reviews with ratings and comments
* Filter reviews by dining hall
* View average ratings for each location
* Fetch and display additional restaurant data using the Yelp Fusion API(maybe a different API)
* Persist review data using browser localStorage
* Export their data as a JSON file and import it later
* Use the application on both desktop and mobile devices due to responsive design

Users can submit a review by selecting a dining hall, assigning a rating (1–5 stars), and writing a short comment. These reviews are saved locally and displayed for others to read.

For example, a student deciding where to eat lunch can open the app on their phone, view highly rated dining halls, and compare them with nearby restaurant data fetched from the API. After choosing a location, they can later return to leave their own review. This demonstrates how the application fulfills its purpose by combining user feedback with external data to support informed decisions.

---

## **Data**

### **Review**

* diningHall: string – name of the dining location
* rating: number – numerical score (1–5)
* comment: string – user feedback
* timestamp: string – date and time of submission
* user: string – identifier for the reviewer

### **DiningHall**

* name: string
* location: string
* averageRating: number
* reviews: array of Review objects

### **User**

* name: String
* reviews: Array of Review objects

All data will be stored in the browser using localStorage, allowing persistence without a backend. The application supports full CRUD operations, enabling users to create, read, update, and delete their reviews.

An example of a review entry might look like:

* diningHall: “East Campus Dining Hall”
* rating: 4
* comment: “Great variety today, but the lines were long.”
* timestamp: “2026-03-30 12:45 PM”
* user: “pjf123”
