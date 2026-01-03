import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database";
import {Suspense} from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function EventsList() {
    const response = await fetch(`${BASE_URL}/api/events`);

    if(!response.ok){
        return <p>Failed to load events.</p>
    }

    const {events} = await response.json();

    return (<ul className="events">
        {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.title || event.id} className="list-none">
                <EventCard {...event} />
            </li>
        ))}
    </ul>);
}


function TransactionSkeleton() {
    return <ul>...</ul>
}

const Page = async () => {
    return (
        <section>
            <h1 className="text-center">The Hub for Every Developer <br/> Event You can't Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in one place</p>

            <ExploreBtn/>

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                <Suspense fallback={<TransactionSkeleton/>}>
                    <EventsList/>
                </Suspense>
            </div>

        </section>
    );
}

export default Page;