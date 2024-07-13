# usemage-simple-todo-app
Just tried Use MAGE and generated Simple Todo App

For learning I find a Video on YouTube <br />
[MageGPT - Text To Full Stack App Like MAGIC (FREE)](https://www.youtube.com/watch?v=KQrGu8cnwvA)

**User provided prompt**: A simple todo app with one main page that lists all the tasks. User can create new tasks by providing their description, toggle existing ones, or edit their description. User owns tasks. User can only see and edit their own tasks. Tasks are saved in the database. Use react framework with typescript and prisma.

### Run Locally

1. Install Wasp CLI (Linux / Mac / Win+WSL):
```
curl -sSL https://get.wasp-lang.dev/installer.sh | sh
```
2. Position into the unzipped dir and run the app:
```
cd <your-app-name>
wasp db migrate-dev
wasp start
```
