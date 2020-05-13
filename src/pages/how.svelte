<script>
import Section from '../components/how/Section.svelte';
import Heading from '../components/how/Heading.svelte';
import Paragraph from '../components/how/Paragraph.svelte';
import List from '../components/how/List.svelte';
import Image from '../components/how/Image.svelte';
import Callout from '../components/how/Callout.svelte';
import Break from '../components/how/Break.svelte';
</script>

<Section>
    <Heading size={2} centered>How It's Made</Heading>

    <Break />

    <Paragraph>
        This project came about because I was interested in learning state machines.
        I thought about more practical uses, like buttons and forms, but had this idea
        of a "Finite State Microwave" - a play on the letters FSM for finite state machines.
        Completing this has taken me a couple hours each weekend for the last 2 months!
        Keep reading to learn about how I implemented the machine logic and visual design.
        Hopefully you'll feel excited to use some of these techniques in your own projects!
    </Paragraph>
</Section>

<Section darkBg>
    <Heading size={3}>First Things First</Heading>

    <Paragraph onDarkBg>
        Before I just started coding, I wrote some notes about how a microwave works. After reading more about state machines, I organized my notes into what states the microwave can be in and then noted what events can happen in each of those states. Here are some examples:
    </Paragraph>

    <!-- TODO: list out some of the states and events -->
    <List items={['Item 1', 'Item 2']} onDarkBg />
</Section>

<Section>
    <Heading size={3}>The Machine</Heading>

    <Callout title="What are state machines?">
        A simple explanation might be the "statuses" (aka. states) of a particular thing
        (the machine). If a machine is <span class="underline">finite</span>, it has a limited
        number of these states and can be modeled! There are different events that transition the
        machine to different states and might update the related data. Some events are only possible
        during specific states.

        <Break />

        Example: A button can be <strong>disabled</strong>, <strong>pressed</strong>, or just
        <strong>idle</strong> and waiting to be clicked! The click event should be possible when
        in the idle state, but not when it is disabled.

        <Break />

        Make sense? If you still have questions, feel free to continue on to see them in action or
        look up other examples online.
    </Callout>

    <Paragraph>
        One really neat thing about <abbr title="Finite State Machines">FSMs</abbr> is that
        their declarative nature, made possible through the use of an object API, allows for
        them to be visualized without any specific integration. I actually did not build any
        frontend for the microwave until the functionality was about 90% complete! Weird, I
        know! This is different than the traditional, more imperative programming style where
        we integrate the logic in with the markup and components. The visualizer that xstate
        provides lets us see what the current state is, what events we can trigger, and other
        helpful things so we can build out our machine.
    </Paragraph>

    <!-- TODO: show gif of visualizer -->
    <!-- TODO: could even be for a different, simpler machine -->
    <!-- <Image src="../../public/img/apple.png" alt="a red apple" /> -->

    <Paragraph>
        Now that we know a little more about state machines and how the visualizer can help,
        what does the xstate API look like? How do we define our machine? If you are used to
        defining configuration files in JavaScript, it's actually quite similar. There are
        different required properties, such as the machine's name, initial state, and then a
        list of each possible state (making it finite). Each of those states has events that
        trigger updates and transitions. That's the gist of it!
    </Paragraph>

    <Paragraph>
        Here's what that can look like:
    </Paragraph>

    <!-- TODO: show some basic code for the structure of the machine -->

    <!-- TODO: use callout to link to visualizer -->

    <!-- TODO: show meme -->
    <!-- <Image src="../../public/img/apple.png" alt="a red apple" /> -->

    <!-- TODO: make a callout component -->
    <Paragraph>
        <!-- originally had DIGIT, which passed { digit: 1 } , but that got changed to restrict the API more (because there really only are 10 possible digits) -->
    </Paragraph>

    <Heading size={3}>Design</Heading>

    <Paragraph>
        used grid and contrasting colors so I could get running quickly. made wrapper components to hide the styling and improve visual appeal
    </Paragraph>

    <!-- TODO: show index.svelte markup -->

    <!-- TODO: show original layout -->
    <!-- <Image src="../../public/img/apple.png" alt="a red apple" /> -->

    <Paragraph>
        worked with Mikey (show Twitter handle) to get feedback and learn about other ways to structure the machine.
        point out that there is a leak of the TICK event, but using alternatives like "submachines??" could greatly complicate the existing machine. I still learned a great deal from Mikey about that.
    </Paragraph>

    <Paragraph>
        add note and code about when I talked with Trevor and found that +30 should go to heating state if there wre no digits entered already
    </Paragraph>

    <Heading size={3}>Revamping the Design</Heading>

    <Paragraph>
        went for a simple, polished look. made it "zoom in" on as the screen sizes get smaller, so it's usable on a phone without seeing most of the microwave
    </Paragraph>

    <!-- TODO: show final design -->
    <!-- <Image src="../../public/img/apple.png" alt="a red apple" /> -->
</Section>