<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This repository contains the implementation of a web scraping API designed to retrieve product information from a specified URL. The API is built using NestJS and employs asynchronous processing to handle requests efficiently.

Features
- Receives requests containing a product ID and initiates asynchronous processing.
- Responds with an HTTP 200 status code and a unique process identifier upon request reception.
- Initiates the scraping process of the target URL and transforms the website data into a unified JSON format.
- Includes a 10-second timeout to simulate data processing.
- Responds with a "not ready" status if queried with the process identifier during the timeout period.
- Provides the final result via the same endpoint after the processing is complete.

Note

- This project uses NestJS and cache for processing purposes. In a real-world scenario, Redis would be used for processing, and PostgreSQL for storing results.

Data Retrieval Methods

To retrieve product information as per the requirements outlined in the task, the following methods were considered:

1. Open Graph in Meta Tags: Parsing meta tags with Open Graph protocol to extract product information.

2. Schema Parsing: Extracting product details from structured data using schema markup.

3. HTML Markup Parsing: Parsing HTML markup to identify and extract product information.

4. Script Tag Parsing: Extracting data from JavaScript scripts embedded within the HTML.

For the given task, the preferred method of data retrieval was Script Tag Parsing. This method was chosen because it provided the necessary information required by the task. Specifically, it allowed for the extraction of product identifiers and specifications required for further processing.

## Installation

```bash
$ npm install
```

## Running the app

```bash

# watch mode
$ npm run start:dev
```

## Using documentation

Open swagger http://localhost:3000/swagger/#/scraper/ScraperController_scrapeProduct and try to send post method with data:

```bash
{
  "productId": "air-presto-mens-shoes-JlLlWz"
}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
