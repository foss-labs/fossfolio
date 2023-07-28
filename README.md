[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br/>

![Empty Dash](./apps/web/public/banner.png)

<!-- ABOUT THE PROJECT -->

## About The Project

FossFolio is an open source web application for people to Find, Host and Manage Hackathons.

<!-- TABLE OF CONTENTS -->
<br/>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

## Find Hackathons

Users can go to the website and see a directory of all the published hackathons which are ongoing and upcoming. Users can find the ones they like to join and register for the event on the site by filling in the necessary information. Users get a dashboard where the can see all the hackathons they've registered for and options to edit their profile information.

## Host Hackathons

Users who want to host hackathons can use the "Create Hackathon" option and fill in the necessary details in a form and publish the event. Upon publishing everyone can see that event on the site.

### Managing Created Hackathons

Users who are hosting hackathons will get a detailed dashboard that displays the following data:

-   Total number of participants
-   Total number of teams
-   Number of student and professional applicants
-   List of all the participants and teams with details of participants

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React Js](https://reactjs.org/)
-   [Next Js](https://nextjs.org/)
-   [Nest Js](https://nestjs.com/)
-   [Typescript](https://typescript.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You need to install

1. [Node v16](https://nodejs.org/en/)
2. [pnpm](https://pnpm.io/)

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/DarkPhoenix2704/fossfolio.git
    ```

2. Install all the NPM packages all the applications.

    > We are using Yarn workspace and turborepo to manage the applications in monorepo.

    ```sh
    pnpm install
    ```

3. Copy the `.env.example` for each applications to `.env` in the same directory and fill the values required

4. Start the web application dev server and open `http://localhost:3000`

    ```sh
    pnpm web dev
    ```

5. Start the api server at `http://localhost:3001` and prisma studio at `http://localhost:5555`

    ```sh
    pnpm api dev
    ```

6. Start the database `http://localhost:5432`

    ```sh
    docker compose up
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[contributors-url]: https://github.com/graphs/contributorsDarkPhoenix2704/fossfolio
[forks-shield]: https://img.shields.io/github/forks/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[forks-url]: https://github.com/network/members/DarkPhoenix2704/fossfolio/network/members
[stars-shield]: https://img.shields.io/github/stars/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[stars-url]: https://github.com/DarkPhoenix2704/fossfolio/stargazers
[issues-shield]: https://img.shields.io/github/issues/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[issues-url]: https://github.com/DarkPhoenix2704/fossfolio/issues
[license-shield]: https://img.shields.io/github/license/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[license-url]: https://github.com/DarkPhoenix2704/fossfolio/blob/main/LICENCE
