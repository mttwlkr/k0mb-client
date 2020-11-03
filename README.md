## K0mb Overview

K0mb was an MVP that attempted to provide a clear picture of Instagram reach. K0mb started in the the outdoor industry, but could be applied to any industry. K0mb wanted to show which brands, athletes, influencers and resorts were effectively able to create engaging content and provide insights for less than premium prices. K0mb had two parts; a web scraper and a front end.

## K0mb Web Client

The frontend is a single page React app, bootstrapped with Create React App, featuring Ant Design's UI Component Library. Currently, the front end compares profiles from the outdoor industry. This is an MVP and I would like to expand functionality but I currently have no plans to continue. The client, with data from early 2020, is available [here](https://mttwlkr.github.io/k0mb-client/)

## K0mb Scraper

K0mb's data comes from a web scraper built in Node JS that spoofs Instagram's GraphQL API, analyzes posts, cleans the data, and compares Instagram profiles from pages in similar categories. The definition of the categories and the pages within is done manually. Instagram has recently updated their API and this scraper currently does not work. Because I was rapidly updating data and wasn't sure the structure I wanted, I am currently shipping all the data along with the client. This is not ideal and I would change this if I continued.

## Installation

### `git clone git@github.com:mttwlkr/k0mb-client.git`

Install all dependencies (I used Node 13)

#### `npm install`

#### `npm start`
