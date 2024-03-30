# XeOra

Welcome to XeOra, your ultimate solution for shift and calendar management! This innovative application streamlines the process of scheduling and managing shifts, making it a breeze for both managers and employees.

## 🌟 Features

- **Efficient Shift Management**: View, create, and modify shifts directly on the calendar.
- **Integration with Other Calendars**: Sync with Google Calendar, iCal, and other popular calendar services.
- **User-Friendly Interface**: An intuitive design that makes scheduling and managing shifts easy.
- **Adaptable to Your Needs**: Whether you're a small business or a large corporation, XeOra is designed to adapt to your needs.

## 🏗️ Infrastructure

XeOra is built with a microservices architecture for scalability and ease of development. Here's a brief overview of the main components:

- **Frontend**: The frontend is built with Angular 17 and TypeScript, providing a robust and type-safe development experience.
- **Backend**: The backend services are built with Supabase.
- **Database**: We use Postgres for our database needs.
- **Authentication**: We use Google authentication with Supabase service

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

🖥️ Usage
After installation, you can start the application with:

`npm start`
The application will be available at http://localhost:4200.

## Deploy

To deploy with Github pages

```
ng deploy --base-href="https://tmac12.github.io/supabase-angular/"
```


# Google Calendars

To get google calendars use project [xeora-backend](https://github.com/tmac12/xeora-backend) and start with `node app.js`.

---

# TODO

- [ ] Send welcome message via email from supabase:
        - https://supabase.com/docs/guides/functions/examples/send-emails
        - https://www.reddit.com/r/Supabase/comments/187s9em/what_is_the_best_way_to_send_a_really_nice/
        - https://bejamas.io/blog/send-emails-supabase-edge-functions-database-triggers/
- [x] Share calendar with other contacts
- [ ] Create a logo
- [ ] Get only current months events
- [ ] Move accountService on a shared component
- [ ] Refactor with declarative code
- [ ] Add private flag to calendar event
- [ ] Handle click on existing event with action DELETE, UPDATE.
- 