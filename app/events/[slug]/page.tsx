import {notFound} from "next/navigation";
import {Suspense} from 'react';
import Image from "next/image";
import BookEvent from "@/components/BookEvent";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label} : { icon: string; alt: string; label: string;}) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda= ({ agendaItems } : { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((agendaItem) => (
                <li key={agendaItem}>{agendaItem}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags} : {tags: string[]}) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

async function EventDetails({params}: {params: Promise<{slug: string}>}) {
    const {slug} = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);

    if(!request.ok) {
        return notFound();
    }

    const { event } = await request.json();

    if(!event || !event.description) return notFound();

    const {description, image, overview, date, time, location, mode, agenda, audience, tags, organizer} = event;

    const bookings = 10;

    const parseJsonSafely = (value: string | undefined): string[] => {
        if (!value) return [];
        try {
            return JSON.parse(value);
        } catch {
            return [];
        }
    };

    return(
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div className="details">

                {/* Left side - Event Content */}
                <div className="content">
                    <Image src={image} alt="Event banner" width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>

                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date}/>
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time}/>
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location}/>
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode}/>
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience}/>
                    </section>

                    <EventAgenda agendaItems={parseJsonSafely(agenda?.[0])} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={parseJsonSafely(tags?.[0])} />

                </div>

                {/* Right side - Booking Form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book your spot</h2>
                        {bookings > 0
                            ? (
                                <p className="text-sm">
                                    Join {bookings} people who have already booked their spot!
                                </p>
                            ): (
                                <p className="text-sm">Be the first to book your spot</p>
                            )}
                        <BookEvent/>
                    </div>
                </aside>
            </div>

        </section>
    )
}

function TransactionSkeleton() {
    return <ul>...</ul>
}

const EventDetailsPage
    = ({ params }: { params: Promise<{ slug: string }>}) => {
    return (
        <Suspense fallback={<TransactionSkeleton/>}>
            <EventDetails params={params}/>
        </Suspense>
    )
}

export default EventDetailsPage;