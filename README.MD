# Latest News Dashboard

Django REST API to fetch news articles that are stored in a PostgreSQL database before being displayed in an Angular app.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Please ensure you have the latest version of Python installed. This can be done via the [Python Website](https://www.python.org/downloads/)

You will also need an up to date version of NodeJS which can be installed via the [NodeJS Website](https://nodejs.org/en/download/current)

Once you have cloned all project files, use Powershell to navigate to the projectEnv directory.
Execute the following:
.\Scripts\activate

This will activate the virtual environment required to run the app.

Execute the following:
cd .\latestNewsDashboard\
python manage.py runserver

This will run the Django project

After this, open up a new Powershell window and execute the following:

cd \latestNewsDashboard\news-reader\
ng serve

This will start up the Angular app and provide you with a localhost address to ctrl+click in the terminal.

You are now free to try out this application!