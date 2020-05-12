<script>
import Section from '../components/how/Section.svelte';
import Heading from '../components/how/Heading.svelte';
import Paragraph from '../components/how/Paragraph.svelte';
import List from '../components/how/List.svelte';
import Image from '../components/how/Image.svelte';
</script>

<Section>
    <Heading>Heading 1</Heading>
    <Heading size={2}>Heading 2</Heading>
    <Heading size={3}>Heading 3</Heading>
    <Heading size={4}>Heading 4</Heading>
    <Heading size={5}>Heading 5</Heading>
    <Heading size={6}>Heading 6</Heading>

    <Paragraph>
        Consequat pariatur nulla minim id amet ut adipisicing deserunt officia culpa id in veniam. Sunt pariatur proident ad consequat adipisicing. Ex qui quis elit irure proident Lorem mollit ullamco consectetur. Cillum et fugiat anim amet culpa esse proident cillum commodo mollit nostrud. Ut Lorem tempor commodo anim elit do nulla qui fugiat enim tempor duis. Non ullamco est laborum enim magna cillum anim laboris exercitation culpa est minim culpa.
    </Paragraph>

    <Paragraph>
        Sint nulla id elit enim cupidatat excepteur tempor est. Ut commodo quis mollit nostrud minim consectetur dolore. Ea mollit aliqua proident proident elit Lorem Lorem pariatur nulla quis anim. Sit id ad ad labore non. Deserunt ut quis excepteur deserunt officia.
    </Paragraph>

    <Image src="../../public/img/apple.png" alt="a red apple" />

    <Paragraph>
        Ipsum elit aliqua fugiat in. Enim ipsum irure nisi culpa. Ex pariatur aliqua cupidatat consequat minim tempor ex dolor quis exercitation reprehenderit ut ex deserunt. Voluptate magna magna et quis laboris duis. Ipsum labore deserunt dolor sunt magna dolor culpa officia magna ex consectetur aute irure.
    </Paragraph>

    <List items={['Item 1', 'Item 2']} />
</Section>

<Section darkBg>
    <Heading size={3}>Heading 3</Heading>
    <Heading size={4}>Heading 4</Heading>

    <Paragraph onDarkBg>
        Sint nulla id elit enim cupidatat excepteur tempor est. Ut commodo quis mollit nostrud minim consectetur dolore. Ea mollit aliqua proident proident elit Lorem Lorem pariatur nulla quis anim. Sit id ad ad labore non. Deserunt ut quis excepteur deserunt officia.
    </Paragraph>

    <Paragraph onDarkBg>
        Ipsum elit aliqua fugiat in. Enim ipsum irure nisi culpa. Ex pariatur aliqua cupidatat consequat minim tempor ex dolor quis exercitation reprehenderit ut ex deserunt. Voluptate magna magna et quis laboris duis. Ipsum labore deserunt dolor sunt magna dolor culpa officia magna ex consectetur aute irure.
    </Paragraph>

    <List onDarkBg items={['Item 1', 'Item 2']} />
</Section>