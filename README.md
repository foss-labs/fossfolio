[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<h1 style="text-align: center;">FossFolio</h1>

## Foss Hack 3.0

FOSS Hack 3.0 is the third edition of FOSS Hack, a hackathon to promote Free and Open Source Software by bringing together students and professionals to build or extend FOSS projects.

<!-- TABLE OF CONTENTS -->
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

<!-- ABOUT THE PROJECT -->

## About The Project
FossFolio is an opensource web platform that enables people to discover, host and manage hackathons. 

### Find Hackathons
Users can go to the site and find a directory of active and upcoming hackathons. Find the ones you like and apply for them. Users will get to see all the Ongoing, Upcomng and Previous hackathons they registered for in the user dashboard.

### Host Hackathon
If you want to host a hackathon, be it online or offline, you can creat a hackathon on the site and fill in the necessary information. Other users will be able to see the hackathon you created in the site.com/hackathons page so hackers can apply to participate in the event.

#### Managing Hackathons
On the Host dashboard, hosts are able to see the following:
- Number of participants
- Number of teams
- Number of student applicants
- Number of professional applicants

### Built With

-   [React JS](https://reactjs.org/)
-   [Nest JS](https://nestjs.com/)
-   [Typescript](https://typescript.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

You need to install

1. [Node v16](https://nodejs.org/en/)
2. [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/tinkerhub/saturday-hack-night.git
    ```

2. Install all the NPM packages all the applications.

    > We are using Yarn workspace and turborepo to manage the applications in monorepo.

    ```sh
    yarn install
    ```

3. Copy the `.env.example` for each applications to `.env` in the same directory and fill the values required

4. Start the web application dev server and open `http://localhost:3000`

    ```sh
    yarn workspace web dev
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
[contributors-url]: https://github.com//graphs/contributorsDarkPhoenix2704/fossfolio
[forks-shield]: https://img.shields.io/github/forks/.svg?style=for-the-badgeDarkPhoenix2704/fossfolio
[forks-url]: https://github.com//network/membersDarkPhoenix2704/fossfolio
[stars-shield]: https://img.shields.io/github/stars/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[stars-url]: https://github.com/DarkPhoenix2704/fossfolio/stargazers
[issues-shield]: https://img.shields.io/github/issues/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[issues-url]: https://github.com/DarkPhoenix2704/fossfolio/issues
[license-shield]: https://img.shields.io/github/license/DarkPhoenix2704/fossfolio.svg?style=for-the-badge
[license-url]: https://github.com/DarkPhoenix2704/fossfolio/blob/main/LICENCE
