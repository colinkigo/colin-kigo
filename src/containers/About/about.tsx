import * as React from "react";
const css = require('./about.css');
export class About extends React.Component<{}, {}> {

  render() {
    return (
      <div className="col-8 about">
        <h1>Colin Kigonya</h1>
        <h4>About me</h4>
        <p className="job_desc">
I love beer... blah blah blah
</p>
<br></br>
<h3>Work Experience</h3>
<h4>Software Engineer @MOHARA Ventures SA</h4>
<p className="job_desc">I am involved in developing solutions for startups and corporate ventures to shape and build their products from ideation to delivery. In my role, I am exposed to a large array of industries and technologies in an exciting and dynamic environment. I am required to have a startup focused mindset that considers both the technical and business objectives of the ventures we build.</p>

<h4>Associate Software Engineer @Kutosys Systems</h4>
<p className="job_desc">My role was that of a Software Developer, part of a development team implementing and supporting enterprise-grade software solutions for customers. I was involved in all areas of development from QA to development to providing bug fixes. Mostly exposed to Reactjs, Nodejs + Typescript.</p>

<h4>Junior Software/Web Developer @Afrolabs</h4>
<p className="job_desc">As a Junior Developer at Afrolabs, I was exposed to a vast array of technologies but mainly focused on Python/Google-AppEngine + AngularJS.
<br></br>
I occasionally helped with input on different projects mostly front-end and bug fixes.
<br></br>
I worked on an in-house project - Budget tracker that tracks resource allocation to different projects during different time periods. I was on it front-end to back-end. Core feature of this project being the fullcalendar.
<br></br>
Python, GoogleAppEngine, AngularJS + HTML5/CSS3 is the main stack I worked with.
<br></br>
Prior to that, I did UI end-to-end testing with BuySafeSellSafe.</p>
<br></br>
<br></br>
Technically, I am and have been exposed to;
<br></br>
- JavaScript, PHP, Java and Python
<br></br>
- Google App Engine [PaaS]
<br></br>
- Django, WebApp, Symfony, Express, Oracle APEX [Frameworks]
<br></br>
- MEAN stack
<br></br>
- Gulp [Build system]
<br></br>
- Firebase [Backend As A Service]
<br></br>
- MySQL, Oracle SQL, MongoDB
<br></br>
- JQuery, AngularJS, Angular 4, Reactjs with Typescript
<br></br>
- HTML5, CSS3 Bootstrap, Angular Material, Material Design
<br></br>
- Selenium / Protractor [Testing frameworks]
      </div>
    );
  }
}