<svelte:head>
	<link href="/css/prism-theme-nord.css" rel="stylesheet" type="text/css" />
</svelte:head>

<script>
import { onMount } from 'svelte';
import BlogDetails from 'components/how/BlogDetails.svelte';
import Section from 'components/how/Section.svelte';
import Heading from 'components/how/Heading.svelte';
import Paragraph from 'components/how/Paragraph.svelte';
import List from 'components/how/List.svelte';
import Image from 'components/how/Image.svelte';
import Callout from 'components/how/Callout.svelte';
import Break from 'components/how/Break.svelte';
import Link from 'components/how/Link.svelte';
import Highlight from 'components/how/Highlight.svelte';
import Visualizer from 'components/how/Visualizer.svelte';

import examples from '../examples.js';

import Prism from 'prismjs';
import 'prism-svelte';

onMount(() => {
    Prism.highlightAll();
})
</script>

<Section>
    <Heading size={2} centered>How It's Made</Heading>

    <BlogDetails />

    <Break />

    <Paragraph>
        This project came about because I was interested in learning state machines. I
        thought about more practical uses, like buttons and forms, but had this idea of
        a "Finite State Microwave" - a play on the last word in the acronym FSM, which
        normally stands for Finite State Machine.
    </Paragraph>

    <Paragraph>
        Completing this has taken me several hours each week for the last few months! It
        was certianly humorous to see the reaction of some family members when I told
        them I needed to go "work on my microwave". Keep reading to learn about how I
        implemented the machine logic and visual design. Hopefully you'll feel excited
        to use some of these things in your own projects!
    </Paragraph>

    <Paragraph>
        I decided to use Svelte and Tailwind since I'm comfortable with both. If
        you're unfamiliar with either of these, the good news is that they're both
        really easy to understand - their simplicity makes them great for tutorials
        and the like! While I'll focus on the machine, I hope you'll enjoy the other
        tidbits.
    </Paragraph>

    <Paragraph>
        <div class="font-bold mb-2">Table of Contents</div>
        <div><Link to="#first-things-first">First Things First</Link></div>
        <div><Link to="#the-machine">The Machine</Link></div>
        <div><Link to="#the-frontend">The Frontend</Link></div>
        <div><Link to="#finishing-machine">Finishing The Machine</Link></div>
        <div><Link to="#revamping-design">Revamping the Design</Link></div>
        <div><Link to="#so-what-now">So What Now?</Link></div>
    </Paragraph>
</Section>

<Section darkBg>
    <Heading id="first-things-first" size={3}>
        First Things First
    </Heading>

    <Paragraph onDarkBg>
        Before I just started coding away, I got out a notebook and pen and then wrote
        some notes about how a microwave works. I noted things like:
    </Paragraph>

    <List
        items={[
            'pressing "+30" adds thirty seconds',
            'the display shows the time when not in use',
            'it beeps at 1-minute intervals once the food is heated',
            'the digits entered are converted to a proper time interval when the "start" button is pressed (like "101" converts to 1 minute and 1 second, but so does entering "61")',
        ]}
        onDarkBg
    />

    <Image
        src="/img/teacher-meme.jpg"
        alt="Teacher: Can you count backwards from 100 for me?  6 year old me: Duh. 100. 59. 58.  Teacher: That is incorrect. Who taught you that?  Me: My microwave."
        large
    />

    <Paragraph onDarkBg>
        There are actually quite a few of these rules, and I started to notice some
        patterns. You may have heard about state machines before, but let's have a
        refresher.
    </Paragraph>

    <Callout title="What are State Machines?">
        A simple explanation might be the "statuses" (aka. states) of a particular thing
        (the machine). If a machine is <span class="underline">finite</span>, it has a limited
        number of these states and can be modeled! There are different events that transition the
        machine to different states and might update the related data (also called context).
        Some events are only possible during specific states.

        <Break />
        <Break />

        Example: A button can be <strong>disabled</strong>, <strong>pressed</strong>, or just
        <strong>idle</strong> and waiting to be clicked! The click event should be possible when
        in the idle state, but not when it is disabled.

        <Break />
        <Break />

        Make sense? If you still have questions, feel free to continue on to see them in action or
        look up other examples online.
    </Callout>

    <Paragraph onDarkBg>
        One really neat thing about FSMs is that their declarative nature, made possible
        through the use of an object API, allows for them to be visualized without any
        specific integration into your frontend. I actually did not build any frontend
        for the microwave until the functionality was about 90% complete! Weird, I know!
        This is different than the traditional, more imperative programming style where
        we integrate the logic in with the markup and components. The visualizer that
        xstate provides lets us see what the current state is, what events we can trigger,
        and other helpful things so we can build out our machine.
    </Paragraph>

    <Paragraph onDarkBg>
        Here's an example of a stop light, albeit quickened so you don't have to wait at
        that red light! You'll see in the definition that we are transitioning <i>after</i>
        a specified time.
    </Paragraph>

    <Visualizer
        gist="ae954746c328ad0e7770b1aa4c7134db"
        of="a stop light"
    />
</Section>

