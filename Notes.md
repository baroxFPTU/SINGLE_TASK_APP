# SINGLE TASK APP

Start: September 17, 2021.

Complete:

Git repo

```
https://github.com/baroxFPTU/SINGLE_TASK_APP.git
```

## Ideas

After I've read a book "Design a Prosperous Life" and realized myself is a victim of multitask, then I'm doing this, with an aim that is "Say no with Multitask". Single Task app work with rules:

- Start a day with only 5 important task.
- Complete -> next, not complete -> return.

## Requirements

---

- Add, edit, delete 5 task.

  - #ADD render new task by javascript + async POST to db.

  - How to create time like moment in javascript.

  **Resources:**

  - Handle time: https://www.youtube.com/watch?v=dtKciwk_si4&t=593s&ab_channel=FlorinPop.

- Countdown time during task, have a break like Promodo.

  - start count when user click 'Start'
  - save time to database when click 'Completed'. //PUT
  - save time to localStorage, prevent reload.
  - onload need to check whether localStorage valid or not.
    Use javascript

- Login to save: Date, Completed task,

  - have 2 option: Passport || Firebase

    - Try passport
      - passport is good in server-side.
    - Try login by firebase.

    **Resources**:

    - https://www.youtube.com/watch?v=9kRgVxULbag&ab_channel=Fireship
    - https://firebase.google.com/codelabs/firebase-web#7
    - https://www.youtube.com/watch?v=kX8by4eCyG4&t=84s&ab_channel=MaksimIvanov

- Refresh all in new day. -> cronjob
  - Research about cronjob in nodejs.
  - cronjob excute function.
  - try to cronjob.
- Single task - Single application page.
- No reload page.

  - use history API of javascript.

  **Resources**

  - https://www.youtube.com/watch?v=QvDmu0pe2fU&ab_channel=CodeWithMark

- View what I'v completed in day/ all time.
- add animation

## Technologies

- Backend

  - NodeJS
  - ExpressJS
  - Passport
  - Session
  - Flash
  - moment

- Frontend
  - HTML/ CSS / JavaScript

## CSS

---
```
- sass map
```

### Fonts

- Noto Sans - 400 & 700

### Font Sizes

```
type - PC -  Mobile

title header - 55px - 35px

font input - 30px - 20px

timer - 120px - 65px

name task: 27px - 25px
name task in process - 40px - 25px;

main - 18px - 17px

font size button - 25px -
```

### Colors

```

Background: hsl(0, 0%, 100%);

text: hsl(0, 0%, 30%)
light-text: hsl(0, 0%, 50%);

button not hover: hsl(164%, 76%, 65%);
button hover: hsl(164%, 76%, 45%);
```

## Components

---

**Header**

```
header
  .container
    .row.d-flex.flex-between
      h1.header__title
      .avt-user.header__avt
        img
```

**Input add task**

```
main.app
  .container
    .col.d-flex
      .app__input
        .btn.btn-round
        input

```

**Illustration when don't have task**

```
      .tasks.tasks-blank
        img.tasks__img
        .tasks__imply
        a.tasks__link
```

**Task - not start**

- need research where to put the dropdown.

```
.task
  .task__header
    .task__name
    .task__options
      button
  .task__footer
    .task__timestamp-create

```

**task - started**

```

```

**Timer**

```

```

**button**

```
HTML structure here.
```

**dropdown**

```
HTML structure here.
```

## NodeJS

---

### Models

#### Task Scheme

```
{
    _id: default,
    userID: get_from_google_id,
    name: String,
    createdAt: Date,
    status: 1 || 0 - 'Completed' 'not complete',
    time_spent: Date,
}
```

#### User Scheme

```
{
    _id: default,
    userID: String //get from google || Facebook
    name: String,
    image: String // get from google || Facebook
    createdAt: Date,
}
```

### Routes

```
GET /

GET /tasks/in-day
GET /tasks/completed
GET /tasks/not-completed
POST /tasks/new
GET /tasks/:id


GET /login
POST /logout

POST /auth/google
POST /auth/google/callback

POST /auth/facebook
POST /auth/facebook/callback
```

### Controllers
