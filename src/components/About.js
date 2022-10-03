import React from "react";

const About = () => {
  return (
    <div
      className="flex flex-col flex-1 
      items-center justify-start 
      gap-5 p-4 
      text-2xl
      bg-trafalgar bg-cover bg-blend-soft-light bg-slate-300"
    >
      <div className="flex flex-col gap-5 w-full lg:w-1/2">
        <section className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold mb-4">What is Historja?</h1>
          <span>
            This web app gives students and history enthusiasts a{" "}
            <b>template </b>
            that they can use to <b>create historical events</b>.
            <br />
            The user generated events can be visualized in a <b>
              geographical
            </b>{" "}
            manner and a <b>chronological</b> one. <br />
            Furthermore, the events can be studied through a simple{" "}
            <b>flash cards </b>
            system and exported as a<b> Csv </b> file {"(ideally for Anki)"}.
          </span>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">My Events</h2>
          <img
            className="border-2 border-slate-600"
            src="https://imgur.com/aSe7c0w.png"
            alt="main page"
          />
          <span>
            In this section, the user can see all the events he's created. He
            can
            <b> search</b> through them, <b>sort</b> them by the year,{" "}
            <b>edit</b> them and
            <b> delete</b> 'em. If the user added an image URL when creating the
            event, the image will appear as a background of said event.{" "}
            <br></br>
          </span>
          <img
            className="border-2 border-slate-600"
            src="https://imgur.com/DQotd45.png"
            alt="main page"
          />
          <span>
            Furthermore, on the bottom half of the page the user can see the
            events on a <b>map</b> and on a <b>timeline</b>.
          </span>
          <img
            className="border-2 border-slate-600"
            src="https://imgur.com/9UsdXCK.png"
            alt="main page"
          />

          <span>
            The events that appear on the map and on the timeline are the ones
            who have been filtered through the <b>search feature</b>, that is if
            the search has been used in the first place; otherwise all the
            events are picked. Same goes for the sort feature and the timeline.
          </span>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Create</h2>
          <img
            className="border-2 border-slate-600"
            src="https://imgur.com/divhBIc.png"
            alt="main page"
          />

          <span>
            Here, users need to enter the info about the event. Where did the
            event happen? When? Why? Etc. At the end, users can add sources, an
            optional but suggested image URL and one or more tags.
          </span>
          <span>
            <b>Tags</b> can be useful to <b>link</b> multiple <b>events</b>{" "}
            through a specific keyword, for example events that belong to a
            certain period, a certain war etc. Tags have to be separated with a{" "}
            <b>comma</b>.
          </span>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Flash cards</h2>
          <img
            className="border-2 border-slate-600"
            src="https://imgur.com/97HTGbD.png"
            alt="main page"
          />

          <span>
            <b>Flash cards</b> are a way to test users' knowledge. For each
            event, Historja generates 8 questions and answers, one for each
            topic {"(when, where, who, ..)"}.
          </span>
          <span>
            Once you have selected the event you want to study, press{" "}
            <b>play</b> and start the 'game'. For every question, on top you'll
            see the question and its index.
          </span>
          <span>
            If you have formulated an answer in your mind, go ahead and tap
            <b> 'Click here to show the answer'</b>. Now click <b>next</b> and
            complete all the questions of the event.
          </span>
          <span>
            All the flash cards can be <b>exported</b> in a <b>Csv</b> file in
            the My profile section. The generated file can be easily imported in{" "}
            <b>Anki</b>.
          </span>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">My account</h2>
          <span>
            Here, apart from exporting the events, you can <b>logout</b> and{" "}
            <b>delete the account</b>.
          </span>
          <span>
            If you're having trouble deleting the account, you need to logout,
            login and click the delete button again.
          </span>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">About the creator</h2>
          <span>
            I'm a <b>history</b> and <b>technology</b> enthusiast from planet
            Earth. This project is a way to test my web development skills and
            try to make something useful for me and hopefully for others.
          </span>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">About the app's technical side</h2>
          <span>
            <b>Main stack</b>: React, Firebase, Tailwind.
          </span>
          <span>
            <b>APIs</b>: Maps Javascript API, Geocoding API, Places API
          </span>
          <span>
            <b>Packages</b>: react-switch, sort-array, react-router-dom,
            @react-google-maps/api, firebase, react-icons,
            react-places-autocomplete, react-vertical-timeline-component
          </span>
        </section>
      </div>
    </div>
  );
};

export default About;