<Section>
    <Heading id="the-machine" size={3}>The Machine</Heading>

    <Paragraph>
        After reading more about state machines, I organized my notes into what states
        the microwave can be in and then noted what events can happen in each of those
        states. Here's one of the states I came up with:
    </Paragraph>

    <List
        title="idle (not in use)"
        items={[
            'pressing a digit appends that to the end of the display',
            'pressing "start" begins the countdown, but only if there are digits',
            'pressing "stop" when there are digits clears the display',
            'pressing "+30 seconds" increments the digits by 30',
        ]}
    />

    <Paragraph>
        Different microwave makes and models may have a different machine structure,
        but I decided to model the one in my kitchen. The 4 points above actually
        cover all of the logic for the idle state! Can it really be that simple?
    </Paragraph>

    <Paragraph>
        The next step was to turn my lists into code. The NPM package called xstate
        uses a declarative object API. You can define the states and actions in one
        area, and define the logic in a completely separate area. Take a look at this
        and see if it makes sense to you - read the comments for further clarification:
    </Paragraph>

    <Highlight code={examples.initialIdleState} language="js" />

    <Paragraph>
        As you might have noticed, the notes on how the machine works were almost
        1:1 converted into the object API. Read the xstate docs to learn more of
        how that part works.
    </Paragraph>
</Section>

<Section darkBg>
    <Heading id="the-frontend" size={3}>The Frontend</Heading>

    <Paragraph onDarkBg>
        I started with a few colored blocks on a grid to get started quickly.
        Don't focus on the details when prototyping - the colors don't matter and
        the dimensions really don't either. That can all be smoothed out later.
    </Paragraph>

    <Image src="/img/initial-design.png" alt="the initial design" large />

    <Paragraph onDarkBg>
        One strategy I use in my components is to hide the styling inside of
        wrapper components. This is easier to understand and frankly improves
        visual appeal. If you've ever sewed, think of this strategy like the
        common blind stitch. If you don't sew, look on the inside of your clothes
        to see the stitching that is hidden from outside viewers' eyes.
    </Paragraph>

    <Paragraph onDarkBg>
        Here's my page code:
    </Paragraph>

    <Highlight code={examples.simplePageStructure} />

    <Paragraph onDarkBg>
        And here's the Microwave component so you can see how the blind stitching
        kept the page code clean:
    </Paragraph>

    <Highlight code={examples.microwaveComponent} />

    <Paragraph onDarkBg>
        But wait, how does the machine hook into the frontend? Good question. There's
        a package called xstate-svelte which wraps the machine behind a store. If
        that's not familiar to you, don't worry. It's just a way we're going to get
        reactive updates. After setting up our machine and connecting the events to
        the components, this is what the code looks like now:
    </Paragraph>

    <Highlight code={examples.finalPageStructure} />

    <Paragraph onDarkBg>
        After connecting it all together, I had a working microwave. Well, sort of
        working - it doesn't heat my food.. 🤣
    </Paragraph>
</Section>

<Section>
    <Heading id="finishing-machine" size={3}>Finishing the Machine</Heading>

    <Paragraph>
        There were a few smaller updates I made to the machine logic. I talked with
        others to get feedback and learn about other ways to add to the machine. Thanks
        Mikey (<Link to="https://twitter.com/CodingDive?s=20" newTab>@CodingDive</Link>)!
    </Paragraph>

    <List
        items={[
            'I originally had the PRESS_DIGIT event, which I passed the digit value with, but that got changed to restrict the API more. There really only are 10 possible digits (0 through 9), so I wrote out PRESS_1, PRESS_2, and so on.',
            "Currently, there is a leak of the TICK event (meaning it's not private to the machine and I can technically fire that event from outside, like a microwave button which doesn't make sense), but using alternatives like child-machines could greatly complicate the existing machine. I still learned a great deal about that, but ultimately decided to leave it how it is so that things don't get too hard to understand. This was my first machine, after all.",
            'I showcased this project to my older brother and discovered that pressing +30 should go to heating state if there were no digits entered already. I quickly added a conditional guard to fire different actions if there were no digits yet.',
        ]}
    />
</Section>

<Section darkBg>
    <Heading id="revamping-design" size={3}>Revamping the Design</Heading>

    <Paragraph onDarkBg>
        I went for a simple, polished look. I took care to make it "zoom in" on on
        smaller screen sizes so it's usable on a phone without seeing most of the
        microwave.
    </Paragraph>

    <Image src="/img/final-design.png" alt="the final design" large />
</Section>

<Section>
    <Heading id="so-what-now" size={3}>So What Now?</Heading>

    <Paragraph>
        If you're interested in seeing all of the code, you can
        <Link to="https://github.com/parker-codes/finite-state-microwave" newTab>find the repo here</Link>. Please star it or share it if
        you like it! Here's the <Link to="https://xstate.js.org/viz/?gist=ba7f6de2b1561d7d3b4a236426cffa09" newTab>full visualizer</Link> to play around with as well!
    </Paragraph>

    <Paragraph>
        I strongly encourage you to think of a fun machine to build and then just do
        it! Find something that's fun and not too complex. It doesn't really matter if
        you think someone has already done it before..
    </Paragraph>

    <Paragraph>
        There are also still some extra enhancements to add to the overall UX of the
        Finite State Microwave. Check out the
        <Link to="https://github.com/parker-codes/finite-state-microwave/issues" newTab>GitHub issues</Link>
        and see if you'd like to help out!
    </Paragraph>

    <Paragraph>
        Let me know how this went for you! If you ran into any issues or you're curious
        about how it works, just connect with me on Twitter
        <Link to="https://twitter.com/parker_codes" newTab>@parker_codes</Link>. If you
        aren't on Twitter or you just prefer a more personal touch, send me an email -
        parker.mcmullin01@gmail.com.
    </Paragraph>
</Section>